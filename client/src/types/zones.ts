// Interface for Contact Information
export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
}

// Interface for Coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

// Interface for Venue
export interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: ContactInfo;
  images: string[];
  coordinates: Coordinates;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for Event
export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  artist: string;
  genre: string[];
  price: number;
  images: string[];
  venueId: number;
  createdAt: string;
  updatedAt: string;
  venue: Venue;
}

// Interface for Zone Data
export interface ZoneData {
  event: Event;
  distance: number;
}

// Interface for Filters
export interface Filters {
  lat: number;
  lng: number;
  radius: number;
}

// Interface for Meta
export interface Meta {
  filters: Filters;
}

// Interface for Zone Response
export interface ZoneResponse {
  status: string;
  data: ZoneData[];
  meta: Meta;
  timestamp: string;
}
