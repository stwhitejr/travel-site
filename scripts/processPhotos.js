const fs = require('fs-extra');
const path = require('path');
const {exiftool} = require('exiftool-vendored');
const getImageMetadata = require('./util/getImageMetadata');

const RAW_DIR = './raw_photos';
const OUT_DIR = './output';
const PHOTO_OUTPUT_DIR = OUT_DIR + '/photos';
const META_FILE = OUT_DIR + '/photo_metadata.json';

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const JPEG_QUALITY = 85;

async function processPhotos() {
  await fs.ensureDir(PHOTO_OUTPUT_DIR);
  const files = await fs.readdir(RAW_DIR);
  const metadataList = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const filePath = path.join(RAW_DIR, file);
    const outputPath = path.join(PHOTO_OUTPUT_DIR, file);
    const fileName = path.basename(file, ext);

    try {
      const {image, metadata} = await getImageMetadata(filePath);

      if (!metadata.coordinates[0]) {
        continue;
      }

      if (metadata.orientation === 'portrait') {
        image.rotate(90);
      }

      // Resize while preserving aspect ratio
      const resizedImage = image.resize({
        ...(metadata.orientation === 'landscape'
          ? {width: MAX_WIDTH, height: null}
          : {height: MAX_HEIGHT, width: null}),

        withoutEnlargement: true,
      });

      // Save as JPEG with some compression
      const result = await resizedImage
        .jpeg({quality: JPEG_QUALITY})
        .toFile(outputPath);

      metadataList.push({
        file_name: fileName,
        width: result.width,
        height: result.height,
        ...metadata,
      });

      console.log(`Processed: ${file}`);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }

  // Write metadata JSON
  await fs.writeJson(META_FILE, metadataList, {spaces: 2});
  console.log('Metadata written to photo_metadata.json');
  await exiftool.end();
}

if (require.main === module) {
  processPhotos();
} else {
  module.exports = processPhotos;
}
