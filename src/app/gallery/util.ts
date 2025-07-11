export const SUPABASE_PHOTOS_URL =
  'https://pajqyzcpmfrhpupdtupn.supabase.co/storage/v1/object/public/photos';

export const getResourceUrl = (id: string, ext = 'jpeg') =>
  `${SUPABASE_PHOTOS_URL}/${id}.${ext}`;
