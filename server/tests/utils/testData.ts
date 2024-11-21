import { PrismaClient, User, Venue } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Test Data Helper Error class
 * Used to distinguish data-related test errors from other errors
 */
export class TestDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TestDataError';
    }
}

/**
 * Validates that minimum required test data exists in the database
 * @throws {TestDataError} If required test data is missing
 */
export async function validateTestData(): Promise<void> {
    const errors: string[] = [];

    // Check for at least one user
    const userCount = await prisma.user.count();
    if (userCount === 0) {
        errors.push('No users found in database');
    }

    // Check for at least one venue
    const venueCount = await prisma.venue.count();
    if (venueCount === 0) {
        errors.push('No venues found in database');
    }

    // If any validation failed, throw error with all messages
    if (errors.length > 0) {
        throw new TestDataError(
            'Missing required test data:\n' +
            errors.map(err => `- ${err}`).join('\n') +
            '\n\nPlease run `npm run seed` to populate test data'
        );
    }
}

/**
 * Retrieves a valid user for testing purposes
 * @returns {Promise<User>} A valid user from the database
 * @throws {TestDataError} If no valid user is found in the database
 */
export async function getTestUser(): Promise<User> {
    const user = await prisma.user.findFirst();
    
    if (!user) {
        throw new TestDataError(
            'No test user found in database.\n' +
            'Please either:\n' +
            '1. Run `npm run seed` to populate test data, or\n' +
            '2. Create a test user manually'
        );
    }

    return user;
}

/**
 * Retrieves a valid venue for testing purposes
 * @returns {Promise<Venue>} A valid venue from the database
 * @throws {TestDataError} If no valid venue is found in the database
 */
export async function getTestVenue(): Promise<Venue> {
    const venue = await prisma.venue.findFirst({
        where: {
            user: {
                id: (await getTestUser()).id
            }
        }
    });
    
    if (!venue) {
        throw new TestDataError(
            'No test venue found in database.\n' +
            'Please either:\n' +
            '1. Run `npm run seed` to populate test data, or\n' +
            '2. Create a test venue manually'
        );
    }

    return venue;
}

/**
 * Clean up test data after tests
 * Useful for cleaning up data created during tests
 */
export async function cleanupTestData(): Promise<void> {
    // Add cleanup logic as needed
    await prisma.$disconnect();
}
