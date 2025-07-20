'use server';

import {getServerClient} from '@/util/supabase/server';

export async function updateLocation(
  locationId: number,
  locationDraft: {index: number | null; title: string; description: string}
) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Access denied: not in development mode');
  }

  const supabase = await getServerClient();
  if (locationDraft.index !== null) {
    const {error} = await supabase.rpc('move_location_sort_index', {
      p_id: locationId,
      p_new_index: locationDraft.index,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  const {status, error} = await supabase
    .from('location')
    .update({
      title: locationDraft.title,
      description: locationDraft.description,
    })
    .eq('id', locationId);

  if (error) {
    throw new Error(error.message);
  }

  return status;
}
