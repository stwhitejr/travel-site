import {Suspense} from 'react';
import Location from './components/Location';
import {getAllTags} from '@/lib/tags';

export default async function LocationPage() {
  const tagsResponse = await getAllTags();
  return (
    <Suspense>
      <Location tags={tagsResponse.data || []} />
    </Suspense>
  );
}
