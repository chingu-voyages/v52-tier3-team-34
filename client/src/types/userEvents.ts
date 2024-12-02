import { Event } from './events';

export interface UserEventsResponse {
  status: string; // Response status
  data: {
    events: Event[]; // Array of events
    pagination: Pagination; // Pagination details
  };
  timestamp: string; // Response timestamp
}

export interface Contact {
  email: string; // Email address
  phone: string; // Phone number
  website: string; // Website URL
}

export interface Coordinates {
  lat: number; // Latitude
  lng: number; // Longitude
}

export interface Pagination {
  total: number; // Total number of events
  page: number; // Current page
  limit: number; // Items per page
  pages: number; // Total pages
}
