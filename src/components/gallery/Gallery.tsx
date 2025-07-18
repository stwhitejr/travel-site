'use client';

import {PhotoMetadata} from '@/lib/photos';
import useGallery from './useGallery';
import {FC, RefObject, useCallback, useEffect, useMemo, useState} from 'react';
import GalleryItem from './GalleryItem';
import {useSwipe} from '@/util/useSwipe';

const incrementIndex = ({
  index,
  count,
  dir,
}: {
  index: number;
  count: number;
  dir: 'left' | 'right';
}) => {
  if (dir === 'right') {
    if (index === count - 1) {
      return 0;
    }
    return index + 1;
  } else if (index === 0) {
    return count - 1;
  }
  return index - 1;
};

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
    setAutoPlay(false);
    setSelectedPhotoIndex(index);
    onClick?.(index);
  };

  const handleSwipe = useCallback(
    (dir: 'left' | 'right') => {
      if (selectedPhotoIndex !== null) {
        setSelectedPhotoIndex(
          incrementIndex({
            index: selectedPhotoIndex,
            count: sortedPhotos.length,
            dir,
          })
        );
      }
    },
    [setSelectedPhotoIndex, selectedPhotoIndex, sortedPhotos]
  );

  useSwipe(handleSwipe);

  useEffect(() => {
    if (autoPlay) {
      let index = 1;
      setSelectedPhotoIndex(0);
      const interval = setInterval(() => {
        setSelectedPhotoIndex(index);
        index = incrementIndex({
          index,
          count: sortedPhotos.length,
          dir: 'right',
        });
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
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex(
          incrementIndex({
            index: selectedPhotoIndex,
            count: sortedPhotos.length,
            dir: 'right',
          })
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex(
          incrementIndex({
            index: selectedPhotoIndex,
            count: sortedPhotos.length,
            dir: 'left',
          })
        );
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
      {/* Creat extra grid items so the photos at the bottom of somethign to span */}
      {selectedPhoto && (
        <>
          <div className="h-full min-h-[120px]">&nbsp;</div>
          <div className="h-full min-h-[120px]">&nbsp;</div>
          <div className="h-full min-h-[120px]">&nbsp;</div>
          <div className="h-full min-h-[120px]">&nbsp;</div>
          <div className="h-full min-h-[120px]">&nbsp;</div>
          <div className="h-full min-h-[120px]">&nbsp;</div>
          <div className="h-full min-h-[120px]">&nbsp;</div>
        </>
      )}
    </div>
  );
}
