'use client';

import useGallery from '@/components/gallery/useGallery';
import Thumbnail from '@/components/gallery/Thumbnail';
import Image from 'next/image';
import {getResourceUrl} from '@/components/gallery/util';
import {anton} from '@/util/fonts';
import './LocationEntry.css';
import LocationList from './LocationList';
import {LoaderPinwheel} from 'lucide-react';
import {LocationByIdResult} from '@/lib/location';

export default function LocationEntry({
  isLoading = false,
  photos = [],
  ...props
}: LocationByIdResult & {
  isLoading?: boolean;
}) {
  const {setSelectedPhotoIndex, selectedPhoto} = useGallery(photos);

  return (
    <div style={{display: 'flex', height: '100%'}}>
      <div className="flex flex-col overflow-hidden" style={{width: '50%'}}>
        <div className="flex-1">
          <LocationList id={props.id} />
        </div>

        <div className="flex-1 flex flex-wrap p-4 overflow-y-auto">
          {!isLoading &&
            photos.map((photo, index) => (
              <Thumbnail
                key={photo.id}
                photo={photo}
                selectedPhoto={selectedPhoto}
                onClick={() => setSelectedPhotoIndex(index)}
              />
            ))}
        </div>
      </div>
      {isLoading ? (
        <LoaderPinwheel size={50} className="font-5xl animate-spin m-auto" />
      ) : (
        <>
          {selectedPhoto && (
            <div className="relative w-full h-full">
              <Image
                src={getResourceUrl(selectedPhoto.file_name)}
                alt=""
                fill
                className="object-cover LocationEntry-hero"
              />
              <h1
                className={`absolute p-4 text-4xl drop-shadow-xl  ${anton.className}`}
              >
                {props?.address}
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
