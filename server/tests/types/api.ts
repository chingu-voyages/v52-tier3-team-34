/**
 * Common API response wrapper
 */
export interface ApiResponse<T> {
    status: number;
    data: {
        status: string;
        data: T;
    };
}

/**
 * Venue related types
 */
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
