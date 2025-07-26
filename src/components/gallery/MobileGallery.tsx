'use client';

import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Keyboard, EffectCreative} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import {PhotoMetadataWithTags} from '@/lib/photos';
import {getResourceUrl} from './util';
import {anton} from '@/util/fonts';
import GalleryItemDetailsButton from './GalleryItemDetailsButton';
import {ReactNode} from 'react';

const MobileGallery = ({
  photos,
  selectedPhotoIndex,
  onClick,
  closeButton,
}: {
  photos: PhotoMetadataWithTags[];
  selectedPhotoIndex: number;
  onClick: (index: number) => void;
  closeButton: ReactNode;
}) => {
  return (
    <div className={`${anton.className} fixed inset-0 z-50 bg-black`}>
      <Swiper
        initialSlide={selectedPhotoIndex}
        className="w-full h-full"
        modules={[EffectCreative, Pagination, Keyboard]}
        keyboard={{enabled: true}}
        pagination={{
          type: 'fraction',
        }}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex || swiper.activeIndex === 0) {
            onClick(swiper.activeIndex);
          }
        }}
      >
        {photos.map((photo, index) => {
          const isSelected = index === selectedPhotoIndex;
          const isNear = Math.abs(index - selectedPhotoIndex) <= 1;

          return (
            <SwiperSlide key={photo.file_name}>
              <div className={`w-full h-full bg-black`}>
                <Image
                  src={getResourceUrl(
                    photo.file_name,
                    isSelected || isNear
                      ? undefined
                      : {
                          isThumbnail: true,
                          ext: 'webp',
                        }
                  )}
                  alt={photo.file_name}
                  fill
                  className="object-contain swiper-lazy"
                  placeholder="blur"
                  blurDataURL={photo.blur!}
                  priority={false}
                />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
              </div>
            </SwiperSlide>
          );
        })}

        {photos[selectedPhotoIndex] && (
          <GalleryItemDetailsButton {...photos[selectedPhotoIndex]} />
        )}

        {closeButton}
      </Swiper>
    </div>
  );
};

export default MobileGallery;
