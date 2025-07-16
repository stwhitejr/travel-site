'use client';

import {useMemo} from 'react';
import {SubHeaderLink} from '@/components/SubHeader';
import {Tag} from '@/lib/tags';
import {iconsByTagName} from '@/app/location/components/LocationIcons';
import {ImageIcon} from 'lucide-react';

const capitalCase = (text: string) => {
  const [firstLetter, ...rest] = text;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

export default function CategoryRelativeNavigation({
  id,
  tags,
}: {
  id: number;
  tags: Tag[];
}) {
  const {previous, PreviousIcon, next, NextIcon} = useMemo(() => {
    const currentIndex = tags.findIndex((entry) => entry.id === id);
    const nextIndex = currentIndex + 1;
    const previousIndex = currentIndex - 1;
    const lastIndex = tags.length - 1;

    const previous = tags[currentIndex === 0 ? lastIndex : previousIndex];
    const next = tags[nextIndex >= lastIndex ? 0 : nextIndex];
    return {
      previous: previous || null,
      PreviousIcon: (previous && iconsByTagName[previous.name]) || ImageIcon,
      next: next || null,
      NextIcon: (next && iconsByTagName[next.name]) || ImageIcon,
    };
  }, [tags, id]);

  return (
    <>
      {previous && (
        <SubHeaderLink dir="left" href={`/category/${previous.id}`}>
          {capitalCase(previous.name)} <PreviousIcon className="inline w-4" />
        </SubHeaderLink>
      )}
      {next && (
        <SubHeaderLink dir="right" href={`/category/${next.id}`}>
          {capitalCase(next.name)} <NextIcon className="inline w-4" />
        </SubHeaderLink>
      )}
    </>
  );
}
