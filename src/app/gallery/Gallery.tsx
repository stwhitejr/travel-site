'use client';

import {PhotoMetadata} from '@/lib/photos';
import Image from 'next/image';
import {getImageUrl} from './util';

export default function Gallery({photos}: {photos: PhotoMetadata[]}) {
  return (
    <div
      style={{
        backgroundColor: '#999',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {photos.map((photo) => (
        <Image
          key={photo.id}
          width={200}
          height={200}
          src={getImageUrl(photo.file_name)}
          alt={photo.file_name}
        />
      ))}
    </div>
  );
}
