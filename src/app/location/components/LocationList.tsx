'use client';

import Globe, {LocationMarker, MarkerComponentProps} from '@/app/globe/Globe';
import Marker from '@/app/globe/Marker';
import {Location} from '@/lib/location';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {useMemo} from 'react';

const MarkerWithLink = (props: MarkerComponentProps) => {
  return (
    <Link href={`/location/${props.id}`}>
      <Marker {...props} />
    </Link>
  );
};

export default function LocationList({
  locations,
}: {
  locations: Array<Location>;
}) {
  const params = useParams<{location: string}>();

  const markers = useMemo(() => {
    return locations.reduce((acc, location) => {
      if (location.coordinates) {
        // @ts-expect-error this is checked above
        acc = acc.concat(location);
      }
      return acc;
    }, [] as LocationMarker[]);
  }, [locations]);

  return (
    <Globe
      markers={markers}
      selectedMarker={parseInt(params.location, 10)}
      MarkerComponent={MarkerWithLink}
    />
  );
}
