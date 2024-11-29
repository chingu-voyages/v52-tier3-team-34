import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { Map, Marker, GeolocateControl, NavigationControl, MapRef, Popup } from '@vis.gl/react-maplibre';
import type { ViewState } from '@vis.gl/react-maplibre';
import type maplibregl from 'maplibre-gl';
import * as turf from '@turf/turf';
import 'maplibre-gl/dist/maplibre-gl.css';
import citiesData from '../../test-data/cities.json';
import Dropdown from '../components/Dropdown';

export const Route = createFileRoute('/map')({
  component: MapComponent
});

const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, { units: 'miles' });

function MapComponent() {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 0,
    latitude: 40,
    zoom: 0, // initial zoom test
    pitch: 0, //must be included
    bearing: 0, //must be included
    padding: { top: 0, right: 0, bottom: 0, left: 0 } //must be included
  });
  const [geolocationDenied, setGeolocationDenied] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewState({
          ...viewState,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 13
        });
      },
      () => {
        console.log('User denied geolocation.');
      }
    );
  }, []);

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
    }
  };

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
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg z-10">
          <Dropdown cities={citiesData.cities} onSelect={handleCitySelection} selectedCity={selectedCity} />
        </div>
        {/* <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg z-10">
          <ButtonGroup/>
        </div> */}
        <NavigationControl />
        <GeolocateControl />
      </Map>
    </div>
  );
}

export default MapComponent;
