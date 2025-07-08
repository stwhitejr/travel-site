import {getLocationById} from '@/lib/location';
import LocationListContainer from '../components/LocationListContainer';
import Gallery from '@/app/gallery/Gallery';

export default async function Location({
  params,
}: {
  params: Promise<{location: string}>;
}) {
  const {location} = await params;
  const {data} = await getLocationById(parseInt(location, 10));

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div>
          <LocationListContainer />
        </div>
        <div>
          <h1>{data?.description}</h1>
        </div>
      </div>
      <Gallery photos={data?.photos || []} />
    </div>
  );
}
