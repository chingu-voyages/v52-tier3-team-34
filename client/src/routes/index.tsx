import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useCallback } from 'react';
import { Map, Source, Layer, GeolocateControl, Marker, NavigationControl } from '@vis.gl/react-maplibre';
import type { MapRef, MapEvent, CircleLayer } from '@vis.gl/react-maplibre';
import type { FeatureCollection } from 'geojson';
import * as turf from '@turf/turf';
import 'maplibre-gl/dist/maplibre-gl.css';

export const Route = createFileRoute('/')({
  component: HomeComponent
});

type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

function HomeComponent() {
  const [ViewState, setViewState] = useState<ViewState>({
    longitude: 0,
    latitude: 51.5,
    zoom: 5
  });
  return (
    <div className="p-2">
      <Map
        {...ViewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100svw', height: '100svh' }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
      ></Map>
    </div>
  );
}
