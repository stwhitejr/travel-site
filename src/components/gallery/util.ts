export const SUPABASE_PROJECT_DOMAIN =
  'https://pajqyzcpmfrhpupdtupn.supabase.co';
export const SUPABASE_PHOTOS_URL = `${SUPABASE_PROJECT_DOMAIN}/storage/v1/object/public/photos`;
export const SUPABASE_VIDEOS_URL = `${SUPABASE_PROJECT_DOMAIN}/storage/v1/object/public/video`;

export const getResourceUrl = (
  id: string,
  options = {
    ext: 'jpg',
    isThumbnail: false,
    isVideo: false,
  } as {ext?: string; isThumbnail?: boolean; isVideo?: boolean}
) =>
  `${options.isVideo ? SUPABASE_VIDEOS_URL : SUPABASE_PHOTOS_URL}/${
    options.isThumbnail ? 'thumbnails/' : ''
  }${id}.${options.ext}`;

const classNamesByFileName: Record<string, string> = {
  IMG_4240: 'object-bottom',
  IMG_4674: 'object-bottom',
  IMG_4929: 'object-[0px_74%]',
  IMG_5426: 'object-[0px_65%]',
  IMG_4426: 'object-[0px_85%]',
  IMG_4312: 'object-[0px_30%]',
  IMG_4982: 'object-[0px_85%]',
  IMG_2052: 'object-[0px_20%]',
  IMG_2768: 'object-[0px_90%]',
  IMG_2243: 'object-[0px_40%]',
  IMG_5820: 'object-[0px_35%]',
  IMG_5819: 'object-[0px_25%]',
  antelope_island_vertical_bush_sunset: 'object-[0px_25%]',
  glacierFloat: 'object-[0px_65%]',
  hurricane_night_mesa_composite: 'object-[0px_95%]',
  hurricane_night_mesa_composite_vertical: 'object-[0px_95%]',
  kind_washoe_sunset_vertical: 'object-[0px_70%]',
  convict_lake_peak: 'object-[0px_20%]',
};
export const getClassNamesByFileName = (fileName: string) => {
  return classNamesByFileName[fileName] || '';
};
