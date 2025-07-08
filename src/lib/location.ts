import {PhotoMetadata} from './photos';
import {getServerClient} from '@/util/supabase/server';

export interface Location {
  id: string;
  coordinates: [number, number];
  title: string;
  description: string;
  address: string;
}
export interface HydratedLocation extends Location {
  photos: PhotoMetadata[];
}

export const getLocations = async () => {
  const supabase = await getServerClient();
  return await supabase.from('location').select<'*', Location>('*');
};
export const getLocationById = async (id: number | string) => {
  const supabase = await getServerClient();
  return (await supabase
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
    .single()) as {data: HydratedLocation};
};
