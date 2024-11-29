import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import type { ViewState } from '@vis.gl/react-maplibre';
import type maplibregl from 'maplibre-gl';
import * as turf from '@turf/turf';
import 'maplibre-gl/dist/maplibre-gl.css';
import ClickAwayListener from 'react-click-away-listener';
import citiesData from '../../test-data/cities.json';
import { useZones } from '../../hooks/useZones';
import { ZoneResponse, ZoneFeature } from '../types/zones';
import Dropdown from '../components/Dropdown';

export const Route = createFileRoute('/map')({
  validateSearch: z.object({
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    radius: z.coerce.number().positive().max(50).optional()
  }),
  component: MapComponent
});

const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, { units: 'miles' });

function MapComponent() {
  const searchParams = Route.useSearch();
  const shouldFetchZones =
    searchParams.lat !== undefined && searchParams.lng !== undefined && searchParams.radius !== undefined;
  const mapRef = useRef<MapRef | null>(null);

  const { data, isLoading, error, isError } = shouldFetchZones
    ? useZones(searchParams.lat, searchParams.lng, searchParams.radius)
    : { data: null, isLoading: false, error: null, isError: false };

  const [viewState, setViewState] = useState<ViewState>({
    longitude: 0,
    latitude: 40,
    zoom: 0, // initial zoom test
    pitch: 0, //must be included
    bearing: 0, //must be included
    padding: { top: 0, right: 0, bottom: 0, left: 0 } //must be included
  });

  const [hasLocation, setHasLocation] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<ZoneFeature | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const geolocationAllowed = localStorage.getItem('geolocationAllowed');

    const handleGeolocationSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      setViewState({
        ...viewState,
        latitude,
        longitude,
        zoom: 12
      });
      navigate({
        to: `/map`,
        search: {
          lat: latitude,
          lng: longitude,
          radius: 20
        }
      });
      setHasLocation(true);
    };
    const handleGeolocationError = (error: GeolocationPositionError) => {
      console.error('error: ', error);
      sessionStorage.setItem('geolocationDeclined', 'true');
      window.alert('Please select a city from the dropdown.');
    };

    if (geolocationAllowed === 'true') {
      navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError);
    } else {
      sessionStorage.setItem('geolocationDeclined', 'true');
    }
  }, [hasLocation, navigate]);

  const handleCitySelection = (cityName: string) => {
    const city = citiesData.cities.find((c) => c.name === cityName);
    if (city) {
      setSelectedCity(cityName);
      setViewState({
        ...viewState,
        longitude: parseFloat(city.longitude),
        latitude: parseFloat(city.latitude),
        zoom: 12
      });
      navigate({
        to: `/map`,
        search: {
          lat: parseFloat(city.latitude),
          lng: parseFloat(city.longitude),
          radius: 20
        }
      });
      setHasLocation(true);
    }
  };

  if (isLoading) return <div>Loading map...</div>;
  if (isError) return <div>Error loading zones: {error?.message}</div>;

  const ZoneResponse = data as ZoneResponse;
  const features: ZoneFeature[] = data?.data || [];

  return (
    <div className="p-2 min-h-screen">
      <Map
        {...viewState}
        ref={mapRef}
        style={{ width: '100%', height: '90vh' }}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        renderWorldCopies={false}
      >
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg z-10">
          <Dropdown cities={citiesData.cities} onSelect={handleCitySelection} selectedCity={selectedCity} />
        </div>
        {/* <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg z-10">
          <ButtonGroup/>
        </div> */}
        <NavigationControl />
        <GeolocateControl />
        {features.length === 0 && shouldFetchZones && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg">
            <p className="text-gray-700">No events found nearby. Please select a city from the dropdown.</p>
          </div>
        )}
        {features.map((feature) => {
          const { event, distance } = feature;
          const { venue } = event;

          if (!venue || !venue.coordinates) {
            console.warn('feature skipped', feature);
          }

          if (activeFeature && activeFeature.event.id === event.id) {
            console.log('Rendering Popup:', {
              eventId: event.id,
              venueId: venue.id,
              eventTitle: event.title,
              coordinates: venue.coordinates
            });
          }

          return (
            <div key={`marker-${event.id}-${venue.id}`}>
              <Marker
                key={event.id}
                longitude={venue.coordinates.lng}
                latitude={venue.coordinates.lat}
                onClick={() => {
                  setActiveFeature(feature);
                  console.log('Clicked Marker:', {
                    eventId: event.id,
                    venueId: venue.id,
                    eventTitle: event.title,
                    coordinates: venue.coordinates
                  });
                }}
                style={{ cursor: 'pointer' }}
              ></Marker>
              {activeFeature && activeFeature.event.id === event.id ? (
                <Popup
                  key={`popup-${event.id}-${venue.id}`}
                  longitude={venue.coordinates.lng}
                  latitude={venue.coordinates.lat}
                  anchor="bottom"
                  offset={[0, 5]}
                  onClose={() => {
                    setActiveFeature(null);
                  }}
                  closeOnClick={false}
                  closeButton={false}
                >
                  <ClickAwayListener
                    onClickAway={() => {
                      setActiveFeature(null);
                    }}
                  >
                    <div className="bg-white p-4 max-w-xs">
                      <h3 className="text-lg font-semibold mb-2 text-blue-600">{event.title}</h3>
                      <p className="text-sm text-gray-700 mb-4">{event.description}</p>
                      <div className="text-sm text-gray-500">
                        <p>Starts: {new Date(event.startDate).toLocaleString()}</p>
                        <p>Ends: {new Date(event.endDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </ClickAwayListener>
                </Popup>
              ) : null}
            </div>
          );
        })}
      </Map>
    </div>
  );
}

export default MapComponent;
