'use client';

import {LoaderPinwheel} from 'lucide-react';
import {LocationByIdResult} from '@/lib/location';
import SubHeader from '@/components/SubHeader';
import LocationIntro from './LocationIntro';
import Gallery from '@/components/gallery/Gallery';
import {useState} from 'react';
import LocationRelativeNavigation from './LocationRelativeNavigation';
import useIsMobile from '@/util/useIsMobile';

export default function LocationEntry({
  isLoading = false,
  photos = [],
  ...props
}: LocationByIdResult & {
  isLoading?: boolean;
}) {
  const isMobile = useIsMobile();
  const [isCondensed, setIsCondensed] = useState<null | boolean>(null);

  return (
    <div className="h-full md:overflow-y-hidden flex flex-col">
      <SubHeader
        backHref="/location"
        relativeNavigation={<LocationRelativeNavigation id={props.id} />}
      />

      <div className="h-full md:overflow-y-hidden">
        <div className={`${isCondensed ? 'h-[15%]' : 'h-[30%]'}`}>
          <LocationIntro
            condensed={!!isCondensed}
            location={props}
            photos={photos}
            onClickResize={setIsCondensed}
          />
        </div>

        <div
          className={`flex p-[10px] md:overflow-y-hidden ${
            isCondensed ? 'h-[85%]' : 'h-[70%]'
          }`}
        >
          <div className="flex-1 h-full md:overflow-y-auto">
            {isLoading ? (
              <LoaderPinwheel
                size={50}
                className="font-5xl animate-spin m-auto"
              />
            ) : (
              <Gallery
                photos={photos}
                onClick={() => {
                  if (isCondensed === null && !isMobile) {
                    setIsCondensed(true);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
