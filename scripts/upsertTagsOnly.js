const fs = require('fs-extra');
const {exiftool} = require('exiftool-vendored');
const getImageMetadata = require('./util/getImageMetadata');
const insertPhotoData = require('./insertPhotoData');
const processFiles = require('./util/processFiles');
const {validatePathAsImage} = require('./util/helpers');

const RAW_DIR = './raw_photos';
const OUT_DIR = './output';
const META_FILE = OUT_DIR + '/photo_metadata_with_location_id.json';
const TAGS_FILE = OUT_DIR + '/tags.json';

async function upsertTagsOnly() {
  const metadataList = [];
  const tags = new Set();

  await processFiles(RAW_DIR, async (file, {fileName, filePath}) => {
    if (!validatePathAsImage(file)) return 'continue';

    try {
      const {metadata} = await getImageMetadata(filePath);

      if (metadata.tags.length > 0) {
        metadata.tags.forEach((tag) => {
          tags.add(tag);
        });
      }
      if (metadata.coordinates[0]) {
        metadataList.push({
          ...metadata,
          file_name: fileName,
        });
      }
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  });

  // Write metadata JSON
  await fs.writeJson(META_FILE, metadataList, {spaces: 2});
  await fs.writeJson(TAGS_FILE, [...tags], {spaces: 2});
  await insertPhotoData(true);
  console.log('Tags and Photo Tags upserted');
  await exiftool.end();
}

upsertTagsOnly();
