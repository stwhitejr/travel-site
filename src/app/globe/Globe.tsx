import React, {FC, useCallback, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker, ViewState, MapRef} from 'react-map-gl/mapbox';
import {Location} from '@/lib/location';
import VisualMarker from './Marker';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface MarkerComponentProps {
  id: number;
  selectedMarker?: string | number | null;
}

export type LocationMarker = Omit<Location, 'coordinates'> & {
  coordinates: [number, number];
};

type GlobeProps = {
  markers: Array<LocationMarker>;
  MarkerComponent?: FC<MarkerComponentProps>;
  selectedMarker?: string | number | null;
};

const LOCAL_STORAGE_KEY = 'map-view-state';

export default function Globe({
  markers,
  MarkerComponent = VisualMarker,
  selectedMarker,
}: GlobeProps) {
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState<ViewState>(() => {
    if (selectedMarker) {
      const match = markers.find((marker) => marker.id == selectedMarker);
      if (match) {
        return {
          latitude: match.coordinates[0],
          longitude: match.coordinates[1],
          zoom: 10,
          bearing: 0,
          pitch: 0,
        };
      }
    }
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return {
      latitude: 38.7946,
      longitude: -106.5348,
      zoom: 2,
      bearing: 0,
      pitch: 0,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMove = useCallback((evt: any) => {
    const newViewState = evt.viewState;
    setViewState(newViewState);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    // Debounce localstorage update
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newViewState));
    }, 500);
  }, []);

  return (
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
        >
          <MarkerComponent selectedMarker={selectedMarker} id={id} />
        </Marker>
      ))}
    </Map>
  );
}
