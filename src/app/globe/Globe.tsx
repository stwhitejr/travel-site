'use client';

import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker, ViewState, MapRef} from 'react-map-gl/mapbox';
import VisualMarker from './Marker';
import {usePageSliderContext} from '@/components/page_slider/PageSlider';
import {LocationWithCoordinates} from '../location/hooks/useLocations';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface MarkerComponentProps {
  id: number;
  onClick?: () => void;
  selectedMarker?: string | number | null;
}

type GlobeProps = {
  markers: Array<LocationWithCoordinates>;
  MarkerComponent?: FC<MarkerComponentProps>;
  selectedMarker?: string | number | null;
  useLocalStorage?: boolean;
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
  useLocalStorage,
}: GlobeProps) {
  const clickedFromMap = useRef(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<MapRef>(null);
  const {disableSwiper, enableSwiper} = usePageSliderContext();

  const [viewState, setViewState] = useState<ViewState>(() => {
    if (typeof window !== 'undefined' && useLocalStorage) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }
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

  useEffect(() => {
    // If we changed the selected location from outside the map then we want to recenter on the selected marker
    if (selectedMarker && !clickedFromMap.current) {
      const result = getGlobeCoordinatesBySelectedMarker(
        markers,
        selectedMarker
      );
      if (result) {
        setViewState({
          ...viewState,
          latitude: result.latitude,
          longitude: result.longitude,
        });
      }
      // Reset back to false
    } else if (selectedMarker) {
      clickedFromMap.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarker]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMove = useCallback((evt: any) => {
    const newViewState = evt.viewState;
    setViewState(newViewState);

    if (useLocalStorage) {
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
              clickedFromMap.current = true;
            }}
          >
            <MarkerComponent selectedMarker={selectedMarker} id={id} />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
