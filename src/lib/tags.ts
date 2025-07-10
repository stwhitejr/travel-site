import {getServerClient} from '@/util/supabase/server';

export const getAllTags = async () => {
  const supabase = await getServerClient();
  const response = await supabase.from('tags').select('*');
  return {
    ...response,
    data: response.data?.reduce((acc, tag) => {
      acc[tag.id] = tag.name;
      return acc;
    }, {}),
  };
};

export const getTagsWithHero = async () => {
  const supabase = await getServerClient();
  return await supabase.from('top_rated_photo_per_tag').select('*');
};
