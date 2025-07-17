'use client';

import {useSearchParams} from 'next/navigation';
import LocationEntityContainer from './LocationEntryContainer';
import LocationList from './LocationList';
import Header from '@/components/Header';

export default function Location() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (id) {
    return (
      <div className="flex flex-col md:h-full md:overflow-y-hidden">
        <Header />
        <div className="flex-2 md:h-full relative md:overflow-y-hidden">
          <LocationEntityContainer id={id} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-2">
        <LocationList />
      </div>
    </div>
  );
}
