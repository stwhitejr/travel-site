import {PhotoMetadataWithTags} from '@/lib/photos';
import {Tag} from '@/lib/tags';
import {FAVORITES_CATEGORY_ID} from '@/util/constants';
import {
  BadgeQuestionMark,
  BikeIcon,
  BirdIcon,
  DogIcon,
  HammerIcon,
  HeartIcon,
  MapIcon,
  MountainIcon,
  SkullIcon,
  SnowflakeIcon,
  SproutIcon,
  SunIcon,
  TruckIcon,
  WavesIcon,
} from 'lucide-react';
import Link from 'next/link';
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
  vista: SunIcon,
  'early days': SproutIcon,
  build: HammerIcon,
  favorites: HeartIcon,
};

export default function LocationIcons(props: {
  photos: PhotoMetadataWithTags[];
}) {
  const icons = useMemo(() => {
    const tags = props.photos.map((photo) => photo.tags).flat();
    const tagsById = tags.reduce((acc, tag) => {
      if (tag.id) {
        if (acc[tag.id]) {
          return acc;
        }
        // @ts-expect-error its a tag
        acc[tag.id] = tag;
      }
      return acc;
    }, {} as Record<string, Tag>);

    return Object.values(tagsById).reduce((acc, tag) => {
      if (tag.name in iconsByTagName && tag.id !== FAVORITES_CATEGORY_ID) {
        const Icon = iconsByTagName[tag.name];
        if (Icon) {
          acc.push(
            <Link key={tag.name} href={`/category/${tag.id}`}>
              <Icon className="inline m-[4px]" name={tag.name} />
            </Link>
          );
        }
      }

      return acc;
    }, [] as ReactNode[]);
  }, [props.photos]);

  return <>{icons}</>;
}
