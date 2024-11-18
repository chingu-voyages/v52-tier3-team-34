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
