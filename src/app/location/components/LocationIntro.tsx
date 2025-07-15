'use client';

import {Location, LocationPhotoEntry} from '@/lib/location';
import LocationList from './LocationList';
import {motion} from 'framer-motion';
import {anton, lato} from '@/util/fonts';
import LocationIcons from './LocationIcons';
import {ExpandIcon, MapPinnedIcon, ShrinkIcon} from 'lucide-react';

export default function LocationIntro({
  condensed,
  location,
  photos,
  onClickResize,
}: {
  condensed: boolean;
  location: Location;
  photos: LocationPhotoEntry[];
  onClickResize?: (condensed: boolean) => void;
}) {
  const handleClickCoordinates = () => {
    if (location.coordinates) {
      window.navigator.clipboard.writeText(location.coordinates?.join(', '));
    }
  };
  const list = <LocationList id={location.id} />;

  const ResizeIcon = condensed ? ExpandIcon : ShrinkIcon;
  const resizeButton = (
    <ResizeIcon
      onClick={() => onClickResize?.(!condensed)}
      className="hidden md:block absolute top-5 right-5 opacity-80 hover:opacity-100 cursor-pointer w-5"
    />
  );

  return (
    <motion.div
      layout
      className="flex flex-col-reverse md:flex-row h-full relative"
    >
      {condensed ? (
        <>
          {list}
          {resizeButton}
        </>
      ) : (
        <>
          <div className="flex-2 md:flex-1">{list}</div>
          <div className="flex-1 h-full flex flex-row md:flex-col justify-between p-4">
            <div className="max-w-[400px]">
              <h1 className={`${anton.className} md:text-2xl`}>
                {location.title}
              </h1>
              <h2 className={`${lato.className} text-sm md:text-base`}>
                {location.address}
              </h2>
              <div className="flex items-center pt-2">
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/search/${location.coordinates?.join(
                    ','
                  )}`}
                >
                  <MapPinnedIcon className="w-5" />
                </a>
                <div
                  onClick={handleClickCoordinates}
                  className={`cursor-copy text-sm pl-2 ${lato.className}`}
                >
                  {location.coordinates?.join(', ')}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <LocationIcons photos={photos} />
            </div>
            {resizeButton}
          </div>
        </>
      )}
    </motion.div>
  );
}
