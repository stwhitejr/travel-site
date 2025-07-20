'use server';

import {getServerClient} from '@/util/supabase/server';

export async function deleteLocation({
  id,
  photoIds,
  newLocationId,
}: {
  id: number;
  photoIds: number[];
  newLocationId: number;
}) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Access denied: not in development mode');
  }

  const supabase = await getServerClient();

  const {status, error} = await supabase.rpc(
    'move_photos_and_delete_location',
    {
      p_old_location_id: id,
      p_new_location_id: newLocationId,
      p_photo_ids: photoIds,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return status;
}
