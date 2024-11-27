import { z } from 'zod';

// API options for fetching venues with pagination
export interface FetchVenuesOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
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

// Venue object structure
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
  filters: Record<string, any>; // Filters can be more specific if the structure is known
  includes: any[]; // Include can be more specific if needed
}

// Complete response structure for venue data
export interface VenueResponse {
  status: 'success';
  data: Venue[];
  meta: Meta;
  timestamp: string; // ISO 8601 string
}

// Zod schema for form validation
export const venueSchema = z.object({
  name: z.string().min(3, 'Venue name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Please enter a valid address'),
  contact: z.object({
    email: z.string().email('Please enter a valid email'),
    phone: z.string().regex(/^\+?[\d\s-]+$/, 'Please enter a valid phone number'),
    website: z.string().url('Please enter a valid URL')
  }),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }),
  images: z.array(z.string().url('Please enter valid image URLs')).min(1, 'At least one image is required')
});

// Export the VenueFormData type
export type VenueFormData = z.infer<typeof venueSchema>;
