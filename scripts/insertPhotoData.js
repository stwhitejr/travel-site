const createClient = require('./util/supabaseClient');
const fs = require('fs-extra');

const LOG_FILE = './output/final_log.json';

const upsert = async ({table, conflictKey, data}) => {
  const supabase = await createClient();
  const response = await supabase
    .from(table)
    .upsert(data, {onConflict: conflictKey});
  if (response.error)
    throw new Error(`Failed to upsert: ${response.error.message}`);
};

const query = (async = async ({table, select = '*'}) => {
  const supabase = await createClient();
  const response = await supabase.from(table).select(select);
  if (response.error)
    throw new Error(`Failed to fetch: ${response.error.message}`);
  return response;
});

const main = async (skipPhotoUpsert = false) => {
  const tags = require('../output/tags.json');
  const formattedTags = tags.map((tag) => ({name: tag}));
  const photoMetadata = require('../output/photo_metadata_with_location_id.json');

  await upsert({table: 'tags', conflictKey: 'name', data: formattedTags});
  const tagsResponse = await query({table: 'tags', select: 'id, name'});
  const tagsDictionary = Object.fromEntries(
    tagsResponse.data.map(({id, name}) => [name, id])
  );

  if (!skipPhotoUpsert) {
    const photoMetadataForTable = photoMetadata.map(
      ({tags, coordinates, ...rest}) => rest
    );

    await upsert({
      table: 'photo_metadata',
      conflictKey: 'file_name',
      data: photoMetadataForTable,
    });
  }

  const photosResponse = await query({
    table: 'photo_metadata',
    select: 'id, file_name',
  });
  const photosDictionary = Object.fromEntries(
    photosResponse.data.map(({id, file_name}) => [file_name, id])
  );

  const photoTags = photoMetadata.reduce((acc, photo) => {
    const tags = photo.tags;
    const photo_id = photosDictionary[photo.file_name];
    acc = acc.concat(
      tags.map((tag) => ({
        photo_id,
        tag_id: tagsDictionary[tag],
      }))
    );
    return acc;
  }, []);

  await upsert({
    table: 'photo_tags',
    conflictKey: 'photo_id,tag_id',
    data: photoTags,
  });

  await fs.writeJson(
    LOG_FILE,
    {photoTags, photosDictionary, tagsDictionary},
    {spaces: 2}
  );
};

if (require.main === module) {
  main();
} else {
  module.exports = main;
}
