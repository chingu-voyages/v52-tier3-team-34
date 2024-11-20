export const config = {
    api: {
        baseUrl: 'http://localhost:3000/api',
        endpoints: {
            venues: '/venues'
        }
    },
    testData: {
        venues: {
            new: {
                name: 'Test Venue',
                description: 'A test venue',
                address: '123 Test St',
                contact: {
                    email: 'test@venue.com',
                    phone: '+1-555-0123',
                    website: 'https://test.venue.com'
                },
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0060
                },
                images: ['https://example.com/test1.jpg'],
                userId: 4
            },
            update: {
                description: 'An updated test venue'
            },
            replace: {
                name: 'Replaced Venue',
                description: 'A completely replaced venue',
                address: '456 Replace St',
                contact: {
                    email: 'replaced@venue.com',
                    phone: '+1-555-9999',
                    website: 'https://replaced.venue.com'
                },
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0060
                },
                images: ['https://example.com/replaced1.jpg'],
                userId: 4
            }
        }
    }
};
