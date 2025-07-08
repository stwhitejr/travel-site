import {getServerClient} from '@/util/supabase/server';

export const getAllTags = async () => {
  const supabase = await getServerClient();
  return await supabase.from('tags').select('*');
};

export const getTagsWithHero = async () => {
  const supabase = await getServerClient();
  return await supabase.from('top_rated_photo_per_tag').select('*');
};
