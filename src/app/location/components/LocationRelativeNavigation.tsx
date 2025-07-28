import {SubHeaderLink} from '@/components/SubHeader';
import {truncateText} from '@/util/helpers';
import useRelativeLocations from '../hooks/useRelativeLocations';

export default function LocationRelativeNavigation({
  id,
  onChangeRelativeLocation,
}: {
  id: number;
  onChangeRelativeLocation: (dir: 'previous' | 'next') => void;
}) {
  const {previous, next} = useRelativeLocations(id);

  return (
    <>
      {previous && (
        <SubHeaderLink
          dir="left"
          onClick={() => onChangeRelativeLocation('previous')}
        >
          {truncateText(previous.title)}
        </SubHeaderLink>
      )}
      {next && (
        <SubHeaderLink
          dir="right"
          onClick={() => onChangeRelativeLocation('next')}
        >
          {truncateText(next.title)}
        </SubHeaderLink>
      )}
    </>
  );
}
