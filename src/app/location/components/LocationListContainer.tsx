import {getLocations} from '@/lib/location';
import LocationList from './LocationList';

export default async function LocationListContainer() {
  const response = await getLocations();

  return <LocationList locations={response.data || []} />;
}
