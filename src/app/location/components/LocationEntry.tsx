'use client';

import {LoaderPinwheel} from 'lucide-react';
import {LocationByIdResult} from '@/lib/location';
import SubHeader from '@/components/SubHeader';
import LocationIntro from './LocationIntro';
import Gallery from '@/components/gallery/Gallery';
import {useState} from 'react';
import LocationRelativeNavigation from './LocationRelativeNavigation';

export default function LocationEntry({
  isLoading = false,
  photos = [],
  ...props
}: LocationByIdResult & {
  isLoading?: boolean;
}) {
  const [isCondensed, setIsCondensed] = useState<null | boolean>(null);

  return (
    <div className="h-full overflow-y-hidden flex flex-col">
      <SubHeader
        backHref="/location"
        currentTitle={props.title}
        relativeNavigation={<LocationRelativeNavigation id={props.id} />}
      />

      <div className="h-full overflow-y-hidden">
        <div className={`${isCondensed ? 'h-[15%]' : 'h-[30%]'}`}>
          <LocationIntro
            condensed={!!isCondensed}
            location={props}
            photos={photos}
            onClickResize={setIsCondensed}
          />
        </div>

        <div
          className={`flex p-[10px] overflow-y-hidden ${
            isCondensed ? 'h-[85%]' : 'h-[70%]'
          }`}
        >
          <div className="flex-1 h-full overflow-y-auto">
            {isLoading ? (
              <LoaderPinwheel
                size={50}
                className="font-5xl animate-spin m-auto"
              />
            ) : (
              <Gallery
                photos={photos}
                onClick={() => {
                  if (isCondensed === null) {
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
