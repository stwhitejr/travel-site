import {SubHeaderLink} from '@/components/SubHeader';
import {truncateText} from '@/util/helpers';
import useRelativeLocations from '../hooks/useRelativeLocations';
import {CurrentPageComponentProps} from '@/components/page_slider/PageSlider';

export interface LocationRelativeNavigationProps {
  id: number;
  onChangeRelativeLocation: CurrentPageComponentProps['onChangePage'];
}

export default function LocationRelativeNavigation({
  id,
  onChangeRelativeLocation,
}: LocationRelativeNavigationProps) {
  const {previous, next} = useRelativeLocations(id);

  return (
    <>
      {previous && (
        <SubHeaderLink
          dir="left"
          onClick={() => onChangeRelativeLocation('previous', previous.id)}
        >
          {truncateText(previous.title)}
        </SubHeaderLink>
      )}
      {next && (
        <SubHeaderLink
          dir="right"
          onClick={() => onChangeRelativeLocation('next', next.id)}
        >
          {truncateText(next.title)}
        </SubHeaderLink>
      )}
    </>
  );
}
