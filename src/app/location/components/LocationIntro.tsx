'use client';

import {Location} from '@/lib/location';
import LocationList from './LocationList';
import {motion} from 'framer-motion';
import {anton, lato} from '@/util/fonts';
import LocationIcons from './LocationIcons';
import {
  ExpandIcon,
  MapPinnedIcon,
  PencilIcon,
  ShrinkIcon,
  TrashIcon,
} from 'lucide-react';
import LocationIndex from './LocationIndex';
import {useState} from 'react';
import LocationTitle from './LocationTitle';
import LocationDescription from './LocationDescription';
import {updateLocation} from '@/app/actions/updateLocation';
import AdminButton from '@/components/AdminButton';
import LocationDelete from './LocationDelete';
import LocationDates from './LocationDates';
import withLocationPhotos from './withLocationPhotos';

const LocationDatesWithPhotos = withLocationPhotos(LocationDates);
const LocationDeleteWithPhotos = withLocationPhotos(LocationDelete);
const LocationIconsWithPhotos = withLocationPhotos(LocationIcons);

export default function LocationIntro({
  condensed,
  location,
  onClickResize,
  slideDirection,
}: {
  condensed: boolean;
  location: Location;
  onClickResize?: (condensed: boolean) => void;
  slideDirection?: 'previous' | 'next';
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [draft, setDraft] = useState<null | {
    title: string;
    description: string;
    index: number | null;
  }>(null);

  console.log('draft', draft);

  const handleClickSubmit = async () => {
    if (draft) {
      try {
        await updateLocation(location.id, draft);
        alert('updated');
      } catch (error) {
        console.error(error);
      }
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

  const isEditing = process.env.NODE_ENV === 'development' && !!draft;

  return (
    <motion.div
      initial={{
        x: slideDirection === 'previous' ? '-10%' : '10%',
        opacity: 0,
      }}
      transition={{
        type: 'spring',
        duration: 1,
      }}
      animate={{x: 0, opacity: 1}}
      layout
      className="flex flex-col md:flex-row h-full relative"
    >
      {condensed ? (
        <>
          {list}
          {resizeButton}
        </>
      ) : (
        <>
          <div className="flex-2 md:flex-1 h-full">{list}</div>
          <div className="flex-1 md:h-full flex gap-5 md:gap-2 flex-row md:flex-col justify-between p-4 md:pr-20">
            <div className="flex-2 md:flex-none md:max-w-[400px]">
              <h1 className={`${anton.className} md:text-2xl`}>
                <LocationTitle
                  title={draft?.title || location.title}
                  isEditing={isEditing}
                  onChange={(value) => setDraft({...draft!, title: value})}
                />
              </h1>
              <h2 className={`${lato.className} text-sm md:text-base`}>
                <LocationDescription
                  address={location.address!}
                  description={draft ? draft.description : location.description}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setDraft({...draft!, description: value})
                  }
                />
              </h2>
              {!isEditing && (
                <div className="flex items-center gap-2 pt-4 flex-wrap">
                  <a
                    data-testid="GoogleMapLink"
                    target="_blank"
                    href={`https://www.google.com/maps/search/${location.coordinates?.join(
                      ','
                    )}`}
                  >
                    <MapPinnedIcon className="w-5" />
                  </a>
                  {/* <div
                    onClick={() => {
                      if (location.coordinates) {
                        window.navigator.clipboard.writeText(location.coordinates?.join(', '));
                      }
                    }}
                    className={`cursor-copy text-sm pl-2 ${lato.className}`}
                  >
                    {location.coordinates?.join(', ')}
                  </div> */}
                  <LocationDatesWithPhotos id={location.id} />
                </div>
              )}
            </div>
            {isEditing && (
              <div className="flex justify-between">
                <LocationIndex
                  key={location.id}
                  sort_index={draft?.index || location.sort_index}
                  onChange={(value) => setDraft({...draft, index: value})}
                />

                <AdminButton onClick={handleClickSubmit}>Update</AdminButton>
              </div>
            )}
            {isDeleting && <LocationDeleteWithPhotos id={location.id} />}
            <div className="flex-1 md:flex-none text-right md:text-left m-[-4px]">
              <LocationIconsWithPhotos id={location.id} />
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute top-5 right-12 flex gap-2">
                <TrashIcon
                  onClick={() => {
                    setIsDeleting(!isDeleting);
                  }}
                  className="opacity-80 hover:opacity-100 cursor-pointer w-5"
                />
                <PencilIcon
                  onClick={() => {
                    setDraft(
                      isEditing
                        ? null
                        : {
                            title: location.title,
                            index: null,
                            description: location.description || '',
                          }
                    );
                  }}
                  className="opacity-80 hover:opacity-100 cursor-pointer w-5"
                />
              </div>
            )}
            {resizeButton}
          </div>
        </>
      )}
    </motion.div>
  );
}
