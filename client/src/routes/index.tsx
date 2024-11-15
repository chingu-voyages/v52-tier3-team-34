import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Map,
  Source,
  Layer,
  GeolocateControl,
  Marker,
  NavigationControl,
  MapRef,
  MapEvent,
  CircleLayer,
  Popup
} from '@vis.gl/react-maplibre';
import type { FeatureCollection } from 'geojson';
import * as turf from '@turf/turf';
import venues from '../../test-data/venues.json';
import events from '../../test-data/events.json';
import ButtonGroup from '../components/ButtonGroup';
import 'maplibre-gl/dist/maplibre-gl.css';

export const Route = createFileRoute('/')({
  component: HomeComponent
});

// currently using file in test-data folder
//  source
const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: venues.features as Feature<Point>[]
};

// boundary around points area
const GEOFENCE = turf.circle([0, 51.5], 10, { units: 'miles' });

//  defines viewstate types. not sure if correct
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
  const [filteredEvents, setFilteredEvents] = useState(events.events);
  // const [filteredEvents, setFilteredEvents] = useState(events.events);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const mapRef = useRef<MapRef | null>(null);

  // loads map based on geofence
  // will need to be updated so it loads at client location
  const onMapLoad = useCallback(() => {
    const bounds = turf.bbox(geojson) as [number, number, number, number];
    mapRef.current?.fitBounds(bounds, { padding: 50, maxZoom: 12 });
  }, []);

  // moving the map and zooming
  const onMove = useCallback((event: MapEvent) => {
    const { viewState } = event; // Extract viewState from MapEvent
    const newCenter = [viewState.longitude, viewState.latitude];

    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(viewState);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const filtered = events.events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === today.toDateString();
    });
    setFilteredEvents(filtered);
  }, []);

  return (
    <div className="p-0">
      <Map
        {...ViewState}
        ref={mapRef}
        onLoad={onMapLoad}
        onMove={onMove}
        style={{ width: '100svw', height: '100svh' }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        renderWorldCopies={false}
      >
        <NavigationControl />
        <GeolocateControl />
        <Source id="venues-data" type="geojson" data={geojson}></Source>
        {filteredEvents.map((event) => {
          const venue = venues.features.find((venue) => venue.properties.id === event.venue_id);
          if (venue) {
            const [longitude, latitude] = venue.geometry.coordinates as [number, number];
            return (
              <Marker longitude={longitude} latitude={latitude} anchor="bottom" onClick={() => setShowPopup(true)} />
            );
          }
          return null;
        })}
      </Map>
    </div>
  );
}
