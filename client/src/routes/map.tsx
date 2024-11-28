import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import type { ViewState } from '@vis.gl/react-maplibre';
import type maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export const Route = createFileRoute('/map')({
  component: MapComponent
});

function MapComponent() {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 0,
    latitude: 40,
    zoom: 0, // initial zoom test
    pitch: 0, //must be included
    bearing: 0, //must be included
    padding: { top: 500, right: 50, bottom: 500, left: 50 } //must be included
  });
  const geoControlRef = useRef<maplibregl.GeolocateControl>();

  useEffect(() => {
    // Activate as soon as the control is loaded
    // geoControlRef.current?.trigger();
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewState({
        ...viewState,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 15
      });
    });
  }, []);

  return (
    <div className="p-2 min-h-screen">
      <Map
        {...viewState}
        // ref={mapRef}
        style={{ width: '100%', height: '90vh' }}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        renderWorldCopies={false}
      >
        <NavigationControl />
        <GeolocateControl ref={geoControlRef} />
      </Map>
    </div>
  );
}

export default MapComponent;
