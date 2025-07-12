import {SupabaseClient} from '@/util/supabase/client';
import {Database} from './database.types';
import {PhotoMetadata} from './photos';
import {Tag} from './tags';

export type Location = Database['public']['Tables']['location']['Row'];

export interface QueryLocationsByIdOptions {
  id: number;
}
export type LocationByIdResult = Location & {
  photos: Array<
    PhotoMetadata & {
      tags: Array<{tag: Tag}>;
    }
  >;
};
export const queryLocationsById = async (
  supabase: SupabaseClient,
  {id}: QueryLocationsByIdOptions
) =>
  await supabase
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

export const queryAllLocations = async (supabase: SupabaseClient) =>
  await supabase.from('location').select('*');
