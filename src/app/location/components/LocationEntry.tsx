'use client';

import useLocationById from '../hooks/useLocationById';
import {Tag} from '@/lib/tags';

import {LoaderPinwheel} from 'lucide-react';
import SubHeader from '@/components/SubHeader';
import LocationIntro from './LocationIntro';
import Gallery from '@/components/gallery/Gallery';
import {useState} from 'react';
import LocationRelativeNavigation from './LocationRelativeNavigation';
import useIsMobile from '@/util/useIsMobile';
import {CurrentPageComponentProps} from '@/components/page_slider/PageSlider';

export default function LocationEntry({
  id,
  allTags,
  onChangePage,
  withinView = true,
}: CurrentPageComponentProps & {
  allTags: Tag[];
}) {
  const isMobile = useIsMobile();
  const [isCondensed, setIsCondensed] = useState<null | boolean>(null);
  const response = useLocationById({
    id: typeof id === 'string' ? parseInt(id, 10) : id,
  });

  const location = response.data;
  return (
    <div className="md:h-full md:overflow-y-hidden flex flex-col bg-black">
      <SubHeader>
        <LocationRelativeNavigation
          id={location.id}
          onChangeRelativeLocation={onChangePage}
        />
      </SubHeader>

      <div className="md:h-full  md:overflow-y-hidden">
        <div className={`${isCondensed ? 'h-[15%]' : 'h-[40vh] md:h-[40%]'}`}>
          <LocationIntro
            condensed={!!isCondensed}
            location={location}
            photos={location.photos}
            onClickResize={setIsCondensed}
          />
        </div>

        <div
          className={`flex p-[10px] md:overflow-y-hidden ${
            isCondensed ? 'h-[85%]' : 'md:h-[60%]'
          }`}
        >
          <div
            className="flex-1 md:h-full md:overflow-y-auto"
            onTouchStart={(e) => e.stopPropagation()}
          >
            {response.isLoading ? (
              <LoaderPinwheel
                size={50}
                className="font-5xl animate-spin m-auto"
              />
            ) : withinView ? (
              <Gallery
                tags={allTags}
                photos={location.photos}
                onClick={() => {
                  if (isCondensed === null && !isMobile) {
                    setIsCondensed(true);
                  }
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
