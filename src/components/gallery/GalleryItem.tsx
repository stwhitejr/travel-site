'use client';

import {PhotoMetadataWithTags} from '@/lib/photos';
import Image from 'next/image';
import {getClassNamesByFileName, getResourceUrl} from './util';
import {motion} from 'framer-motion';
import {useCallback, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import useIsMobile from '@/util/useIsMobile';

const getGridItemClass = (galleryLength: number, index: number) => {
  if (galleryLength <= 2) {
    return '';
  }
  if (galleryLength === 3) {
    switch (index) {
      case 0:
        return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
      default:
        return '';
    }
  }
  if (galleryLength === 6) {
    switch (index) {
      case 0:
        return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
      case 4:
        return 'md:col-start-5 md:col-end-6 md:row-start-1 md:row-end-3';
      default:
        return '';
    }
  }
  if (galleryLength === 7) {
    switch (index) {
      case 0:
        return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
      case 4:
        return 'md:col-start-5 md:col-end-6 md:row-start-1 md:row-end-3';
      case 3:
        return 'md:col-start-3 md:col-end-5';
      case 5:
        return 'md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-5';
      case 6:
        return 'md:col-start-4 md:col-end-6 md:row-start-3 md:row-end-5';
      default:
        return '';
    }
  }
  if (galleryLength === 8) {
    switch (index) {
      case 0:
        return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
      case 4:
        return 'md:col-start-5 md:col-end-6 md:row-start-1 md:row-end-3';
      case 3:
        return 'md:col-start-3 md:col-end-5';
      case 4:
        return 'md:col-start-1 md:col-end-3';
      case 6:
        return 'md:col-start-2 md:col-end-4';
      case 7:
        return 'md:col-start-4 md:col-end-6';
      default:
        return '';
    }
  }

  switch (index) {
    case 0:
      return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
    case 3:
      return 'md:col-start-3 md:col-end-5';
    case 4:
      return 'md:col-start-5 md:col-end-6 md:row-start-1 md:row-end-3';

    case 6:
      return 'md:col-start-2 md:col-end-4';

    default:
      return '';
  }
};

export default function GalleryItem({
  index,
  photo,
  onClick,
  shouldScrollTo,
  galleryLength,
}: {
  index: number;
  photo: PhotoMetadataWithTags;
  onClick: (index: number | null, scrollToIndex?: number | null) => void;
  shouldScrollTo?: boolean;
  galleryLength: number;
}) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const {ref: inViewRef, inView} = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Assign multi refs
  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (shouldScrollTo) {
      ref.current?.scrollIntoView({behavior: 'instant'});
    }
  }, [shouldScrollTo]);

  const handleClick = () => {
    onClick(index, index);
  };

  return (
    <motion.div
      ref={setRefs}
      layout
      className={`${getGridItemClass(
        galleryLength,
        index
      )} relative min-h-[180px]`}
    >
      {inView && (
        <Image
          priority
          src={getResourceUrl(
            photo.file_name,
            !isMobile
              ? undefined
              : {
                  isThumbnail: true,
                  ext: 'webp',
                }
          )}
          alt={`${photo.file_name} - ${photo.id}`}
          fill
          className={`rounded ${
            Math.round(Math.random()) ? 'grayscale' : ''
          } opacity-90 md:opacity-60 hover:opacity-100 object-cover ${`${getClassNamesByFileName(
            photo.file_name
          )} cursor-pointer`}`}
          onClick={handleClick}
          {...(photo.blur
            ? {placeholder: 'blur', blurDataURL: photo.blur}
            : {})}
        />
      )}
    </motion.div>
  );
}
