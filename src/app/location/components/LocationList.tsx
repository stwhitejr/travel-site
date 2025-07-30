'use client';

import Globe, {LocationMarker, MarkerComponentProps} from '@/app/globe/Globe';
import Marker from '@/app/globe/Marker';
import Link from 'next/link';
import {useMemo} from 'react';
import useLocations from '../hooks/useLocations';
import {BUILD_CATEGORY_ID, EARLY_DAYS_CATEGORY_ID} from '@/util/constants';

const MarkerWithLink = (props: MarkerComponentProps) => {
  return (
    <Link href={`/location/?id=${props.id}`} onClick={props.onClick}>
      <Marker {...props} />
    </Link>
  );
};

export type Trip = 1 | 2 | null;

export default function LocationList({
  id,
  trip,
}: {
  id?: string | number;
  trip?: Trip;
}) {
  const {data: locations = []} = useLocations();

  const markers = useMemo(() => {
    return locations.reduce((acc, location) => {
      if (location.coordinates) {
        const isFromBuild = location.tags.some(
          (tag) => tag.id === BUILD_CATEGORY_ID
        );
        if (isFromBuild) {
          return acc;
        }
        if (!trip) {
          // @ts-expect-error coordinates is checked above
          acc = acc.concat(location);
        } else {
          const isTrip1 = location.tags.some(
            (tag) => tag.id === EARLY_DAYS_CATEGORY_ID
          );

          if ((trip === 1 && isTrip1) || (trip === 2 && !isTrip1)) {
            // @ts-expect-error coordinates is checked above
            acc = acc.concat(location);
          }
        }
      }
      return acc;
    }, [] as LocationMarker[]);
  }, [locations, trip]);

  return (
    <Globe
      markers={markers}
      selectedMarker={id}
      MarkerComponent={MarkerWithLink}
    />
  );
}
