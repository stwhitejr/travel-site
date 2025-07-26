import {PhotoMetadataWithTags} from '@/lib/photos';
import {ReactNode, Suspense, useState} from 'react';
import {InfoIcon} from 'lucide-react';
import GalleryItemDetails from './GalleryItemDetails';
import useIsMobile from '@/util/useIsMobile';

export default function GalleryItemDetailsButton({
  children,
  ...props
}: PhotoMetadataWithTags & {children?: ReactNode}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Suspense>
      <div
        onMouseOver={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        onMouseOut={() => setIsOpen(false)}
        className={`absolute p-4 z-10 rounded-lg top-2 left-2 drop-shadow-md bg-slate-800 ${
          isOpen ? 'w-[200px] bg-red-50' : ''
        }`}
      >
        {!isOpen && <InfoIcon />}
        {isOpen && (
          <GalleryItemDetails
            onClose={
              isMobile
                ? (e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }
                : null
            }
            {...props}
          >
            {children}
          </GalleryItemDetails>
        )}
      </div>
    </Suspense>
  );
}
