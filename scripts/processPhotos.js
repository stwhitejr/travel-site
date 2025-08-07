const fs = require('fs-extra');
const path = require('path');
const {exiftool} = require('exiftool-vendored');
const getImageMetadata = require('./util/getImageMetadata');
const processFiles = require('./util/processFiles');
const {validatePathAsImage} = require('./util/helpers');

const RAW_DIR = './raw_photos';
const OUT_DIR = './output';
const PHOTO_OUTPUT_DIR = OUT_DIR + '/photos';
const THUMBNAIL_OUTPUT_DIR = PHOTO_OUTPUT_DIR + '/thumbnails';
const META_FILE = OUT_DIR + '/photo_metadata.json';

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const JPEG_QUALITY = 85;

async function processPhotos() {
  await fs.ensureDir(PHOTO_OUTPUT_DIR);
  await fs.ensureDir(THUMBNAIL_OUTPUT_DIR);
  const metadataList = [];

  await processFiles(RAW_DIR, async (file, {filePath, fileName}) => {
    if (!validatePathAsImage(file)) return 'continue';

    const outputPath = path.join(PHOTO_OUTPUT_DIR, file);

    try {
      const {image, metadata} = await getImageMetadata(filePath);

      if (!metadata.coordinates[0]) {
        return 'continue';
      }

      // if (metadata.orientation === 'portrait') {
      //   image.rotate(90);
      // }

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

      // Create thumbnail version
      image
        .resize(300)
        .toFormat('webp', {quality: 60})
        .toFile(path.join(THUMBNAIL_OUTPUT_DIR, `${fileName}.webp`));

      // Generate blur data
      const blurBuffer = await image.resize(10).blur().toBuffer();
      const blurBase64 = `data:image/jpeg;base64,${blurBuffer.toString(
        'base64'
      )}`;

      metadataList.push({
        file_name: fileName,
        width: result.width,
        height: result.height,
        blur: blurBase64,
        ...metadata,
      });

      console.log(`Processed: ${file}`);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  });

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
