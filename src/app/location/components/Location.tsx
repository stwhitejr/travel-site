'use client';

import {useSearchParams} from 'next/navigation';
import LocationEntityContainer from './LocationEntryContainer';
import LocationList from './LocationList';

export default function Location() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return id ? <LocationEntityContainer id={id} /> : <LocationList />;
}
