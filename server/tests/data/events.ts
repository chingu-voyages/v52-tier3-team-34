import { Environment } from '../utils/environment';

type EventTestData = {
    new: {
        name: string;
        description: string;
        date: string;
        time: string;
        venueId: number;
        userId: number;  // Event creator
        ticketPrice: number;
        capacity: number;
        category: string;
        status: 'draft' | 'published' | 'cancelled';
    };
    update: {
        description: string;
        ticketPrice: number;
    };
    replace: {
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
    };
};

type EnvironmentTestData = {
    [key in Environment]: EventTestData;
};

export const eventTestData: EnvironmentTestData = {
    development: {
        new: {
            name: 'Test Event (dev)',
            description: 'A test event for development',
            date: '2024-12-31',
            time: '20:00',
            venueId: 0,  // Will be set dynamically
            userId: 0,   // Will be set dynamically
            ticketPrice: 25.00,
            capacity: 100,
            category: 'concert',
            status: 'draft'
        },
        update: {
            description: 'Updated test event description',
            ticketPrice: 30.00
        },
        replace: {
            name: 'Replaced Event (dev)',
            description: 'A completely replaced event',
            date: '2024-12-31',
            time: '21:00',
            venueId: 0,  // Will be set dynamically
            userId: 0,   // Will be set dynamically
            ticketPrice: 35.00,
            capacity: 150,
            category: 'concert',
            status: 'published'
        }
    },
    staging: {
        new: {
            name: 'Test Event (staging)',
            description: 'A test event for staging',
            date: '2024-12-31',
            time: '20:00',
            venueId: 0,
            userId: 0,
            ticketPrice: 25.00,
            capacity: 100,
            category: 'concert',
            status: 'draft'
        },
        update: {
            description: 'Updated test event description',
            ticketPrice: 30.00
        },
        replace: {
            name: 'Replaced Event (staging)',
            description: 'A completely replaced event',
            date: '2024-12-31',
            time: '21:00',
            venueId: 0,
            userId: 0,
            ticketPrice: 35.00,
            capacity: 150,
            category: 'concert',
            status: 'published'
        }
    },
    production: {
        new: {
            name: 'Test Event (prod)',
            description: 'A test event for production',
            date: '2024-12-31',
            time: '20:00',
            venueId: 0,
            userId: 0,
            ticketPrice: 25.00,
            capacity: 100,
            category: 'concert',
            status: 'draft'
        },
        update: {
            description: 'Updated test event description',
            ticketPrice: 30.00
        },
        replace: {
            name: 'Replaced Event (prod)',
            description: 'A completely replaced event',
            date: '2024-12-31',
            time: '21:00',
            venueId: 0,
            userId: 0,
            ticketPrice: 35.00,
            capacity: 150,
            category: 'concert',
            status: 'published'
        }
    }
};
