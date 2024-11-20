import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useZones } from '../../hooks/useZones';
import { ZoneResponse, ZoneFeature } from '../../types/zones';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import { useState, useRef, useEffect } from 'react';
import type { ViewState } from '@vis.gl/react-maplibre';
import { Link } from '@tanstack/react-router';
import 'maplibre-gl/dist/maplibre-gl.css';
import { z } from 'zod';

export const Route = createFileRoute('/map')({
  validateSearch: z.object({
    lat: z.coerce.number().min(-90).max(90).optional().default(40.758),
    lng: z.coerce.number().min(-180).max(180).optional().default(-73.9855),
    radius: z.coerce.number().positive().max(50).optional().default(20)
  }),
  component: MapComponent
});

function MapComponent() {
  const searchParams = Route.useSearch();

  const { data, isLoading, error, isError } = useZones(searchParams.lat, searchParams.lng, searchParams.radius);
  const mapRef = useRef<MapRef | null>(null);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: searchParams.lng, //default cetre
    latitude: searchParams.lat, //default centre
    zoom: 12, // initial zoom test
    pitch: 0, //must be included
    bearing: 0, //must be included
    padding: { top: 0, right: 0, bottom: 0, left: 0 } //must be included
  });

  if (isLoading) return <div>Loading map...</div>;
  if (isError) return <div>Error loading zones: {error.message}</div>;

  const zoneResponse = data as ZoneResponse;
  const features: ZoneFeature[] = zoneResponse.data.features || [];
  const center = zoneResponse.data.center.coordinates;

  return (
    <div className="p-2 min-h-screen">
      <Map
        {...viewState}
        ref={mapRef}
        style={{ width: '100%', height: '80vh' }}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
      >
        <NavigationControl />
        <GeolocateControl />
        {features.map((feature) => (
          <Marker
            key={feature.properties.id}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
          />
        ))
      </Map>
      <Link to="/" className="mt-4 text-blue-500 underline">
        View List
      </Link>
    </div>
  );
}

export default MapComponent;
