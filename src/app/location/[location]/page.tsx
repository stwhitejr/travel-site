import {getLocationById} from '@/lib/location';
import LocationEntry from './LocationEntry';
import LocationListContainer from '../components/LocationListContainer';

export default async function Location({
  params,
}: {
  params: Promise<{location: string}>;
}) {
  const {location} = await params;
  const {data} = await getLocationById(parseInt(location, 10));

  return <LocationEntry locationList={<LocationListContainer />} {...data} />;
}
