'use client';

import {useSearchParams} from 'next/navigation';
import LocationEntityContainer from './LocationEntryContainer';
import LocationList, {Trip} from './LocationList';
import Header from '@/components/Header';
import {ReactNode, useState} from 'react';
import {lato} from '@/util/fonts';
import {Tag} from '@/lib/tags';

const Button = (props: {
  onClick: () => void;
  children: ReactNode;
  isSelected?: boolean;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={`${
        lato.className
      } cursor-pointer text-sm tracking-wider p-1 px-4 rounded-sm  text-black ${
        props.isSelected
          ? 'bg-amber-200 opacity-100'
          : 'bg-black text-white opacity-70 hover:opacity-100'
      }`}
    >
      {props.children}
    </button>
  );
};

export default function Location({tags}: {tags: Tag[]}) {
  const [trip, setTrip] = useState<Trip>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (id) {
    return (
      <div className="flex flex-col md:h-full md:overflow-y-hidden">
        <Header />
        <div className="flex-2 md:h-full relative md:overflow-y-hidden">
          <LocationEntityContainer allTags={tags} id={id} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-2 relative">
        <LocationList trip={trip} />
        <div className="top-1 right-1 absolute p-2 gap-2 flex">
          <Button isSelected={!trip} onClick={() => setTrip(null)}>
            Show All
          </Button>
          <Button isSelected={trip === 1} onClick={() => setTrip(1)}>
            Trip 1
          </Button>
          <Button isSelected={trip === 2} onClick={() => setTrip(2)}>
            Trip 2
          </Button>
        </div>
      </div>
    </div>
  );
}
