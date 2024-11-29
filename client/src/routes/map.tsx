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
import { ZoneResponse, ZoneFeature, Event, Venue, Zone } from '../types/zones';
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
  const mapRef = useRef<MapRef | null>(null);

  const { data, isLoading, error, isError } = useZones(searchParams.lat, searchParams.lng, searchParams.radius);

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
  const [activeEvent, setActiveEvent] = useState<ZoneFeature | null>(null);

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

  // if (isLoading) return <div>Loading map...</div>;
  // if (isError) return <div>Error loading zones: {error?.message}</div>;

  // const ZoneResponse = data as ZoneResponse;
  // const features: ZoneFeature[] = ZoneResponse?.data?.features || [];

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
        {/* {features.map((feature) => {
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
        })} */}
      </Map>
    </div>
  );
}

export default MapComponent;
