'use client';

import {PhotoMetadataWithTags} from '@/lib/photos';
import useGallery from './useGallery';
import {FC, Fragment, useEffect, useMemo, useRef, useState} from 'react';
import GalleryItem from './GalleryItem';
import {Tag} from '@/lib/tags';
import ModalGallery from './ModalGallery';
import useIsMobile from '@/util/useIsMobile';
import {XIcon} from 'lucide-react';
import SwipeToCallback from './SwipeToCallback';
import {motion} from 'framer-motion';
import {createPortal} from 'react-dom';
import {SwiperRef} from 'swiper/react';

interface GalleryProps {
  photos: PhotoMetadataWithTags[];
  onClick?: (arg: number | null) => void;
  TitleCard?: FC;
  filterPhotosWithNoRating?: boolean;
  tags?: Tag[];
  ratingFilterThreshold?: number;
  tagsDenyList?: number[];
}

export default function Gallery({
  photos,
  onClick,
  TitleCard,
  tags,
  tagsDenyList = [],
  ratingFilterThreshold = 2,
}: GalleryProps) {
  const modalGallerySwiperRef = useRef<SwiperRef>(null);
  const isMobile = useIsMobile();

  const [scrollToIndex, setScrollToIndex] = useState<null | number>(null);

  const sortedPhotos = useMemo(() => {
    return photos
      .filter(
        (photo) =>
          (photo.rating || 0) >= ratingFilterThreshold &&
          !photo.tags.some((tag) => tagsDenyList.includes(tag.id))
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, ratingFilterThreshold]);

  const {setSelectedPhotoIndex, selectedPhotoIndex} = useGallery(sortedPhotos);

  const handleClick = (
    index: number | null,
    _scrollToIndex?: number | null
  ) => {
    setSelectedPhotoIndex(index);
    onClick?.(index);

    if (typeof _scrollToIndex !== 'undefined' && _scrollToIndex !== null) {
      setScrollToIndex(_scrollToIndex);
    } else if (index === null && scrollToIndex !== null) {
      setScrollToIndex(null);
    }
  };

  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      const listener = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Dead') {
          setSelectedPhotoIndex(null);
        }
      };

      window.addEventListener('keydown', listener);
      return () => {
        window.removeEventListener('keydown', listener);
      };
    }
  }, [selectedPhotoIndex]);

  const closeButton = (
    <div
      onClick={() => handleClick(null, selectedPhotoIndex)}
      className={`inline-block p-2 rounded-full drop-shadow-md bg-slate-800  text-white cursor-pointer`}
    >
      <XIcon />
    </div>
  );

  const galleryLength = sortedPhotos.length;
  const gridColumnLength = galleryLength >= 5 ? 5 : galleryLength;
  const isMultiRowGrid = galleryLength > 5;

  return (
    <>
      {selectedPhotoIndex !== null &&
        createPortal(
          <SwipeToCallback
            callback={() => handleClick(null)}
            className="fixed inset-0 z-50 touch-none p-10 bg-[#0f0e0e]"
          >
            <ModalGallery
              ref={modalGallerySwiperRef}
              onClick={handleClick}
              selectedPhotoIndex={selectedPhotoIndex}
              photos={sortedPhotos}
              closeButton={!isMobile && closeButton}
              tags={tags}
            />
          </SwipeToCallback>,
          document.body
        )}
      <motion.div
        initial={{opacity: 0}}
        transition={{
          duration: 1.5,
        }}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className={`grid grid-cols-2 md:grid-cols-${gridColumnLength} gap-2 md:h-full`}
      >
        {TitleCard && <TitleCard />}

        {sortedPhotos.map((photo, index) => {
          return (
            <Fragment key={photo.id}>
              <GalleryItem
                photo={photo}
                index={index}
                galleryLength={galleryLength}
                useThumbnail={isMultiRowGrid}
                gridColumnLength={gridColumnLength}
                shouldScrollTo={!isMobile && scrollToIndex === index}
                onClick={handleClick}
              />
            </Fragment>
          );
        })}
      </motion.div>
    </>
  );
}
