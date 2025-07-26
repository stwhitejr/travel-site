'use client';

import LocationEntry from './LocationEntry';
import useLocationById from '../hooks/useLocationById';
import {Tag} from '@/lib/tags';

export default function LocationEntityContainer({
  id,
  allTags,
}: {
  id: string;
  allTags: Tag[];
}) {
  const response = useLocationById({id: parseInt(id, 10)});

  return (
    <LocationEntry
      isLoading={response.isLoading}
      {...response?.data}
      allTags={allTags}
    />
  );
}
