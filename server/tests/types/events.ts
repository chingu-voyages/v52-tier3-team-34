import { ApiResponse } from './api';

export interface Event {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'draft' | 'published' | 'cancelled';
    venueId: number;
    venue?: {
        id: number;
        name: string;
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    createdAt: string;
    updatedAt: string;
}

export interface EventGeoJSON {
    type: 'Feature';
    geometry: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    properties: Event;
}

export interface EventGeoJSONCollection {
    type: 'FeatureCollection';
    features: EventGeoJSON[];
}

export interface EventZoneResponse {
    type: 'FeatureCollection';
    features: EventGeoJSON[];
    center: {
        type: 'Point';
        coordinates: [number, number];
    };
    radius: number;
}

export type EventListResponse = ApiResponse<Event[]>;
export type EventResponse = ApiResponse<Event>;
export type EventGeoJSONResponse = ApiResponse<EventGeoJSONCollection>;
