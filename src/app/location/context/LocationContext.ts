import {useContext, createContext} from 'react';
import {LocationWithCoordinates} from '../hooks/useLocations';

export type Trip = 1 | 2 | null;

const LocationContext = createContext<{
  id: number | null;
  trip: Trip;
  setTrip?: (trip: Trip) => void;
  locations: LocationWithCoordinates[];
}>({id: null, trip: null, locations: []});

export const useLocationContext = () => useContext(LocationContext);

export default LocationContext;
