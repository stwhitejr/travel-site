import {useMemo} from 'react';
import {useLocationContext} from '../context/LocationContext';

const useLocationById = () => {
  const {id, locations} = useLocationContext();
  const location = useMemo(
    () => locations.find((location) => location.id === id),
    [locations, id]
  );
  return location;
};

export default useLocationById;
