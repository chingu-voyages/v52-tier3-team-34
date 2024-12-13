import { createFileRoute } from '@tanstack/react-router';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import type { ViewState } from '@vis.gl/react-maplibre';
import { useState, useRef, useEffect } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import Select from 'react-select';
import { SingleValue } from 'react-select';

import { initialCity, initialViewState } from '@/config';
import { useZones } from '@/hooks/useZones';
import { City, SelectCity } from '@/types/city';
import { ZoneResponse, Venue, ZoneData } from '@/types/zones';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cities, formatCitiesForSelect } from '@/utils';

export const Route = createFileRoute('/map')({
  component: MapComponent
});

function MapComponent() {
  const mapRef = useRef<MapRef | null>(null);

  const [selectedCity, setSelectedCity] = useState<{ lat: number; lng: number }>(initialCity);
  const { data, error, isError } = useZones(selectedCity.lat, selectedCity.lng, 50);

  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [activeVenue, setActiveVenue] = useState<Venue | null>(null);

  const bigCities: City[] = cities;
  const formattedCities: SelectCity[] = formatCitiesForSelect(bigCities);

  // on page load
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const formattedPos: SelectCity = { value: { lat: latitude, lng: longitude }, label: '' };

        handleCityChange(formattedPos);
      },
      (err) => {
        console.error('Error fetching location:', err.message);
      }
    );
  }, []);

  // on select city
  function handleCityChange(newValue: SingleValue<SelectCity>) {
    if (!newValue || !mapRef.current) return;

    const { lat, lng } = newValue.value;

    const mapInstance = mapRef.current.getMap();
    mapInstance.flyTo({
      center: [lng, lat],
      zoom: 10,
      speed: 1.2,
      curve: 1.5
    });

    function handleMoveEnd() {
      setSelectedCity({ lat, lng });
      mapInstance.off('moveend', handleMoveEnd);
    }

    mapInstance.on('moveend', handleMoveEnd);

    console.log('City selected:', newValue.label);
  }

  function handleGeolocate(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;

    // Update selected city to trigger data fetching
    setSelectedCity({ lat: latitude, lng: longitude });

    // Update viewState for consistency
    setViewState((prev) => ({
      ...prev,
      latitude,
      longitude,
      zoom: 12
    }));
  }

  const zoneResponse: ZoneResponse | null = data || null;
  const zoneData: ZoneData[] = zoneResponse?.data || [];
  const venues: Venue[] = zoneData.reduce((acc: Venue[], item) => {
    const venue = item.event.venue;
    if (!acc.some((v) => v.id === venue.id)) {
      acc.push(venue);
    }
    return acc;
  }, []);

  if (isError) return <div>Error loading zones: {error.message}</div>;

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
        <GeolocateControl onGeolocate={handleGeolocate} />
        {venues.map((venue) => (
          <div key={`marker-wrapper-${venue.id}`}>
            <Marker
              longitude={venue.coordinates.lng}
              latitude={venue.coordinates.lat}
              onClick={() => setActiveVenue(venue)}
              style={{ cursor: 'pointer' }}
            />
            {activeVenue && activeVenue.id === venue.id && (
              <Popup
                longitude={venue.coordinates.lng}
                latitude={venue.coordinates.lat}
                anchor="bottom"
                offset={[0, 1]}
                onClose={() => setActiveVenue(null)}
                closeOnClick={false}
                closeButton={false}
              >
                <ClickAwayListener onClickAway={() => setActiveVenue(null)}>
                  <div className="bg-white p-4 max-w-xs">
                    <h3 className="text-lg font-semibold mb-2 text-blue-600">{venue.name}</h3>
                    <p className="text-sm text-gray-700 mb-4">{venue.description}</p>
                  </div>
                </ClickAwayListener>
              </Popup>
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}

export default MapComponent;
