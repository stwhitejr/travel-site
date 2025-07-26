import {PhotoMetadataWithTags} from '@/lib/photos';
import {
  BadgeQuestionMark,
  BikeIcon,
  BirdIcon,
  CloudIcon,
  DogIcon,
  HammerIcon,
  HeartIcon,
  MapIcon,
  MountainIcon,
  SkullIcon,
  SnowflakeIcon,
  SproutIcon,
  TruckIcon,
  WavesIcon,
} from 'lucide-react';
import {ReactNode, useMemo} from 'react';

export const iconsByTagName: Record<string, typeof BikeIcon> = {
  bike: BikeIcon,
  king: DogIcon,
  camp: TruckIcon,
  water: WavesIcon,
  snow: SnowflakeIcon,
  mountains: MountainIcon,
  random: BadgeQuestionMark,
  desert: SkullIcon,
  trail: MapIcon,
  wildlife: BirdIcon,
  vista: CloudIcon,
  'early days': SproutIcon,
  build: HammerIcon,
  favorites: HeartIcon,
};

export default function LocationIcons(props: {
  photos: PhotoMetadataWithTags[];
}) {
  const icons = useMemo(() => {
    const tags = props.photos
      .map((photo) => photo.tags)
      .flat()
      .reduce((acc, entry) => {
        if (!entry?.name) {
          return acc;
        }
        acc.add(entry.name);
        return acc;
      }, new Set<string>());

    return [...tags].reduce((acc, tagName) => {
      if (tagName in iconsByTagName) {
        const Icon = iconsByTagName[tagName];
        if (Icon) {
          acc.push(
            <Icon className="inline m-[4px]" key={tagName} name={tagName} />
          );
        }
      }

      return acc;
    }, [] as ReactNode[]);
  }, [props.photos]);

  return <>{icons}</>;
}
