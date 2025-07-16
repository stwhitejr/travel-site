'use client';

import Gallery from '@/components/gallery/Gallery';
import {PhotoMetadata} from '@/lib/photos';
import {useRef} from 'react';
import CategoryTitleDisplay from './CategoryTitleDisplay';

export default function Category({
  photos,
  categoryName,
}: {
  categoryName: string;
  photos: PhotoMetadata[];
}) {
  const galleryParentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="m-2 flex-1 h-full md:overflow-y-auto"
      ref={galleryParentRef}
    >
      <Gallery
        // @ts-expect-error its a div
        galleryParentRef={galleryParentRef}
        photos={photos}
        titleDisplay={<CategoryTitleDisplay categoryName={categoryName} />}
      />
    </div>
  );
}
