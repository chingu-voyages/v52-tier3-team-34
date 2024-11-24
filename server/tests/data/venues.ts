import { Environment } from '../utils/environment';

type VenueTestData = {
    new: {
        name: string;
        description: string;
        address: string;
        contact: {
            email: string;
            phone: string;
            website: string;
        };
        coordinates: {
            lat: number;
            lng: number;
        };
        images: string[];
        userId: number;
    };
    update: {
        description: string;
    };
    replace: {
        name: string;
        description: string;
        address: string;
        contact: {
            email: string;
            phone: string;
            website: string;
        };
        coordinates: {
            lat: number;
            lng: number;
        };
        images: string[];
        userId: number;
    };
};

type EnvironmentTestData = {
    [key in Environment]: VenueTestData;
};

export const venueTestData: EnvironmentTestData = {
    development: {
        new: {
            name: 'Test Venue (dev)',
            description: 'A test venue for development',
            address: '123 Dev St',
            contact: {
                email: 'test@dev.venue.com',
                phone: '+1-555-0123',
                website: 'https://dev.test.venue.com'
            },
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            images: ['https://dev.example.com/test1.jpg'],
            userId: 4
        },
        update: {
            description: 'An updated test venue (Dev)'
        },
        replace: {
            name: 'Replaced Venue (dev)',
            description: 'A completely replaced venue for development',
            address: '456 Dev Replace St',
            contact: {
                email: 'replaced@dev.venue.com',
                phone: '+1-555-9999',
                website: 'https://dev.replaced.venue.com'
            },
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            images: ['https://dev.example.com/replaced1.jpg'],
            userId: 4
        }
    },
    staging: {
        new: {
            name: 'Test Venue (stg)',
            description: 'A test venue for staging',
            address: '123 Staging St',
            contact: {
                email: 'test@staging.venue.com',
                phone: '+1-555-0123',
                website: 'https://staging.test.venue.com'
            },
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            images: ['https://staging.example.com/test1.jpg'],
            userId: 4
        },
        update: {
            description: 'An updated test venue (Staging)'
        },
        replace: {
            name: 'Replaced Venue (stg)',
            description: 'A completely replaced venue for staging',
            address: '456 Staging Replace St',
            contact: {
                email: 'replaced@staging.venue.com',
                phone: '+1-555-9999',
                website: 'https://staging.replaced.venue.com'
            },
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            images: ['https://staging.example.com/replaced1.jpg'],
            userId: 4
        }
    },
    production: {
        new: {
            name: 'Test Venue (prd)',
            description: 'A test venue for production',
            address: '123 Prod St',
            contact: {
                email: 'test@prod.venue.com',
                phone: '+1-555-0123',
                website: 'https://prod.test.venue.com'
            },
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            images: ['https://prod.example.com/test1.jpg'],
            userId: 4
        },
        update: {
            description: 'An updated test venue (Prod)'
        },
        replace: {
            name: 'Replaced Venue (prd)',
            description: 'A completely replaced venue for production',
            address: '456 Prod Replace St',
            contact: {
                email: 'replaced@prod.venue.com',
                phone: '+1-555-9999',
                website: 'https://prod.replaced.venue.com'
            },
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            images: ['https://prod.example.com/replaced1.jpg'],
            userId: 4
        }
    }
};
