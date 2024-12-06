// API options for fetching venues with pagination
export interface FetchVenuesOptions {
  page?: number; // Page number for pagination
  limit?: number; // Number of items per page
  sort?: string; // Sorting options in the format "field:direction" (e.g., "createdAt:desc")
  include?: string; // Related data to include (e.g., "events")
  filter?: Record<string, string | number>; // Filters in the format { field: value } (e.g., { userId: 1 })
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// The response from fetching venues
export interface VenuesResponse {
  status: string;
  data: Venue[];
  meta: {
    pagination: PaginationMeta;
    filters: Record<string, unknown>;
    includes: unknown[];
  };
  timestamp: string;
}

// Complete response structure for venue data
export interface VenueResponse {
  status: 'success';
  data: Venue;
  timestamp: string; // ISO 8601 string
}

// Contact information for the venue
export interface Contact {
  email: string;
  phone: string;
  website: string;
}

// Coordinates (latitude, longitude) for the venue
export interface Coordinates {
  lat: number;
  lng: number;
}

interface VenueContact {
  email: string;
  phone: string;
  website: string;
}

interface VenueCoordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: VenueContact;
  coordinates: VenueCoordinates;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Pagination details
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Metadata for the response, including pagination and filters
export interface Meta {
  pagination: Pagination;
  filters: Record<string, unknown>; // Representing an object where keys are strings and values can be of any type
  includes: unknown[]; // Representing an array of any type, can be made specific if structure is known
}
