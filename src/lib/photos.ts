import {getServerClient} from '@/util/supabase/server';
import {Database} from './database.types';

export type PhotoMetadata =
  Database['public']['Tables']['photo_metadata']['Row'];

/**
 * TODO
 * write a script that goes through folder and resizes based on a max height/width
 * script can also auto generate this metadata list that i can then fill out after
 * should be able to derive orientation (anything else?)
 *
 * extra credit
 * see if you can train an AI to do automagically provide tags
 */

export const getPhotosByTag = async (tagId: number) => {
  const supabase = await getServerClient();
  const result = await supabase
    .from('photo_tags')
    .select(
      `
    photo:photo_metadata (
      *
    )
  `
    )
    .eq('tag_id', tagId);

  const data = result.data?.map((result) => result.photo);

  return {
    ...result,
    data,
  };
};
