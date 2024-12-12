import { createFileRoute } from '@tanstack/react-router';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import type { ViewState } from '@vis.gl/react-maplibre';
import { useState, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import Select from 'react-select';
import { SingleValue, ActionMeta } from 'react-select';
import { z } from 'zod';

import { useZones } from '@/hooks/useZones';
import { City, SelectCity } from '@/types/city';
import { ZoneResponse, Venue, ZoneData } from '@/types/zones';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cities, formatCitiesForSelect } from '@/utils';

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

  const [viewState, setViewState] = useState<ViewState>({
    longitude: searchParams.lng, //default cetre
    latitude: searchParams.lat, //default centre
    zoom: 12, // initial zoom test
    pitch: 0, //must be included
    bearing: 0, //must be included
    padding: { top: 0, right: 0, bottom: 0, left: 0 } //must be included
  });

  const { data, isLoading, error, isError } = useZones(viewState.latitude, viewState.longitude, searchParams.radius);

  const [activeVenue, setActiveVenue] = useState<Venue | null>(null);

  const bigCities: City[] = cities;
  const formattedCities: SelectCity[] = formatCitiesForSelect(bigCities);

  if (isLoading) return <div>Loading map...</div>;
  if (isError) return <div>Error loading zones: {error.message}</div>;

  if (!data) {
    return null;
  }

  function handleCityChange(newValue: SingleValue<SelectCity>, actionMeta: ActionMeta<SelectCity>) {
    if (!newValue) return; // Handle null case (e.g., when cleared)

    const { lat, lng } = newValue.value;

    // Update viewState to focus the map on the new city
    setViewState((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));

    console.log('City selected:', newValue.label, 'Action:', actionMeta.action);
  }

  const zoneResponse: ZoneResponse = data;
  const zoneData: ZoneData[] = zoneResponse.data;
  // Map to extract venues and filter out duplicates based on venue.id
  const venues: Venue[] = zoneData.reduce((acc: Venue[], item) => {
    const venue = item.event.venue;
    if (!acc.some((v) => v.id === venue.id)) {
      acc.push(venue);
    }
    return acc;
  }, []);

  console.log('Venues: ', venues);
  console.log('zone response: ', zoneResponse);

  return (
    <div className="p-2 min-h-screen">
      <div>
        {/* City Selector */}
        <Select
          className="text-black mb-6"
          options={formattedCities}
          onChange={handleCityChange}
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => `${e.value.lat}-${e.value.lng}`}
          placeholder="Search and select a city..."
          isClearable
        />
      </div>
      <Map
        {...viewState}
        ref={mapRef}
        style={{ width: '100%', height: '80vh' }}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <NavigationControl />
        <GeolocateControl />
        {venues.map((venue) => {
          return (
            <div key={`marker-wrapper-${venue.id}`}>
              <Marker
                longitude={venue.coordinates.lng}
                latitude={venue.coordinates.lat}
                onClick={() => {
                  console.log('Marker clicked:', venue); // Logs the feature data
                  setActiveVenue(venue);
                }}
                style={{ cursor: 'pointer' }}
              ></Marker>
              {activeVenue && activeVenue.id === venue.id && (
                <Popup
                  longitude={venue.coordinates.lng}
                  latitude={venue.coordinates.lat}
                  anchor="bottom"
                  offset={[0, 1]}
                  onClose={() => {
                    console.log('Popup closed for:', activeVenue); // Logs when the popup is closed
                    setActiveVenue(null);
                  }}
                  closeOnClick={false}
                  closeButton={false}
                >
                  <ClickAwayListener
                    onClickAway={() => {
                      setActiveVenue(null);
                    }}
                  >
                    <div className="bg-white p-4 max-w-xs">
                      <h3 className="text-lg font-semibold mb-2 text-blue-600">{venue.name}</h3>
                      <p className="text-sm text-gray-700 mb-4">{venue.description}</p>
                    </div>
                  </ClickAwayListener>
                </Popup>
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
}

export default MapComponent;
