import {useMemo} from 'react';
import useLocations from '../hooks/useLocations';
import {SubHeaderLink} from '@/components/SubHeader';

export default function LocationRelativeNavigation({id}: {id: number}) {
  const {data: locations = []} = useLocations();
  const {previous, next} = useMemo(() => {
    const currentIndex = locations.findIndex((entry) => entry.id === id);
    const nextIndex = currentIndex + 1;
    const previousIndex = currentIndex - 1;
    const lastIndex = locations.length - 1;
    return {
      previous:
        locations[currentIndex === 0 ? lastIndex : previousIndex] || null,
      next: locations[nextIndex >= lastIndex ? 0 : nextIndex] || null,
    };
  }, [locations, id]);

  return (
    <>
      {previous && (
        <SubHeaderLink dir="left" href={`/location?id=${previous.id}`}>
          {previous.title}
        </SubHeaderLink>
      )}
      {next && (
        <SubHeaderLink dir="right" href={`/location?id=${next.id}`}>
          {next.title}
        </SubHeaderLink>
      )}
    </>
  );
}
