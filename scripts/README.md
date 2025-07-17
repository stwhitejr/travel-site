This scripts are setup to be run from the root of the repo.

# Data Ingestion

These scripts help convert photos to JSON for DB entries. Below is the process. You can just run `node scripts/main.js` but below breaks down what it's doing.

## Photos Are Source Of Truth

The photos within a `raw_photos` file are the source of truth for all your data. These scripts expect GPS Data (coordinates) and keywords embedded in the image using standard image metadata formats.

## Step 1: Process Photos - processPhotos.js

This script will take all the photos from `raw_photos`, resize them to a max width and height depending on orientation, slightly compress and generate a `output/photo_metadata.json` file. At this time we'll have the photos `file_name`, `tags`, `coordinates`, `orientation`, `width`, and `height`.

## Step 2: Derive Locations & Tags - deriveFromPhotoMetadata.mjs

The script will read the photo_metadata json file and infer a list of locations and tags. Tags are super straight forward its just going to merge them all and de-dupe. Locations will use a formula to ensure its not creating duplicate locations or locations that are too close together to show up reasonably within a globe/map UI. Esentially, it's bundling close enough locations into 1 location.

We convert the coordinate into a human readable address. Additionally, this will add the `locationAddress` field to our `output/photo_metadata.json` so that we have a temporary reference from photo -> location. We will later update this to use the real location ID as a foreign key once locations are added to DB.

## Step 3: Insert Locations - insertLocations.js

This step simply takes our `ouput/locations.json` and upserts it into the database. Additionally, it will swap the `locationAddress` with the `location_id` and output `output/photo_metadata_with_location_id.json`.

## Step 4: Insert Tags, Photo Metadata, and Photo Tags - insertPhotoData.js

This step will extract the tags from all the photo metadata and insert it into the tags table. We will query the tags table for IDs and will then swap all tags in photo metadata with tag ids.

We will clone the photo metadata list and remove all tags from the entities so that we can then insert all photo metadata into its table. We will then query for all the photo ids and create a photo ID -> photo file_name dictionary.

Then we have all the information we need within the scope of this script to generate photo tags. We will construct this and then upload to database.

# Helpers

## Tagging Photos

### Tag Photos via Folders

The `tagPhotosViaTagFolders.js` script can be used to help tag photos in bulk. You should do this before running the above ingestion steps (or `main.js`) or you can run `upsertTagsOnly.js` to only upload any new tags entities and photo tag associations. If you use this script then the photo metadata must already exist in the DB.

Before you run this script, create folders in the `raw_photos` folder with tag names you want to apply to the photos inside the folders. You can move photos in and out of these folders and re-run the script to apply more than 1 tag to your photos.

### Tag Photos via AI Model

The `gen_tags/` folder contains a python script that will attempt to determine if a label is appropriate for a photo. It will generate an `output/labels_by_filename.json` file. Before you can run the `gen_tags/main.py` you must first download the model using `python gen_tags/download.py`. You have 2 options on how to proceed with this newly generated data.

1. You can uncomment some code within `util/getImageMetadata.js` and merge these tags into the image metadata. This means the tags will not be written to the actual photo files but just used during the ingestion process.

2. You can uncomment some code within `util/getImageMetadata.js` and run `tagPhotosViaJsonFile.js` to actually write these tags to the photos metadata.
