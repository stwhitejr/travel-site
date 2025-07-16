'use client';

import {PhotoMetadata} from '@/lib/photos';
import Image from 'next/image';
import {getResourceUrl} from './util';
import {motion} from 'framer-motion';
import './GalleryItem.css';
import {RefObject, useCallback, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';

const getGridItemClass = (index: number) => {
  switch (index) {
    case 0:
      return 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3';
    case 3:
      return 'md:col-start-5 md:col-end-6 md:row-start-1 md:row-end-3';
    case 4:
      return 'md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3';

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
  galleryParentRef,
}: {
  isSelected: boolean;
  selectedPhotoExists: boolean;
  index: number;
  photo: PhotoMetadata;
  onClick: (index: number | null) => void;
  galleryParentRef?: RefObject<HTMLDivElement>;
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

  const previousScrollData = useRef({elementType: 'window', to: null} as {
    elementType: 'window' | 'ref';
    to: number | null;
  });

  const priority = index <= 5;

  useEffect(() => {
    if (isSelected) {
      previousScrollData.current = {
        elementType: !!galleryParentRef?.current.scrollTop ? 'ref' : 'window',
        to: galleryParentRef?.current.scrollTop || window.scrollY || 0,
      };

      ref.current?.scrollIntoView({behavior: 'smooth'});
    } else if (previousScrollData.current.to !== null) {
      console.log('previousScrollData', previousScrollData);
      (previousScrollData.current.elementType === 'window'
        ? window
        : galleryParentRef?.current
      )?.scrollTo({
        top: previousScrollData.current.to,
        behavior: 'smooth',
      });
      previousScrollData.current.to = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

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
      } relative `}
      style={{minHeight: '120px'}}
    >
      {inView && (
        <Image
          src={getResourceUrl(
            photo.file_name,
            isSelected || priority
              ? undefined
              : {
                  isThumbnail: true,
                  ext: 'webp',
                }
          )}
          alt={photo.file_name}
          fill
          className={`cursor-pointer rounded hover:grayscale-0 md:opacity-80 hover:opacity-100 ${
            isSelected
              ? ' opacity-100 object-contain'
              : 'object-cover grayscale'
          }`}
          onClick={() => onClick(isSelected ? null : index)}
          {...(photo.blur
            ? {placeholder: 'blur', blurDataURL: photo.blur}
            : {})}
        />
      )}
    </motion.div>
  );
}
