'use client';

import useLocationById from '../hooks/useLocationById';
import {Tag} from '@/lib/tags';

import {LoaderPinwheel} from 'lucide-react';
import SubHeader from '@/components/SubHeader';
import LocationIntro from './LocationIntro';
import Gallery from '@/components/gallery/Gallery';
import {useState} from 'react';
import LocationRelativeNavigation from './LocationRelativeNavigation';
import {CurrentPageComponentProps} from '@/components/page_slider/PageSlider';
import {BUILD_CATEGORY_ID} from '@/util/constants';

export default function LocationEntry({
  id,
  allTags,
  onChangePage,
  withinView = true,
  slideDirection,
}: CurrentPageComponentProps & {
  allTags: Tag[];
}) {
  const [isCondensed, setIsCondensed] = useState<null | boolean>(null);
  const response = useLocationById({
    id: typeof id === 'string' ? parseInt(id, 10) : id,
  });

  const location = response.data;
  return (
    <div className="flex flex-col md:h-full md:overflow-y-hidden bg-[#0f0e0e]">
      <SubHeader>
        <LocationRelativeNavigation
          id={location.id}
          onChangeRelativeLocation={onChangePage}
        />
      </SubHeader>

      <div className="md:h-[100%] md:overflow-y-hidden flex flex-col">
        <div className={`${isCondensed ? 'h-[15%]' : 'h-[40vh] md:h-[30%]'}`}>
          <LocationIntro
            condensed={!!isCondensed}
            location={location}
            photos={location.photos}
            onClickResize={setIsCondensed}
            slideDirection={slideDirection}
          />
        </div>

        <div
          className={`p-[10px] md:overflow-y-auto ${
            isCondensed ? 'h-[85%]' : 'md:h-[70%]'
          }`}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {response.isLoading ? (
            <LoaderPinwheel
              size={50}
              className="font-5xl animate-spin m-auto"
            />
          ) : withinView ? (
            <Gallery
              tagsDenyList={[BUILD_CATEGORY_ID]}
              ratingFilterThreshold={0}
              tags={allTags}
              photos={location.photos}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
