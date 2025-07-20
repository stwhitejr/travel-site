'use server';

import {getServerClient} from '@/util/supabase/server';

export async function updatePhotoRating(id: number, rating: number) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Access denied: not in development mode');
  }

  const supabase = await getServerClient();
  const {data, error} = await supabase
    .from('photo_metadata')
    .update({rating})
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
