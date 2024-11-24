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
 * Validates that test data object has required fields
 * @param data The test data object to validate
 * @param context The context in which validation is occurring (for error messages)
 * @throws {TestDataError} If required test data is missing
 */
export function validateTestData(data: Record<string, any>, context: string): void {
    if (!data || typeof data !== 'object') {
        throw new TestDataError(`Invalid test data for ${context}: data must be an object`);
    }

    const requiredFields = Object.keys(data);
    const missingFields = requiredFields.filter(field => data[field] === undefined);

    if (missingFields.length > 0) {
        throw new TestDataError(
            `Missing required fields for ${context}: ${missingFields.join(', ')}`
        );
    }
}

/**
 * Validates that minimum required test data exists in the database
 * @throws {TestDataError} If required test data is missing
 */
export async function validateDatabaseData(): Promise<void> {
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

    if (errors.length > 0) {
        throw new TestDataError(`Database validation failed: ${errors.join(', ')}`);
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
        throw new TestDataError('No valid test user found in database');
    }
    return user;
}

/**
 * Retrieves a valid venue for testing purposes
 * @returns {Promise<Venue>} A valid venue from the database
 * @throws {TestDataError} If no valid venue is found in the database
 */
export async function getTestVenue(): Promise<Venue> {
    const venue = await prisma.venue.findFirst();
    if (!venue) {
        throw new TestDataError('No valid test venue found in database');
    }
    return venue;
}

/**
 * Clean up test data after tests
 * Useful for cleaning up data created during tests
 */
export async function cleanupTestData(): Promise<void> {
    // Add cleanup logic as needed
    await Promise.resolve();
}
