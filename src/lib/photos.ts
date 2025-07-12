import {getServerClient} from '@/util/supabase/server';
import {Database} from './database.types';

export type PhotoMetadata =
  Database['public']['Tables']['photo_metadata']['Row'];

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

  const data = (result.data || []).map(
    // @ts-expect-error not sure why supabase is getting the typing wrong
    (result) => result.photo as PhotoMetadata
  );

  return {
    ...result,
    data,
  };
};
