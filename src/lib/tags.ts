import {getServerClient} from '@/util/supabase/server';
import {PhotoMetadata} from './photos';

export interface Tag {
  id: string;
  name: string;
}

export const getAllTags = async () => {
  const supabase = await getServerClient();
  return await supabase.from('tags').select('*');
};

export interface TopRatedPhotoPerTag extends PhotoMetadata {
  tag_id: number;
  tag_name: string;
}

export const getTagsWithHero = async () => {
  const supabase = await getServerClient();
  return (await supabase.from('top_rated_photo_per_tag').select('*')) as {
    data: TopRatedPhotoPerTag[];
  };
};
