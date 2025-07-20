import {PhotoMetadataWithTags} from '@/lib/photos';
import {useState} from 'react';
import useLocations from '../hooks/useLocations';
import AdminButton from '@/components/AdminButton';
import {deleteLocation} from '@/app/actions/deleteLocation';
import Dropdown from '@/components/Dropdown';

export default function LocationDelete(props: {
  id: number;
  photos: PhotoMetadataWithTags[];
}) {
  const {data: locations = []} = useLocations();
  const [newLocationIdForPhotos, setNewLocationIdForPhotos] = useState<
    null | number
  >(null);

  const handleClick = async () => {
    try {
      await deleteLocation({
        id: props.id,
        photoIds: props.photos.map((photo) => photo.id),
        newLocationId: newLocationIdForPhotos!,
      });
      alert('deleted');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Dropdown<number>
          label="Move Photos to New Location"
          options={locations.map((location) => ({
            value: location.id,
            label: `${location.title} - ${location.id}`,
          }))}
          value={newLocationIdForPhotos}
          onValueChange={(option) => setNewLocationIdForPhotos(option.value)}
        />
      </div>
      <AdminButton onClick={handleClick}>Confirm</AdminButton>
    </div>
  );
}
