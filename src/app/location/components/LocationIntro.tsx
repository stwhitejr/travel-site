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
import {PhotoMetadataWithTags} from '@/lib/photos';
import LocationIndex from './LocationIndex';
import {useState} from 'react';
import LocationTitle from './LocationTitle';
import LocationDescription from './LocationDescription';
import {updateLocation} from '@/app/actions/updateLocation';
import AdminButton from '@/components/AdminButton';
import LocationDelete from './LocationDelete';

export default function LocationIntro({
  condensed,
  location,
  photos,
  onClickResize,
}: {
  condensed: boolean;
  location: Location;
  photos: PhotoMetadataWithTags[];
  onClickResize?: (condensed: boolean) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [draft, setDraft] = useState<null | {
    title: string;
    description: string;
    index: number | null;
  }>(null);

  const handleClickCoordinates = () => {
    if (location.coordinates) {
      window.navigator.clipboard.writeText(location.coordinates?.join(', '));
    }
  };

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
    <motion.div layout className="flex flex-col md:flex-row h-full relative">
      {condensed ? (
        <>
          {list}
          {resizeButton}
        </>
      ) : (
        <>
          <div className="flex-2 md:flex-1 min-h-20">{list}</div>
          <div className="flex-1 md:h-full flex gap-5 md:gap-2 flex-row md:flex-col justify-between p-4 md:pr-20">
            <div className="md:max-w-[400px]">
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
            {isDeleting && <LocationDelete id={location.id} photos={photos} />}
            <div className="flex gap-2">
              <LocationIcons photos={photos} />
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
