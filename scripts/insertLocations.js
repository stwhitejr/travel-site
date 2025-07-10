const createClient = require('./util/supabaseClient');
const fs = require('fs-extra');

const PHOTOS_FILE = './output/photo_metadata_with_location_id.json';

const main = async () => {
  const locations = require('../output/locations.json');
  const photoMetadata = require('../output/photo_metadata_with_address.json');
  const supabase = await createClient();

  const {error} = await supabase
    .from('location')
    .upsert(locations, {onConflict: 'address'});
  if (error) throw new Error(`Failed to upsert: ${error.message}`);

  const {data, error: fetchError} = await supabase
    .from('location')
    .select('id, address');
  if (fetchError) throw new Error(`Failed to fetch: ${fetchError.message}`);

  const dictionary = Object.fromEntries(
    data.map(({id, address}) => [address, id])
  );

  const updatedPhotos = photoMetadata.map(({locationAddress, ...rest}) => {
    const location_id = dictionary[locationAddress];
    return {
      ...rest,
      location_id,
    };
  });
  await fs.writeJson(PHOTOS_FILE, updatedPhotos, {spaces: 2});
};

if (require.main === module) {
  main();
} else {
  module.exports = main;
}
