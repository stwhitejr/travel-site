'use client';

import {LoaderPinwheel} from 'lucide-react';
import {LocationByIdResult} from '@/lib/location';
import SubHeader from '@/components/SubHeader';
import LocationIntro from './LocationIntro';
import Gallery from '@/components/gallery/Gallery';
import {useRef, useState} from 'react';
import LocationRelativeNavigation from './LocationRelativeNavigation';
import useIsMobile from '@/util/useIsMobile';

export default function LocationEntry({
  isLoading = false,
  photos = [],
  ...props
}: LocationByIdResult & {
  isLoading?: boolean;
}) {
  const galleryParentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isCondensed, setIsCondensed] = useState<null | boolean>(null);

  return (
    <div className="md:h-full md:overflow-y-hidden flex flex-col">
      <SubHeader>
        <LocationRelativeNavigation id={props.id} />
      </SubHeader>

      <div className="md:h-full  md:overflow-y-hidden">
        <div className={`${isCondensed ? 'h-[15%]' : 'h-[40vh] md:h-[40%]'}`}>
          <LocationIntro
            condensed={!!isCondensed}
            location={props}
            photos={photos}
            onClickResize={setIsCondensed}
          />
        </div>

        <div
          className={`flex p-[10px] md:overflow-y-hidden ${
            isCondensed ? 'h-[85%]' : 'md:h-[60%]'
          }`}
        >
          <div
            ref={galleryParentRef}
            className="flex-1 md:h-full md:overflow-y-auto"
          >
            {isLoading ? (
              <LoaderPinwheel
                size={50}
                className="font-5xl animate-spin m-auto"
              />
            ) : (
              <Gallery
                // @ts-expect-error its a div
                galleryParentRef={galleryParentRef}
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
