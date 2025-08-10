'use client';

import Globe, {MarkerComponentProps} from '@/app/globe/Globe';
import Marker from '@/app/globe/Marker';
import Link from 'next/link';
import {ReactNode} from 'react';
import {lato} from '@/util/fonts';
import {useLocationContext} from '../context/LocationContext';

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
          : 'bg-[#0f0e0e] text-white opacity-70 hover:opacity-100'
      }`}
    >
      {props.children}
    </button>
  );
};

const MarkerWithLink = (props: MarkerComponentProps) => {
  return (
    <Link href={`/location/?id=${props.id}`} onClick={props.onClick}>
      <Marker {...props} />
    </Link>
  );
};

export default function LocationList({id}: {id?: string | number}) {
  const {trip, setTrip, locations} = useLocationContext();

  return (
    <div className="h-full relative">
      <Globe
        markers={locations}
        selectedMarker={id}
        MarkerComponent={MarkerWithLink}
      />
      <div className="top-1 right-1 absolute p-2 gap-2 flex">
        <Button isSelected={!trip} onClick={() => setTrip?.(null)}>
          Show All
        </Button>
        <Button isSelected={trip === 1} onClick={() => setTrip?.(1)}>
          Trip 1
        </Button>
        <Button isSelected={trip === 2} onClick={() => setTrip?.(2)}>
          Trip 2
        </Button>
      </div>
    </div>
  );
}
