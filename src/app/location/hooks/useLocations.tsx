import {LocationWithTags, queryAllLocations} from '@/lib/location';
import {createClient} from '@/util/supabase/client';
import {useQuery} from '@tanstack/react-query';

const getLocations = async () => {
  const supabase = createClient();
  const result = await queryAllLocations(supabase);

  return (result.data || []) as LocationWithTags[];
};

export type LocationWithCoordinates = Omit<LocationWithTags, 'coordinates'> & {
  coordinates: [number, number];
};

export default function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
    staleTime: 1000 * 60 * 5,
  });
}
