'use client';

import Gallery from '@/components/gallery/Gallery';
import {PhotoMetadataWithTags} from '@/lib/photos';
import {useMemo} from 'react';
import CategoryTitleDisplay from './CategoryTitleDisplay';
import {HeroTag, Tag} from '@/lib/tags';
import SubHeader from '@/components/SubHeader';
import CategoryRelativeNavigation from './CategoryRelativeNavigation';
import {CurrentPageComponentProps} from '@/components/page_slider/PageSlider';
import {BUILD_CATEGORY_ID, EARLY_DAYS_CATEGORY_ID} from '@/util/constants';

export interface CategoryProps {
  id: number | string;
  categoryName: {name: string; description?: string};
  photos: PhotoMetadataWithTags[];
  tags?: HeroTag[];
}

export default function Category({
  id,
  photos,
  categoryName,
  tags,
  onChangePage,
}: CurrentPageComponentProps & CategoryProps) {
  const AutoPlayButton = useMemo(() => {
    const AutoPlayButtonComponent = (props: {
      onClick: () => void;
      isAutoPlaying: boolean;
    }) => <CategoryTitleDisplay {...props} categoryName={categoryName} />;

    return AutoPlayButtonComponent;
  }, [categoryName]);

  const galleryTags = useMemo(
    () =>
      (tags || []).reduce((acc, tag) => {
        if (tag.tag_name && tag.tag_id) {
          acc.push({
            id: tag.tag_id,
            name: tag.tag_name,
            description: tag.tag_description || '',
          });
        }
        return acc;
      }, [] as Tag[]),
    [tags]
  );

  return (
    <div className="flex flex-col h-full md:overflow-y-hidden">
      <div>
        <SubHeader>
          <CategoryRelativeNavigation
            onClick={onChangePage}
            tags={tags || []}
            id={id}
          />
        </SubHeader>
      </div>
      <div className="m-2 flex-1 h-full md:overflow-y-auto">
        <Gallery
          ratingFilterThreshold={
            id === EARLY_DAYS_CATEGORY_ID || id === BUILD_CATEGORY_ID ? 0 : 2
          }
          photos={photos}
          AutoPlayButton={AutoPlayButton}
          tags={galleryTags}
        />
      </div>
    </div>
  );
}
