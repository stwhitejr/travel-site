'use client';

import {PhotoMetadata} from '@/lib/photos';
import useGallery from './useGallery';
import {FC, RefObject, useEffect, useMemo, useState} from 'react';
import GalleryItem from './GalleryItem';

export default function Gallery({
  photos,
  onClick,
  AutoPlayButton,
  galleryParentRef,
}: {
  photos: PhotoMetadata[];
  onClick?: (arg: number | null) => void;
  AutoPlayButton?: FC<{onClick: () => void; isAutoPlaying: boolean}>;
  galleryParentRef?: RefObject<HTMLDivElement>;
}) {
  const [autoPlay, setAutoPlay] = useState(false);
  const sortedPhotos = useMemo(() => {
    return [...photos].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [photos]);
  const {selectedPhoto, setSelectedPhotoIndex, selectedPhotoIndex} =
    useGallery(sortedPhotos);

  const handleClick = (index: number | null) => {
    setSelectedPhotoIndex(index);
    onClick?.(index);
  };

  useEffect(() => {
    if (autoPlay) {
      let index = 1;
      setSelectedPhotoIndex(0);
      const interval = setInterval(() => {
        setSelectedPhotoIndex(index);
        if (selectedPhotoIndex === sortedPhotos.length - 1) {
          index = 0;
        } else {
          index++;
        }
      }, 4000);

      const listener = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Dead') {
          setAutoPlay(false);
          setSelectedPhotoIndex(null);
        }
      };

      window.addEventListener('keydown', listener);

      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', listener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null || autoPlay) {
        return;
      }
      if (
        e.key === 'ArrowRight' &&
        selectedPhotoIndex !== sortedPhotos.length - 1
      ) {
        setSelectedPhotoIndex(selectedPhotoIndex + 1);
      } else if (e.key === 'ArrowLeft' && selectedPhotoIndex !== 0) {
        setSelectedPhotoIndex(selectedPhotoIndex - 1);
      }
    };

    if (!!selectedPhoto) {
      window.addEventListener('keydown', listener);
    }

    return () => {
      window.removeEventListener('keydown', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhoto]);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-2 md:h-full`}>
      {AutoPlayButton && (
        <AutoPlayButton
          isAutoPlaying={autoPlay}
          onClick={() => {
            if (autoPlay) {
              setSelectedPhotoIndex(null);
            }
            setAutoPlay(!autoPlay);
          }}
        />
      )}

      {sortedPhotos.map((photo, index) => {
        const isSelected =
          selectedPhoto?.id === photo.id && index < photos.length;
        return (
          <>
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
