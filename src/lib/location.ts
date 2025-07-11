import {getServerClient} from '@/util/supabase/server';
import {Database} from './database.types';

export type Location = Database['public']['Tables']['location']['Row'];

export const getLocations = async () => {
  const supabase = await getServerClient();
  return await supabase.from('location').select('*');
};

export const getLocationById = async (id: number) => {
  const supabase = await getServerClient();
  return await supabase
    .from('location')
    .select(
      `
    *,
    photos:photo_metadata (
      *,
      tags:photo_tags (
        tag:tags (
          *
        )
      )
    )
  `
    )
    .eq('id', id)
    .single();
};
