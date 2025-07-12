'use client';

import Image from 'next/image';
import {getResourceUrl} from './util';
import {motion} from 'framer-motion';
import {PhotoMetadata} from '@/lib/photos';

export default function Thumbnail({
  photo,
  selectedPhoto,
  onClick,
}: {
  onClick: () => void;
  photo: PhotoMetadata;
  selectedPhoto: PhotoMetadata;
}) {
  return (
    <motion.div
      key={photo.id}
      layout
      className="w-30 h-30 overflow-hidden relative"
    >
      <Image
        src={getResourceUrl(photo.file_name)}
        alt=""
        fill
        className={`cursor-pointer object-cover border-2 rounded opacity-50 hover:opacity-100 ${
          selectedPhoto.id === photo.id ? 'border-white' : 'border-transparent'
        }`}
        priority={false}
        onClick={onClick}
      />
    </motion.div>
  );
}
