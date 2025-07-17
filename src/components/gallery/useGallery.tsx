import {PhotoMetadata} from '@/lib/photos';
import {useState} from 'react';

export default function useGallery(photos: PhotoMetadata[]) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<null | number>(
    null
  );
  const selectedPhoto =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;
  const isLandscape = selectedPhoto?.width || 0 > (selectedPhoto?.height || 0);

  return {
    selectedPhoto,
    isLandscape,
    setSelectedPhotoIndex,
    selectedPhotoIndex,
  };
}
