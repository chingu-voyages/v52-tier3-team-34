import { Venue } from './venues';

// Genre array type (could be any number of genres, assuming they're all strings)
type Genre = string[];

// Options for fetching events with various query parameters
export interface FetchEventsOptions {
  status?: string; // Event status (e.g., 'published', 'draft', etc.)
  sort?: string; // Sorting options in the format "field:direction" (e.g., "startDate:asc")
  fields?: string; // Fields to retrieve (e.g., "id,title,startDate,endDate,artist")
  include?: string; // Related data to include (e.g., "venue")
  page?: number; // Page number for pagination
  limit?: number; // Number of items per page
  filter?: Record<string, string | number>; // Filters for querying events (e.g., { artist: 'DJ BerlinBeat' })
}

// The structure of a single Event
export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string; // ISO 8601 string (e.g., '2024-11-30T19:00:00.000Z')
  endDate: string; // ISO 8601 string (e.g., '2024-11-30T22:00:00.000Z')
  status: 'published' | 'draft' | 'archived'; // Example statuses
  artist: string;
  genre: Genre;
  price: number;
  venueId: number;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}

// Pagination metadata structure
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Metadata structure that includes pagination and any filters or includes
export interface Meta {
  pagination: PaginationMeta;
  filters: Record<string, unknown>; // Assuming filters can be dynamic
  includes: unknown[]; // Assuming includes can be dynamic (e.g., related entities)
}

// Response object for a list of events
export interface EventsResponse {
  status: string;
  data: Event[]; // Array of events
  meta: Meta; // Pagination and metadata
  timestamp: string; // Timestamp of the response (ISO 8601 string)
}

// Response object for a single event
export interface EventResponse {
  status: string; // Response status (e.g., "success")
  data: {
    id: number;
    title: string;
    description: string;
    startDate: string; // ISO 8601 string (e.g., '2024-11-30T19:00:00.000Z')
    endDate: string; // ISO 8601 string (e.g., '2024-11-30T22:00:00.000Z')
    status: 'published' | 'draft' | 'archived'; // Example statuses
    artist: string;
    genre: Genre;
    price: number;
    venueId: number;
    createdAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
    venue: Venue; // Detailed venue information
  };
  timestamp: string; // Timestamp of the response (ISO 8601 string)
}
