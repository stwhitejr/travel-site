'use client';

import {PhotoMetadata} from '@/lib/photos';
import Image from 'next/image';
import {getResourceUrl} from './util';
import {motion} from 'framer-motion';
import Thumbnail from './Thumbnail';
import useGallery from './useGallery';

export default function Gallery({photos}: {photos: PhotoMetadata[]}) {
  const {selectedPhoto, isLandscape, setSelectedPhotoIndex} =
    useGallery(photos);

  return (
    <motion.div
      layout
      className={`flex ${
        !isLandscape ? 'flex-row' : 'flex-col'
      } gap-4 transition-all duration-500`}
      style={{height: '85vh'}}
    >
      <motion.div
        layout
        className={`relative rounded overflow-hidden ${
          isLandscape ? 'flex-3' : 'flex-1'
        }`}
      >
        {selectedPhoto.file_name &&
          selectedPhoto.width &&
          selectedPhoto.height && (
            <Image
              src={getResourceUrl(selectedPhoto.file_name)}
              alt=""
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              className="object-contain w-full h-full"
              style={{transition: 'transform 0.3s ease'}}
            />
          )}
      </motion.div>

      <motion.div
        layout
        className="flex gap-2 flex-wrap  flex-1 self-center justify-center"
      >
        {photos.map((photo, index) => (
          <Thumbnail
            key={photo.id}
            photo={photo}
            selectedPhoto={selectedPhoto}
            onClick={() => setSelectedPhotoIndex(index)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
