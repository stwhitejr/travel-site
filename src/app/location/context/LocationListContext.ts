import {useContext, createContext, RefObject} from 'react';

const LocationListContext = createContext<{
  useLocalStorage: RefObject<boolean> | null;
}>({useLocalStorage: null});

export const useLocationListContext = () => useContext(LocationListContext);

export default LocationListContext;
