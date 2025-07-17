const path = require('path');
const {exiftool} = require('exiftool-vendored');
const fg = require('fast-glob');
const getImageMetadata = require('./util/getImageMetadata');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg'];
const RAW_DIR = './raw_photos';

async function tagPhotosViaTagFolders() {
  // Use glob to get all image files recursively
  const files = await fg(`${RAW_DIR}/*/**/*`, {onlyFiles: true});

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) continue;

    const folderName = path.basename(path.dirname(file));

    const {metadata} = await getImageMetadata(file);

    if (metadata.tags.includes(folderName)) {
      continue;
    }
    try {
      await exiftool.write(file, {
        Keywords: metadata.tags.concat(folderName),
      });
      console.log(`Updated "${file}" with keyword "${folderName}"`);
    } catch (err) {
      console.error(`Failed to update "${file}":`, err);
    }
  }

  await exiftool.end();
}

tagPhotosViaTagFolders();
