import { z } from 'zod';

export interface FetchVenuesOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface VenuesResponse {
  data: Venue[];
  total?: number;
  page?: number;
}

export interface Contact {
  email: string;
  phone: string;
  website: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: Contact;
  coordinates: Coordinates;
  images: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface VenueResponse {
  status: string;
  data: Venue[];
  pagination: Pagination;
  timestamp: string;
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
