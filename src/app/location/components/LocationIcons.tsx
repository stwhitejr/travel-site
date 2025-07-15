import {LocationPhotoEntry} from '@/lib/location';
import {
  BikeIcon,
  DogIcon,
  MountainIcon,
  SnowflakeIcon,
  TentIcon,
  WavesIcon,
} from 'lucide-react';
import {ReactNode, useMemo} from 'react';

const iconsByTagName: Record<string, typeof BikeIcon> = {
  'mountain biking': BikeIcon,
  king: DogIcon,
  camp: TentIcon,
  water: WavesIcon,
  snow: SnowflakeIcon,
  mountains: MountainIcon,
};

export default function LocationIcons(props: {photos: LocationPhotoEntry[]}) {
  const icons = useMemo(() => {
    const tags = props.photos
      .map((photo) => photo.tags)
      .flat()
      .reduce((acc, entry) => {
        if (!entry?.tag.name) {
          return acc;
        }
        acc.add(entry.tag.name);
        return acc;
      }, new Set<string>());

    return [...tags].reduce((acc, tagName) => {
      if (tagName in iconsByTagName) {
        const Icon = iconsByTagName[tagName];
        if (Icon) {
          acc.push(<Icon name={tagName} />);
        }
      }

      return acc;
    }, [] as ReactNode[]);
  }, [props.photos]);

  return <>{icons}</>;
}
