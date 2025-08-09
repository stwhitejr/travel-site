'use client';

import React, {FC, useCallback, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker, ViewState, MapRef} from 'react-map-gl/mapbox';
import {LocationWithTags} from '@/lib/location';
import VisualMarker from './Marker';
import {usePageSliderContext} from '@/components/page_slider/PageSlider';
import {useLocationListContext} from '../location/context/LocationListContext';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface MarkerComponentProps {
  id: number;
  onClick?: () => void;
  selectedMarker?: string | number | null;
}

export type LocationMarker = Omit<LocationWithTags, 'coordinates'> & {
  coordinates: [number, number];
};

type GlobeProps = {
  markers: Array<LocationMarker>;
  MarkerComponent?: FC<MarkerComponentProps>;
  selectedMarker?: string | number | null;
};

const LOCAL_STORAGE_KEY = 'map-view-state';

const getGlobeCoordinatesBySelectedMarker = (
  markers: GlobeProps['markers'],
  selectedMarker: GlobeProps['selectedMarker']
) => {
  const match = markers.find((marker) => marker.id == selectedMarker);
  if (match) {
    return {
      latitude: match.coordinates[0],
      longitude: match.coordinates[1],
      zoom: 6,
      bearing: 0,
      pitch: 0,
    } as ViewState;
  }
  return null;
};

export default function Globe({
  markers,
  MarkerComponent = VisualMarker,
  selectedMarker,
}: GlobeProps) {
  const {useLocalStorage} = useLocationListContext();
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<MapRef>(null);
  const {disableSwiper, enableSwiper} = usePageSliderContext();

  const [viewState, setViewState] = useState<ViewState>(() => {
    const windowIsDefined = typeof window !== 'undefined';
    if (typeof window !== 'undefined' && useLocalStorage?.current) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (saved) {
        if (useLocalStorage && useLocalStorage.current) {
          useLocalStorage.current = false;
        }
        return JSON.parse(saved);
      }
    }

    if (windowIsDefined) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    if (selectedMarker) {
      const result = getGlobeCoordinatesBySelectedMarker(
        markers,
        selectedMarker
      );
      if (result) {
        return result;
      }
    }
    return {
      latitude: 40,
      longitude: -95,
      zoom: typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4,
      bearing: 0,
      pitch: 0,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMove = useCallback((evt: any) => {
    const newViewState = evt.viewState;
    setViewState(newViewState);

    if (useLocalStorage !== null) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);

      // Debounce localstorage update
      saveTimeout.current = setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newViewState));
      }, 500);
    }
  }, []);

  return (
    <div
      id="Globe"
      className="w-full h-full"
      onPointerEnter={disableSwiper}
      onPointerLeave={enableSwiper}
    >
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        mapboxAccessToken={MAPBOX_TOKEN}
        projection={{name: 'globe'}}
        style={{width: '100%', height: '100%'}}
      >
        {markers.map(({id, coordinates}) => (
          <Marker
            key={id}
            latitude={coordinates[0]}
            longitude={coordinates[1]}
            anchor="bottom"
            className={`${selectedMarker === id ? 'z-10' : ''}`}
            onClick={() => {
              if (
                useLocalStorage &&
                typeof useLocalStorage.current !== 'undefined'
              ) {
                useLocalStorage.current = true;
              }
            }}
          >
            <MarkerComponent selectedMarker={selectedMarker} id={id} />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
