import { ApiResponse } from './api';

export interface Venue {
    id: number;
    name: string;
    description?: string;
    userId: number;
    user?: {
        id: number;
        name: string;
    };
}

// Updated to use the standardized ApiResponse type
export type VenueListResponse = ApiResponse<Venue[]>;
export type VenueResponse = ApiResponse<Venue>;

// Type aliases for backward compatibility
export type VenueApiResponse = VenueResponse;
export type VenueListApiResponse = VenueListResponse;
