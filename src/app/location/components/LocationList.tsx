'use client';

import Globe, {LocationMarker, MarkerComponentProps} from '@/app/globe/Globe';
import Marker from '@/app/globe/Marker';
import Link from 'next/link';
import {useMemo} from 'react';
import useLocations from '../hooks/useLocations';

const MarkerWithLink = (props: MarkerComponentProps) => {
  return (
    <Link href={`/location/?id=${props.id}`}>
      <Marker {...props} />
    </Link>
  );
};

export default function LocationList({id}: {id?: string | number}) {
  const {data: locations = []} = useLocations();

  const markers = useMemo(() => {
    return locations.reduce((acc, location) => {
      if (location.coordinates) {
        acc = acc.concat(location);
      }
      return acc;
    }, [] as LocationMarker[]);
  }, [locations]);

  return (
    <Globe
      markers={markers}
      selectedMarker={id}
      MarkerComponent={MarkerWithLink}
    />
  );
}
