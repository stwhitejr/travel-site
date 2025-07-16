import {getServerClient} from '@/util/supabase/server';
import {Database} from './database.types';

export type Tag = Database['public']['Tables']['tags']['Row'];
export const getAllTags = async () => {
  const supabase = await getServerClient();
  const response = await supabase.from('tags').select('*');
  return response;
};

export type HeroTag =
  Database['public']['Views']['top_rated_photo_per_tag']['Row'];
export const getTagsWithHero = async () => {
  const supabase = await getServerClient();
  return await supabase.from('top_rated_photo_per_tag').select('*');
};
