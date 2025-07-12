import {PhotoMetadata} from '@/lib/photos';
import {useState} from 'react';

export default function useGallery(photos: PhotoMetadata[]) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const selectedPhoto = photos[selectedPhotoIndex];
  const isLandscape = selectedPhoto?.width || 0 > (selectedPhoto?.height || 0);

  return {selectedPhoto, isLandscape, setSelectedPhotoIndex};
}
