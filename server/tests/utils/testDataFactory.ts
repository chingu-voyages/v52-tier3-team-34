import { User } from '../../src/types/user';
import { Venue } from '../../src/types/venue';
import { Event } from '../../src/types/event';

/**
 * Factory class for generating test data
 */
export class TestDataFactory {
    private static counter = 1;

    /**
     * Reset the counter used for generating unique IDs
     */
    static resetCounter(): void {
        this.counter = 1;
    }

    /**
     * Create a test user with optional overrides
     * @param overrides Optional properties to override defaults
     * @returns A test user object
     */
    static createUser(overrides: Partial<User> = {}): User {
        const defaults: User = {
            id: this.counter++,
            email: `test.user${this.counter}@example.com`,
            name: `Test User ${this.counter}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return { ...defaults, ...overrides };
    }

    /**
     * Create multiple test users
     * @param count Number of users to create
     * @param overrides Optional properties to override defaults
     * @returns Array of test users
     */
    static createUsers(count: number, overrides: Partial<User> = {}): User[] {
        return Array.from({ length: count }, () => this.createUser(overrides));
    }

    /**
     * Create a test venue with optional overrides
     * @param overrides Optional properties to override defaults
     * @returns A test venue object
     */
    static createVenue(overrides: Partial<Venue> = {}): Venue {
        const defaults: Venue = {
            id: this.counter++,
            name: `Test Venue ${this.counter}`,
            description: `Description for venue ${this.counter}`,
            location: {
                type: 'Point',
                coordinates: [-73.935242 + (Math.random() * 0.1), 40.730610 + (Math.random() * 0.1)]
            },
            address: {
                street: `${this.counter} Test Street`,
                city: 'Test City',
                state: 'TS',
                zipCode: '12345'
            },
            capacity: 100 + Math.floor(Math.random() * 900),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return { ...defaults, ...overrides };
    }

    /**
     * Create multiple test venues
     * @param count Number of venues to create
     * @param overrides Optional properties to override defaults
     * @returns Array of test venues
     */
    static createVenues(count: number, overrides: Partial<Venue> = {}): Venue[] {
        return Array.from({ length: count }, () => this.createVenue(overrides));
    }

    /**
     * Create a test event with optional overrides
     * @param venue The venue where the event takes place
     * @param overrides Optional properties to override defaults
     * @returns A test event object
     */
    static createEvent(venue: Venue, overrides: Partial<Event> = {}): Event {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
        
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 3);

        const defaults: Event = {
            id: this.counter++,
            name: `Test Event ${this.counter}`,
            description: `Description for event ${this.counter}`,
            venueId: venue.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            ticketPrice: Math.floor(Math.random() * 100) + 10,
            capacity: Math.min(venue.capacity, 50 + Math.floor(Math.random() * 200)),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return { ...defaults, ...overrides };
    }

    /**
     * Create multiple test events
     * @param venue The venue where the events take place
     * @param count Number of events to create
     * @param overrides Optional properties to override defaults
     * @returns Array of test events
     */
    static createEvents(venue: Venue, count: number, overrides: Partial<Event> = {}): Event[] {
        return Array.from({ length: count }, () => this.createEvent(venue, overrides));
    }
}
