export const SUPABASE_PROJECT_DOMAIN =
  'https://pajqyzcpmfrhpupdtupn.supabase.co';
export const SUPABASE_PHOTOS_URL = `${SUPABASE_PROJECT_DOMAIN}/storage/v1/object/public/photos`;

export const getResourceUrl = (
  id: string,
  options = {
    ext: 'jpeg',
    isThumbnail: false,
  } as {ext?: string; isThumbnail?: boolean}
) =>
  `${SUPABASE_PHOTOS_URL}/${options.isThumbnail ? 'thumbnails/' : ''}${id}.${
    options.ext
  }`;
