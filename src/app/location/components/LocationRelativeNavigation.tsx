import {useMemo} from 'react';
import useLocations from '../hooks/useLocations';
import Link from 'next/link';
import {ChevronRightIcon, ChevronLeftIcon} from 'lucide-react';

const linkClasses = `text-sm hover:underline`;

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
    <div className="flex gap-4 items-center">
      {previous && (
        <Link href={`/location?id=${previous.id}`} className={linkClasses}>
          <ChevronLeftIcon className="inline w-3" /> {previous.title}
        </Link>
      )}
      {next && (
        <Link href={`/location?id=${next.id}`} className={linkClasses}>
          {next.title} <ChevronRightIcon className="inline w-3" />
        </Link>
      )}
    </div>
  );
}
