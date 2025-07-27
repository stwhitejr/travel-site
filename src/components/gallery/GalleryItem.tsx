'use client';

import {PhotoMetadataWithTags} from '@/lib/photos';
import Image from 'next/image';
import {getClassNamesByFileName, getResourceUrl} from './util';
import {motion} from 'framer-motion';
import './GalleryItem.css';
import {ReactNode, useCallback, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import GalleryItemDetailsButton from './GalleryItemDetailsButton';

const priorityIndices = [0, 3, 4, 6, 8, 13];

const getGridItemClass = (index: number) => {
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
  isSelected,
  selectedPhotoExists,
  index,
  photo,
  onClick,
  children,
  closeButton,
  shouldScrollTo,
}: {
  isSelected: boolean;
  selectedPhotoExists: boolean;
  index: number;
  photo: PhotoMetadataWithTags;
  onClick: (index: number | null, scrollToIndex?: number | null) => void;
  children?: ReactNode;
  closeButton: ReactNode;
  shouldScrollTo?: boolean;
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

  const priority = priorityIndices.includes(index);

  useEffect(() => {
    if (shouldScrollTo) {
      ref.current?.scrollIntoView({behavior: 'instant'});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldScrollTo]);

  const handleClick = () => {
    onClick(index, index);
  };

  return (
    <motion.div
      ref={setRefs}
      layout
      className={`${
        isSelected
          ? 'row-span-2 col-span-2 md:row-span-4 md:col-span-3 h-[100vh] md:h-auto'
          : !selectedPhotoExists
          ? getGridItemClass(index)
          : ''
      } relative min-h-[120px]`}
    >
      {inView && (
        <>
          <Image
            priority={priority}
            src={getResourceUrl(
              photo.file_name,
              isSelected || priority
                ? undefined
                : {
                    isThumbnail: true,
                    ext: 'webp',
                  }
            )}
            alt={`${photo.file_name} - ${photo.id}`}
            fill
            className={`rounded opacity-90 md:opacity-60 hover:opacity-100 ${
              isSelected
                ? 'GalleryItem-selectedPhoto opacity-100 md:opacity-100 object-contain'
                : `object-cover ${getClassNamesByFileName(
                    photo.file_name
                  )} cursor-pointer`
            }`}
            {...(!isSelected ? {onClick: handleClick} : {})}
            {...(photo.blur
              ? {placeholder: 'blur', blurDataURL: photo.blur}
              : {})}
          />
          {isSelected && (
            <>
              <GalleryItemDetailsButton {...photo}>
                {children}
              </GalleryItemDetailsButton>
              {closeButton}
            </>
          )}
        </>
      )}
    </motion.div>
  );
}
