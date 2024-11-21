import { ApiResponse } from './api';

export interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    venueId: number;
    userId: number;
    ticketPrice: number;
    capacity: number;
    category: string;
    status: 'draft' | 'published' | 'cancelled';
    venue?: {
        id: number;
        name: string;
    };
    user?: {
        id: number;
        name: string;
    };
}

export interface EventListResponse {
    events: Event[];
}

export interface EventSingleResponse {
    event: Event;
}

export type EventApiResponse = ApiResponse<EventSingleResponse>;
export type EventListApiResponse = ApiResponse<EventListResponse>;
