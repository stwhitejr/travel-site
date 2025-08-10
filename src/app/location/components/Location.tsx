'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import LocationList from './LocationList';
import Header from '@/components/Header';
import {useEffect, useMemo, useState} from 'react';
import {Tag} from '@/lib/tags';
import LocationContext, {Trip} from '../context/LocationContext';
import LocationEntry from './LocationEntry';
import useLocations, {LocationWithCoordinates} from '../hooks/useLocations';
import {BUILD_CATEGORY_ID, EARLY_DAYS_CATEGORY_ID} from '@/util/constants';

export default function Location({tags}: {tags: Tag[]}) {
  const router = useRouter();
  const [trip, setTrip] = useState<Trip>(null);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));
  const response = useLocations();
  const locations = useMemo(() => {
    return (response.data || []).filter(
      (location) =>
        location.coordinates &&
        !location.tags.some((tag) => tag.id === BUILD_CATEGORY_ID) &&
        (!trip ||
          (trip === 1 &&
            location.tags.some((tag) => tag.id === EARLY_DAYS_CATEGORY_ID)) ||
          (trip === 2 &&
            !location.tags.some((tag) => tag.id === EARLY_DAYS_CATEGORY_ID)))
    ) as LocationWithCoordinates[];
  }, [response.data, trip]);

  useEffect(() => {
    // If the trip changed and we no longer have this location available we need to change to
    if (
      id &&
      locations.length > 0 &&
      !locations.find((location) => location.id === id)
    ) {
      router.push(`?id=${locations[0].id}`, {scroll: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip]);

  return (
    <LocationContext.Provider
      value={{
        id,
        trip,
        setTrip,
        locations,
      }}
    >
      {id ? (
        <div className="flex flex-col h-full md:overflow-y-hidden">
          <Header />
          <div className="flex-2 md:h-full relative md:overflow-y-hidden">
            <LocationEntry
              id={id}
              allTags={tags}
              onChangePage={(dir, id) => {
                router.push(`?id=${id}`, {scroll: false});
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <Header />
          <div className="flex-2 relative">
            <LocationList />
          </div>
        </div>
      )}
    </LocationContext.Provider>
  );
}
