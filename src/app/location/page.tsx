import {Suspense} from 'react';
import Location from './components/Location';

export default function LocationPage() {
  return (
    <Suspense>
      <Location />
    </Suspense>
  );
}
