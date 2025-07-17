import os
from pathlib import Path
from PIL import Image
from transformers import pipeline
import json


RAW_PHOTO_DIR = Path.cwd() / "raw_photos"

tag_prompts = {
    "desert": [
        "desert"
    ],
    "bike": [
        "bike",
    ],
    "snow": [
        "snow",
        "snow capped mountains"
    ],
    "water": [
        "lake",
        "ocean",
        "beach",
        "river"
    ],
    "camp": [
        "van",
        "camp",
        "inside of camper van",
        "cooking"
    ],
    "vista": [
        "vista",
    ],
    "trail": [
        "trail",
    ],
    "dog": [
        "dog",
        "wolf"
   ],
   "random": [
       "city",
       "inside of building",
       "people",
       "statue"
   ]
}

all_prompts = [prompt for prompts in tag_prompts.values() for prompt in prompts]

CONFIDENCE_THRESHOLD = 0.15

classifier = pipeline(
    task="zero-shot-image-classification",
    model="openai/clip-vit-large-patch14"
)

labelsByFileName = {}

# === Loop through images ===
for image_path in RAW_PHOTO_DIR.glob("*"):
    if not image_path.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]:
        continue

    try:
        image = Image.open(image_path)
    except Exception as e:
        print(f"❌ Failed to open {image_path.name}: {e}")
        continue

    predictions = classifier(image, candidate_labels=all_prompts)

    # Filter based on confidence
    results = [p["label"] for p in predictions if p["score"] >= CONFIDENCE_THRESHOLD]

    # Print results
    # print(f"✅ {image_path.name} → Tags: {results if results else '[No confident match]'}")

    prompt_to_tag = {
        prompt: tag for tag, prompts in tag_prompts.items() for prompt in prompts
    }

    labels = list(map(lambda result: prompt_to_tag[result], results))

    labelsByFileName[image_path.name] = labels


output_path = Path.cwd() / "output/labels_by_filename.json"

with open(output_path, "w") as f:
    json.dump(labelsByFileName, f, indent=2)

print(f"✅ Labels written to {output_path}")
