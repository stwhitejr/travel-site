'use client';

import Gallery from '@/components/gallery/Gallery';
import {PhotoMetadataWithTags} from '@/lib/photos';
import {useMemo} from 'react';
import CategoryTitleDisplay from './CategoryTitleDisplay';
import {Tag} from '@/lib/tags';

export default function Category({
  photos,
  categoryName,
  tags,
}: {
  categoryName: {name: string; description?: string};
  photos: PhotoMetadataWithTags[];
  tags?: Tag[];
}) {
  const AutoPlayButton = useMemo(() => {
    const AutoPlayButtonComponent = (props: {
      onClick: () => void;
      isAutoPlaying: boolean;
    }) => <CategoryTitleDisplay {...props} categoryName={categoryName} />;

    return AutoPlayButtonComponent;
  }, [categoryName]);
  return (
    <div className="m-2 flex-1 h-full md:overflow-y-auto">
      <Gallery
        filterPhotosWithNoRating
        photos={photos}
        AutoPlayButton={AutoPlayButton}
        tags={tags}
      />
    </div>
  );
}
