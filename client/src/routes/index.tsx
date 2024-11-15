import * as React from 'react';
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

//  layerStyle renders the points
const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 8,
    'circle-color': '#007cfb'
  }
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
  // const [filteredEvents, setFilteredEvents] = useState(events.events);
  const mapRef = useRef<MapRef | null>(null);

  // loads map based on geofence
  // will need to be updated so it loads at client location
  const onMapLoad = useCallback(() => {
    const bounds = turf.bbox(geojson) as [number, number, number, number];
    mapRef.current?.fitBounds(bounds, { padding: 20, maxZoom: 14 });
  }, []);

  const onMove = useCallback((event: MapEvent) => {
    const { viewState } = event; // Extract viewState from MapEvent
    const newCenter = [viewState.longitude, viewState.latitude];

    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(viewState);
    }
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
        <Source id="venues-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        {events.events.map((event) => {
          const venue = venues.features.find((v) => v.properties.id === event.venue_id);
          if (venue) {
            const [longitude, latitude] = venue.geometry.coordinates as [number, number];
            return (
              <Popup
                key={event.id}
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
                closeButton={false}
                closeOnClick={false}
              >
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p>{`Date: ${new Date(event.startDate).toLocaleString()}`}</p>
                </div>
              </Popup>
            );
          }
          return null;
        })}
      </Map>
    </div>
  );
}
