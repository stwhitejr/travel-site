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
      className="absolute top-5 right-5 opacity-80 hover:opacity-100 cursor-pointer w-5"
    />
  );

  return (
    <motion.div layout className="flex h-full relative">
      {condensed ? (
        <>
          {list}
          {resizeButton}
        </>
      ) : (
        <>
          <div className="flex-1">{list}</div>
          <div className="flex-1 h-full flex flex-col justify-between px-4 py-1">
            <div className="max-w-[400px]">
              <h1 className={`${anton.className} pb-1 text-3xl`}>
                {location.title}
              </h1>
              <h2 className={`${lato.className}`}>{location.address}</h2>
              <div className="flex items-center pt-1">
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/search/${location.coordinates?.join(
                    ','
                  )}`}
                  className="text-yellow-100"
                >
                  <MapPinnedIcon />
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
