'use client';

import {Location} from '@/lib/location';
import Link from 'next/link';
import {useParams} from 'next/navigation';

export default function LocationList({
  locations,
}: {
  locations: Array<Location>;
}) {
  const params = useParams<{location: string}>();

  return (
    <ul>
      {locations.map((loc) => {
        const isActive = parseInt(params.location, 10) === loc.id;
        return (
          <li key={loc.id} style={{fontWeight: isActive ? 'bold' : 'normal'}}>
            <Link href={`/location/${loc.id}`}>{loc.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
