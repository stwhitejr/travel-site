export const SUPABASE_PROJECT_DOMAIN =
  'https://pajqyzcpmfrhpupdtupn.supabase.co';
export const SUPABASE_PHOTOS_URL = `${SUPABASE_PROJECT_DOMAIN}/storage/v1/object/public/photos`;

export const getResourceUrl = (
  id: string,
  options = {
    ext: 'jpg',
    isThumbnail: false,
  } as {ext?: string; isThumbnail?: boolean}
) =>
  `${SUPABASE_PHOTOS_URL}/${options.isThumbnail ? 'thumbnails/' : ''}${id}.${
    options.ext
  }`;

const classNamesByFileName: Record<string, string> = {
  IMG_4240: 'object-bottom',
  IMG_4674: 'object-bottom',
  IMG_4929: 'object-[0px_74%]',
  IMG_5426: 'object-[0px_65%]',
  IMG_4426: 'object-[0px_85%]',
  IMG_4312: 'object-[0px_30%]',
  IMG_4982: 'object-[0px_85%]',
};
export const getClassNamesByFileName = (fileName: string) => {
  return classNamesByFileName[fileName] || '';
};
