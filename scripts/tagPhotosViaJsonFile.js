const {exiftool} = require('exiftool-vendored');
const getImageMetadata = require('./util/getImageMetadata');
const processFiles = require('./util/processFiles');
const {validatePathAsImage} = require('./util/helpers');

const RAW_DIR = './raw_photos';

async function tagPhotosViaJsonFile() {
  await processFiles(RAW_DIR, async (file, {filePath}) => {
    if (!validatePathAsImage(file)) return 'continue';

    const {metadata} = await getImageMetadata(filePath);

    try {
      await exiftool.write(filePath, {
        Keywords: metadata.tags,
      });
      console.log(`Updated "${file}"`);
    } catch (err) {
      console.error(`Failed to update "${file}":`, err);
    }
  });

  await exiftool.end();
}

tagPhotosViaJsonFile();
