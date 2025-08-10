import {
  LocationByIdResult,
  queryLocationsById,
  QueryLocationsByIdOptions,
} from '@/lib/location';
import {createClient} from '@/util/supabase/client';
import {useSuspenseQuery} from '@tanstack/react-query';

const getLocationsById = async (options: QueryLocationsByIdOptions) => {
  const supabase = await createClient();
  const result = await queryLocationsById(supabase, options);
  return result.data || ({} as LocationByIdResult);
};

export default function useLocationByIdQuery(
  options: QueryLocationsByIdOptions
) {
  return useSuspenseQuery({
    queryKey: ['locations-by-id', options.id],
    queryFn: () => getLocationsById(options),
    staleTime: 1000 * 60 * 5,
  });
}
