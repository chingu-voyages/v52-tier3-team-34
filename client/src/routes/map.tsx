import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import type { ViewState } from '@vis.gl/react-maplibre';
import { useState, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { z } from 'zod';

import { useZones } from '@/hooks/useZones';
import { ZoneResponse, ZoneFeature } from '@/types/zones';

import 'maplibre-gl/dist/maplibre-gl.css';

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
  const mapRef = useRef<MapRef | null>(null);

  const { data, isLoading, error, isError } = useZones(searchParams.lat, searchParams.lng, searchParams.radius);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: searchParams.lng, //default cetre
    latitude: searchParams.lat, //default centre
    zoom: 12, // initial zoom test
    pitch: 0, //must be included
    bearing: 0, //must be included
    padding: { top: 0, right: 0, bottom: 0, left: 0 } //must be included
  });

  const [activeEvent, setActiveEvent] = useState<ZoneFeature | null>(null);

  if (isLoading) return <div>Loading map...</div>;
  if (isError) return <div>Error loading zones: {error.message}</div>;

  const zoneResponse = data as ZoneResponse;
  const features: ZoneFeature[] = zoneResponse.data.features || [];

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
        {features.map((feature) => {
          return (
            <div key={`marker-wrapper-${feature.properties.id}`}>
              <Marker
                key={feature.properties.id}
                longitude={feature.geometry.coordinates[0]}
                latitude={feature.geometry.coordinates[1]}
                onClick={() => {
                  console.log('Marker clicked:', feature); // Logs the feature data
                  setActiveEvent(feature);
                }}
                // anchor="bottom"
                style={{ cursor: 'pointer' }}
              ></Marker>
              {activeEvent ? (
                <Popup
                  key={activeEvent.properties.id}
                  longitude={activeEvent.geometry.coordinates[0]}
                  latitude={activeEvent.geometry.coordinates[1]}
                  anchor="bottom"
                  offset={[0, 1]}
                  onClose={() => {
                    console.log('Popup closed for:', activeEvent); // Logs when the popup is closed
                    setActiveEvent(null);
                  }}
                  closeOnClick={false}
                  closeButton={false}
                >
                  <ClickAwayListener
                    onClickAway={() => {
                      setActiveEvent(null);
                    }}
                  >
                    <div className="bg-white p-4 max-w-xs">
                      <h3 className="text-lg font-semibold mb-2 text-blue-600">{activeEvent.properties.title}</h3>
                      <p className="text-sm text-gray-700 mb-4">{activeEvent.properties.description}</p>
                      <div className="text-sm text-gray-500">
                        <p>Starts: {new Date(activeEvent.properties.startDate).toLocaleString()}</p>
                        <p>Ends: {new Date(activeEvent.properties.endDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </ClickAwayListener>
                </Popup>
              ) : null}
            </div>
          );
        })}
      </Map>
      <Link to="/" className="mt-4 text-blue-500 underline">
        View List
      </Link>
    </div>
  );
}

export default MapComponent;
