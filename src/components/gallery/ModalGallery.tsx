'use client';

import Image from 'next/image';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {
  Pagination,
  Keyboard,
  EffectCreative,
  Virtual,
  Navigation,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import {PhotoMetadataWithTags} from '@/lib/photos';
import {getResourceUrl} from './util';
import GalleryItemDetailsButton from './GalleryItemDetailsButton';
import {forwardRef, ReactNode, useEffect} from 'react';
import {usePageSliderContext} from '../page_slider/PageSlider';
import PhotoSettings from './PhotoSettings';
import {Tag} from '@/lib/tags';
import useIsMobile from '@/util/useIsMobile';

const ModalGallery = forwardRef<
  SwiperRef,
  {
    photos: PhotoMetadataWithTags[];
    selectedPhotoIndex: number;
    onClick: (index: number) => void;
    closeButton?: ReactNode;
    tags?: Tag[];
  }
>(({photos, selectedPhotoIndex, onClick, closeButton, tags}, ref) => {
  const isMobile = useIsMobile();
  const pageSliderContext = usePageSliderContext();
  useEffect(() => {
    if (pageSliderContext.disableSwiper) {
      pageSliderContext.disableSwiper();
    }
    return () => {
      if (pageSliderContext.enableSwiper) {
        pageSliderContext.enableSwiper();
      }
    };
  }, [pageSliderContext]);

  return (
    <Swiper
      ref={ref}
      virtual
      initialSlide={selectedPhotoIndex}
      className="w-full h-full"
      modules={[EffectCreative, Pagination, Keyboard, Virtual, Navigation]}
      keyboard={{enabled: true}}
      navigation={!isMobile}
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
            <div className={`w-full h-full bg-[#0f0e0e]`}>
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

      <div className="absolute top-5 right-5 z-10 text-right">
        {closeButton}
        {photos[selectedPhotoIndex] && (
          <GalleryItemDetailsButton {...photos[selectedPhotoIndex]}>
            {process.env.NODE_ENV === 'development' && (
              <PhotoSettings allTags={tags} {...photos[selectedPhotoIndex]} />
            )}
          </GalleryItemDetailsButton>
        )}
      </div>
    </Swiper>
  );
});
ModalGallery.displayName = 'ModalGallery';

export default ModalGallery;
