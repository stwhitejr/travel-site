'use client';

import {PhotoMetadata} from '@/lib/photos';
import Image from 'next/image';
import {getResourceUrl} from './util';
import {motion} from 'framer-motion';
import useGallery from './useGallery';
import './Gallery.css';

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

export default function Gallery({
  photos,
  onClick,
}: {
  photos: PhotoMetadata[];
  onClick?: (arg: number | null) => void;
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
        const priority = index <= 5;
        return (
          <motion.div
            layout
            key={index}
            className={`${
              isSelected
                ? 'row-span-2 col-span-2 md:row-span-4 md:col-span-3 h-[100vh] md:h-auto'
                : !selectedPhoto
                ? getGridItemClass(index)
                : ''
            } relative `}
            style={{minHeight: '120px'}}
          >
            <Image
              // TODO: use actual thumbnail images (smaller)
              src={getResourceUrl(
                photo.file_name,
                isSelected || priority
                  ? undefined
                  : {
                      isThumbnail: true,
                      ext: 'webp',
                    }
              )}
              // priority={priority}
              alt={photo.file_name}
              fill
              className={`cursor-pointer rounded opacity-50 hover:opacity-100 ${
                isSelected
                  ? 'Gallery-selectedPhoto opacity-100 object-contain'
                  : 'object-cover'
              }`}
              onClick={() => handleClick(isSelected ? null : index)}
              {...(photo.blur
                ? {placeholder: 'blur', blurDataURL: photo.blur}
                : {})}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
