import {SupabaseClient} from '@/util/supabase/client';
import {Database} from './database.types';
import {PhotoMetadataWithTags} from './photos';

export type Location = Database['public']['Tables']['location']['Row'];
export type LocationWithTags = Location & {
  tags: Array<{id: number; name: string}>;
};

export interface QueryLocationsByIdOptions {
  id: number;
}
export type LocationByIdResult = Location & {
  photos: Array<PhotoMetadataWithTags>;
};
export const queryLocationsById = async (
  supabase: SupabaseClient,
  {id}: QueryLocationsByIdOptions
) => {
  const result = await supabase
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

  return {
    ...result,
    data: {
      ...result.data,
      // @ts-expect-error supabase
      photos: (result.data?.photos || []).map((photo) => ({
        ...photo,
        // @ts-expect-error supabase
        tags: photo.tags.map(({tag}) => tag),
      })),
    },
  };
};

export const queryAllLocations = async (supabase: SupabaseClient) =>
  await supabase.from('location_with_tags').select('*');
