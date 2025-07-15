export const SUPABASE_PHOTOS_URL =
  'https://pajqyzcpmfrhpupdtupn.supabase.co/storage/v1/object/public/photos';

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
