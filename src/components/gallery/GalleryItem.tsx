'use client';

import {PhotoMetadataWithTags} from '@/lib/photos';
import Image from 'next/image';
import {getClassNamesByFileName, getResourceUrl} from './util';
import {motion} from 'framer-motion';
import {useCallback, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';

const priorityIndices = [0, 3, 4, 6, 8, 13];

const getGridItemClass = (
  galleryLength: number,
  columnLength: number,
  index: number
) => {
  if (columnLength === 2 || galleryLength === 1) {
    return '';
  }
  switch (index) {
    case 0:
      return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
    case 3:
      return 'md:col-start-5 md:col-end-6 md:row-start-1 md:row-end-3';
    case 4:
      return 'md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3';
    case 6:
      return 'md:col-start-2 md:col-end-4 md:row-start-3 md:row-end-5';
    case 8:
      return 'md:col-start-1 md:col-end-2 md:row-start-4 md:row-end-6';
    case 13:
      return 'md:col-start-4 md:col-end-6 md:row-start-5 md:row-end-6';

    default:
      return '';
  }
};

export default function GalleryItem({
  index,
  photo,
  onClick,
  shouldScrollTo,
  useThumbnail,
  gridColumnLength,
  galleryLength,
}: {
  index: number;
  photo: PhotoMetadataWithTags;
  onClick: (index: number | null, scrollToIndex?: number | null) => void;
  shouldScrollTo?: boolean;
  useThumbnail: boolean;
  gridColumnLength: number;
  galleryLength: number;
}) {
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

  const priority = galleryLength <= 4 || priorityIndices.includes(index);

  return (
    <motion.div
      ref={setRefs}
      layout
      className={`${getGridItemClass(
        galleryLength,
        gridColumnLength,
        index
      )} relative min-h-[120px]`}
    >
      {inView && (
        <Image
          priority={priority}
          src={getResourceUrl(
            photo.file_name,
            priority || !useThumbnail
              ? undefined
              : {
                  isThumbnail: true,
                  ext: 'webp',
                }
          )}
          alt={`${photo.file_name} - ${photo.id}`}
          fill
          className={`rounded opacity-90 md:opacity-60 hover:opacity-100 object-cover ${`${getClassNamesByFileName(
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
