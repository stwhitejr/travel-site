'use client';

import useLocationById from '../hooks/useLocationById';
import {Tag} from '@/lib/tags';
import SubHeader from '@/components/SubHeader';
import LocationIntro from './LocationIntro';
import {useState} from 'react';
import LocationRelativeNavigation, {
  LocationRelativeNavigationProps,
} from './LocationRelativeNavigation';
import {BUILD_CATEGORY_ID} from '@/util/constants';
import Loading from '@/components/Loading';
import withLocationPhotos from './withLocationPhotos';
import Gallery from '@/components/gallery/Gallery';

const LocationGallery = withLocationPhotos(Gallery, <Loading />);

export default function LocationEntry({
  id,
  allTags,
  onChangePage,
}: {
  onChangePage: LocationRelativeNavigationProps['onChangeRelativeLocation'];
  id: number;
  allTags: Tag[];
}) {
  const [isCondensed, setIsCondensed] = useState<null | boolean>(null);
  const location = useLocationById();

  if (!location) {
    return null;
  }

  return (
    <div className="flex flex-col md:h-full md:overflow-y-hidden bg-[#0f0e0e]">
      <SubHeader>
        <LocationRelativeNavigation
          id={location.id}
          onChangeRelativeLocation={onChangePage}
        />
      </SubHeader>

      <div className="md:h-[100%] md:overflow-y-hidden flex flex-col">
        <div className={`${isCondensed ? 'h-[15%]' : 'h-[45vh] md:h-[30%]'}`}>
          <LocationIntro
            condensed={!!isCondensed}
            location={location}
            onClickResize={setIsCondensed}
          />
        </div>

        <div
          className={`p-[10px] md:overflow-y-auto ${
            isCondensed ? 'h-[85%]' : 'md:h-[70%]'
          }`}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <LocationGallery
            id={Number(id)}
            tagsDenyList={[BUILD_CATEGORY_ID]}
            ratingFilterThreshold={0}
            tags={allTags}
          />
        </div>
      </div>
    </div>
  );
}
