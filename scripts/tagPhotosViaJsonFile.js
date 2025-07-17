const fs = require('fs-extra');
const path = require('path');
const {exiftool} = require('exiftool-vendored');
const getImageMetadata = require('./util/getImageMetadata');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg'];
const RAW_DIR = './raw_photos';

async function tagPhotosViaJsonFile() {
  const files = await fs.readdir(RAW_DIR);

  for (const file of files) {
    const filePath = path.join(RAW_DIR, file);

    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) continue;

    const {metadata} = await getImageMetadata(filePath);

    try {
      await exiftool.write(filePath, {
        Keywords: metadata.tags,
      });
      console.log(`Updated "${file}"`);
    } catch (err) {
      console.error(`Failed to update "${file}":`, err);
    }
  }

  await exiftool.end();
}

tagPhotosViaJsonFile();
