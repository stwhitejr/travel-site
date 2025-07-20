'use server';

import {getServerClient} from '@/util/supabase/server';

export async function updatePhotoTags(photoId: number, tagIds: number[]) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Access denied: not in development mode');
  }

  const supabase = await getServerClient();
  const {data, error} = await supabase.rpc('replace_photo_tags', {
    p_photo_id: photoId,
    p_tags: tagIds,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
