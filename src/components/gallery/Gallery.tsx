'use client';

import {PhotoMetadataWithTags} from '@/lib/photos';
import useGallery from './useGallery';
import {FC, Fragment, useEffect, useMemo, useState} from 'react';
import GalleryItem from './GalleryItem';
import {Tag} from '@/lib/tags';
import PhotoSettings from './PhotoSettings';
import MobileGallery from './MobileGallery';
import useIsMobile from '@/util/useIsMobile';
import {XIcon} from 'lucide-react';

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

interface GalleryProps {
  photos: PhotoMetadataWithTags[];
  onClick?: (arg: number | null) => void;
  AutoPlayButton?: FC<{onClick: () => void; isAutoPlaying: boolean}>;
  filterPhotosWithNoRating?: boolean;
  tags?: Tag[];
}

export default function Gallery({
  photos,
  onClick,
  AutoPlayButton,
  filterPhotosWithNoRating,
  tags,
}: GalleryProps) {
  const isMobile = useIsMobile();
  const [autoPlay, setAutoPlay] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState<null | number>(null);

  const sortedPhotos = useMemo(() => {
    return (
      filterPhotosWithNoRating
        ? photos.filter((photo) => !!photo.rating)
        : [...photos]
    ).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [photos, filterPhotosWithNoRating]);
  const {selectedPhoto, setSelectedPhotoIndex, selectedPhotoIndex} =
    useGallery(sortedPhotos);

  const handleClick = (
    index: number | null,
    _scrollToIndex?: number | null
  ) => {
    setAutoPlay(false);
    setSelectedPhotoIndex(index);
    onClick?.(index);

    if (typeof _scrollToIndex !== 'undefined' && _scrollToIndex !== null) {
      setScrollToIndex(_scrollToIndex);
    } else if (index === null && scrollToIndex !== null) {
      setScrollToIndex(null);
    }
  };

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
      }, 3000);

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

  const closeButton = (
    <div
      onClick={() => handleClick(null, selectedPhotoIndex)}
      className={`absolute p-4 z-10 rounded-full top-2 right-2 drop-shadow-md bg-slate-800  text-white cursor-pointer`}
    >
      <XIcon size={20} />
    </div>
  );

  if (isMobile && selectedPhotoIndex !== null) {
    return (
      <MobileGallery
        onClick={handleClick}
        closeButton={closeButton}
        selectedPhotoIndex={selectedPhotoIndex}
        photos={sortedPhotos}
      />
    );
  }

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
          <Fragment key={photo.id}>
            <GalleryItem
              photo={photo}
              index={index}
              isSelected={isSelected}
              shouldScrollTo={scrollToIndex === index}
              selectedPhotoExists={!!selectedPhoto}
              onClick={handleClick}
              closeButton={closeButton}
            >
              {isSelected && process.env.NODE_ENV === 'development' && (
                <PhotoSettings allTags={tags} {...photo} />
              )}
            </GalleryItem>
          </Fragment>
        );
      })}
      {/* Creat extra grid items so the photos at the bottom of somethign to span */}
      {!isMobile && selectedPhoto && (
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
