const fs = require('fs');
const processPhotos = require('./processPhotos');
const deriveFromPhotoMetadata = require('./deriveFromPhotoMetadata');
const insertLocations = require('./insertLocations');
const insertPhotoData = require('./insertPhotoData');

const OUTPUT_FOLDER = './output';

const main = async () => {
  console.log('Wiping output folder...\n\n');
  fs.rmSync(OUTPUT_FOLDER, {recursive: true, force: true});
  fs.mkdirSync(OUTPUT_FOLDER, {recursive: true});

  console.log('Optimizing photos and extracting metadata...\n\n');
  await processPhotos();
  console.log('Deriving locations and tags from photo metadata...\n\n');
  await deriveFromPhotoMetadata();
  console.log('Upserting locations to DB...');
  await insertLocations();
  console.log(
    'Upserting photo metadata and tags, inserting photo_tags to DB...\n\n'
  );
  await insertPhotoData();
};

main();
