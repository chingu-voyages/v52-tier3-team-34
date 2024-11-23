import { Environment } from '../utils/environment';

type EventTestData = {
    new: {
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        status: 'draft' | 'published' | 'cancelled';
        venueId: number;
        userId?: number;
    };
    update: {
        description: string;
        status?: 'draft' | 'published' | 'cancelled';
    };
};

type EnvironmentTestData = {
    [key in Environment]: EventTestData;
};

export const eventTestData: EnvironmentTestData = {
    development: {
        new: {
            title: 'Test Event (dev)',
            description: 'A test event in development environment',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
            endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),  // 1 week + 1 day from now
            status: 'draft',
            venueId: 1
        },
        update: {
            description: 'Updated test event description (dev)',
            status: 'published'
        }
    },
    staging: {
        new: {
            title: 'Test Event (staging)',
            description: 'A test event in staging environment',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'draft',
            venueId: 1
        },
        update: {
            description: 'Updated test event description (staging)',
            status: 'published'
        }
    },
    production: {
        new: {
            title: 'Test Event (prod)',
            description: 'A test event in production environment',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'draft',
            venueId: 1
        },
        update: {
            description: 'Updated test event description (prod)',
            status: 'published'
        }
    }
};
