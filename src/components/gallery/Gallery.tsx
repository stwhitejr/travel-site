'use client';

import {PhotoMetadata} from '@/lib/photos';
import useGallery from './useGallery';
import {ReactNode, RefObject} from 'react';
import GalleryItem from './GalleryItem';

export default function Gallery({
  photos,
  onClick,
  titleDisplay,
  galleryParentRef,
}: {
  photos: PhotoMetadata[];
  onClick?: (arg: number | null) => void;
  titleDisplay?: ReactNode;
  galleryParentRef?: RefObject<HTMLDivElement>;
}) {
  const {selectedPhoto, setSelectedPhotoIndex} = useGallery(photos);

  const handleClick = (index: number | null) => {
    setSelectedPhotoIndex(index);
    onClick?.(index);
  };

  return (
    <div
      // TODO: change grid based on total photos count?
      className={`grid grid-cols-2 md:grid-cols-5 gap-2 h-full`}
    >
      {[
        ...photos,
        ...photos,
        ...photos,
        ...photos,
        ...photos,
        ...photos,
        ...photos,
        ...photos,
      ].map((photo, index) => {
        const isSelected =
          selectedPhoto?.id === photo.id && index < photos.length;

        const showTitleEntry = titleDisplay && index === 0;
        return (
          <>
            {showTitleEntry && titleDisplay}
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={index}
              isSelected={isSelected}
              selectedPhotoExists={!!selectedPhoto}
              onClick={handleClick}
              galleryParentRef={galleryParentRef}
            />
          </>
        );
      })}
    </div>
  );
}
