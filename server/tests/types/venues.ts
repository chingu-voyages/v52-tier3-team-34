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

export interface VenueListResponse {
    venues: Venue[];
}

export interface VenueSingleResponse {
    venue: Venue;
}

export type VenueApiResponse = ApiResponse<VenueSingleResponse>;
export type VenueListApiResponse = ApiResponse<VenueListResponse>;
