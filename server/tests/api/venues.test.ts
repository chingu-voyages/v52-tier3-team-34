import { config } from '../config';
import { describe, expect, it, beforeAll } from '@jest/globals';
import { getCurrentEnvironment } from '../utils/environment';
import { venueTestData } from '../data/venues';
import { ApiClient } from '../utils/apiClient';
import { Venue, VenueListResponse, VenueResponse } from '../types/venues';
import { ApiErrorResponse } from '../types/api';
import { getTestUser, validateTestData } from '../utils/testData';
import { User } from '@prisma/client';
import { UnwrapApiResponse } from '../types/test';

const currentEnv = getCurrentEnvironment();
console.log(`Running venue tests in ${currentEnv} environment`);

// Create API client instance
const api = new ApiClient();

// Get environment-specific test data
const testData = venueTestData[currentEnv];

describe('Venues API', () => {
    let createdVenueId: number;
    let testUser: User;

    beforeAll(async () => {
        expect(api).toBeDefined();
        // Validate required test data exists
        await validateTestData(testData, 'venues');
        // Get a valid test user
        testUser = await getTestUser();
        // Update test data with valid user ID
        testData.new.userId = testUser.id;
    });

    describe('GET /venues', () => {
        it('should return a list of venues', async () => {
            const response = await api.get<Venue[]>(config.api.endpoints.venues);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response structure
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
        });
    });

    describe('POST /venues', () => {
        it('should create a new venue', async () => {
            const response = await api.post<Venue>(config.api.endpoints.venues, testData.new);
            
            // Test HTTP layer
            expect(response.status).toBe(201);
            
            // Test API response
            expect(response.data.status).toBe('success');
            
            // Access the actual venue data
            const venue = response.data.data;
            expect(venue).toHaveProperty('id');
            expect(venue).toHaveProperty('userId', testData.new.userId);
            expect(venue.name).toContain(`(${currentEnv.slice(0, 3)})`);
            createdVenueId = venue.id;
        });
    });

    describe('GET /venues/:id', () => {
        it('should return a single venue', async () => {
            const response = await api.get<Venue>(`${config.api.endpoints.venues}/${createdVenueId}`);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            
            // Access the actual venue data
            const venue = response.data.data;
            expect(venue).toHaveProperty('id', createdVenueId);
            expect(venue).toHaveProperty('userId');
            expect(venue).toHaveProperty('user');
        });

        it('should return 404 for non-existent venue', async () => {
            try {
                await api.get<Venue>(`${config.api.endpoints.venues}/99999`);
                // If we get here, the request didn't throw as expected
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                // Test HTTP layer
                expect(error.status).toBe(404);
                expect(error.data.status).toBe('error');
            }
        });
    });

    describe('PATCH /venues/:id', () => {
        it('should update a venue', async () => {
            const response = await api.patch<Venue>(
                `${config.api.endpoints.venues}/${createdVenueId}`,
                testData.update
            );
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            
            // Access the actual venue data
            const venue = response.data.data;
            expect(venue).toHaveProperty('id', createdVenueId);
            expect(venue.description).toBe(testData.update.description);
        });
    });

    describe('PUT /venues/:id', () => {
        it('should replace a venue', async () => {
            const response = await api.put<Venue>(
                `${config.api.endpoints.venues}/${createdVenueId}`,
                testData.replace
            );
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            
            // Access the actual venue data
            const venue = response.data.data;
            expect(venue).toHaveProperty('id', createdVenueId);
            expect(venue.name).toContain(`(${currentEnv.slice(0, 3)})`);
        });
    });

    describe('DELETE /venues/:id', () => {
        it('should delete a venue', async () => {
            const response = await api.delete<VenueResponse>(`${config.api.endpoints.venues}/${createdVenueId}`);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
        });

        it('should return 404 when getting deleted venue', async () => {
            try {
                await api.get<Venue>(`${config.api.endpoints.venues}/${createdVenueId}`);
                // If we get here, the request didn't throw as expected
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                // Test HTTP layer
                expect(error.status).toBe(404);
                expect(error.data.status).toBe('error');
            }
        });
    });
});
