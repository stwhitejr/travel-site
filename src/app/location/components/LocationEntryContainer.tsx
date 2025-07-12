'use client';

import LocationEntry from './LocationEntry';
import useLocationById from '../hooks/useLocationById';

export default function LocationEntityContainer({id}: {id: string}) {
  const response = useLocationById({id: parseInt(id, 10)});

  return <LocationEntry isLoading={response.isLoading} {...response?.data} />;
}
