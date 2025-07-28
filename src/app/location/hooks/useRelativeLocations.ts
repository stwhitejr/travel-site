import {useMemo} from 'react';
import useLocations from './useLocations';

export default function useRelativeLocations(id: number) {
  const {data: locations = []} = useLocations();
  return useMemo(() => {
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
}
