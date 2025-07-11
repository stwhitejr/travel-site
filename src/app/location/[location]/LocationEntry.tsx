'use client';

import useGallery from '@/app/gallery/useGallery';
import Thumbnail from '@/app/gallery/Thumbnail';
import Image from 'next/image';
import {getResourceUrl} from '@/app/gallery/util';
import {anton} from '@/util/fonts';
import './LocationEntry.css';

export default function LocationEntry({locationList, ...props}) {
  const {setSelectedPhotoIndex, selectedPhoto} = useGallery(props.photos);
  return (
    <div>
      <div style={{display: 'flex', height: '50vh'}}>
        <div style={{width: '50%'}}>{locationList}</div>
        <div className="relative w-full">
          <Image
            src={getResourceUrl(selectedPhoto.file_name)}
            alt=""
            fill
            className="object-cover LocationThumbnail"
          />
          <h1
            className={`absolute p-4 text-4xl drop-shadow-xl  ${anton.className}`}
          >
            {props?.address}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap p-4">
        {props.photos.map((photo, index) => (
          <Thumbnail
            key={photo.id}
            photo={photo}
            selectedPhoto={selectedPhoto}
            onClick={() => setSelectedPhotoIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
