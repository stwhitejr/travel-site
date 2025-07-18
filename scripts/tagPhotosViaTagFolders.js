const path = require('path');
const {exiftool} = require('exiftool-vendored');
const fg = require('fast-glob');
const getImageMetadata = require('./util/getImageMetadata');
const {validatePathAsImage} = require('./util/helpers');

const RAW_DIR = './raw_photos';

async function tagPhotosViaTagFolders() {
  // Use glob to get all image files recursively
  const files = await fg(`${RAW_DIR}/*/**/*`, {onlyFiles: true});

  for (const file of files) {
    if (!validatePathAsImage(file)) continue;

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
