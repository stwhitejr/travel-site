'use client';

import {useMemo} from 'react';
import {SubHeaderLink} from '@/components/SubHeader';
import {HeroTag} from '@/lib/tags';
import {iconsByTagName} from '@/app/location/components/LocationIcons';
import {ImageIcon} from 'lucide-react';
import {truncateText} from '@/util/helpers';
import {CurrentPageComponentProps} from '@/components/page_slider/PageSlider';

interface CategoryRelativeNavigationProps {
  id: number | string;
  tags: HeroTag[];
}

export const useRelativeCategories = ({
  tags,
  id,
}: CategoryRelativeNavigationProps) => {
  return useMemo(() => {
    const currentIndex = tags.findIndex((entry) => entry.tag_id == id);
    const nextIndex = currentIndex + 1;
    const previousIndex = currentIndex - 1;
    const lastIndex = tags.length - 1;

    const previous = tags[currentIndex === 0 ? lastIndex : previousIndex];
    console.log(
      'previos',
      currentIndex === 0 ? lastIndex : previousIndex,
      previousIndex,
      id
    );
    const next = tags[nextIndex >= lastIndex ? 0 : nextIndex];
    return {
      previous: previous || null,
      PreviousIcon:
        (previous?.tag_name && iconsByTagName[previous.tag_name]) || ImageIcon,
      next: next || null,
      NextIcon: (next?.tag_name && iconsByTagName[next.tag_name]) || ImageIcon,
    };
  }, [tags, id]);
};

export default function CategoryRelativeNavigation({
  id,
  tags,
  onClick,
}: CategoryRelativeNavigationProps & {
  onClick: CurrentPageComponentProps['onChangePage'];
}) {
  const {previous, PreviousIcon, next, NextIcon} = useRelativeCategories({
    id,
    tags,
  });

  return (
    <>
      {previous && (
        <SubHeaderLink dir="left" onClick={() => onClick('previous')}>
          {truncateText(previous.tag_description || previous.tag_name || '')}{' '}
          <PreviousIcon className="inline w-4" />
        </SubHeaderLink>
      )}
      {next && (
        <SubHeaderLink dir="right" onClick={() => onClick('next')}>
          {truncateText(next.tag_description || next.tag_name || '')}{' '}
          <NextIcon className="inline w-4" />
        </SubHeaderLink>
      )}
    </>
  );
}
