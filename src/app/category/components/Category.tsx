'use client';

import Gallery from '@/components/gallery/Gallery';
import {PhotoMetadata} from '@/lib/photos';
import {useMemo, useRef} from 'react';
import CategoryTitleDisplay from './CategoryTitleDisplay';

export default function Category({
  photos,
  categoryName,
}: {
  categoryName: {name: string; description?: string};
  photos: PhotoMetadata[];
}) {
  const galleryParentRef = useRef<HTMLDivElement>(null);

  const AutoPlayButton = useMemo(() => {
    const AutoPlayButtonComponent = (props: {
      onClick: () => void;
      isAutoPlaying: boolean;
    }) => <CategoryTitleDisplay {...props} categoryName={categoryName} />;

    return AutoPlayButtonComponent;
  }, [categoryName]);
  return (
    <div
      className="m-2 flex-1 h-full md:overflow-y-auto"
      ref={galleryParentRef}
    >
      <Gallery
        filterPhotosWithNoRating
        // @ts-expect-error its a div
        galleryParentRef={galleryParentRef}
        photos={photos}
        AutoPlayButton={AutoPlayButton}
      />
    </div>
  );
}
