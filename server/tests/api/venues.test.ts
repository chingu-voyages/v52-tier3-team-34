import axios from 'axios';
import { config } from '../config';
import { describe, expect, it, beforeAll } from '@jest/globals';
import { getCurrentEnvironment, getApiBaseUrl } from '../utils/environment';
import { venueTestData } from '../data/venues';
import { ApiClient } from '../utils/apiClient';
import { VenueListResponse, VenueSingleResponse, Venue } from '../types/api';

const currentEnv = getCurrentEnvironment();
console.log(`Running venue tests in ${currentEnv} environment`);

// Create API client instance
const api = new ApiClient();

// Get environment-specific test data
const testData = venueTestData[currentEnv];

describe('Venues API', () => {
    let createdVenueId: number;

    beforeAll(() => {
        console.log(`API Base URL: ${api['api'].defaults.baseURL}`);
    });

    describe('GET /venues', () => {
        it('should return a list of venues', async () => {
            const response = await api.get<VenueListResponse>(config.api.endpoints.venues);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data.venues)).toBe(true);
        });
    });

    describe('POST /venues', () => {
        it('should create a new venue', async () => {
            const response = await api.post<Venue>(config.api.endpoints.venues, testData.new);
            expect(response.status).toBe(201);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveProperty('id');
            expect(response.data.data).toHaveProperty('userId', testData.new.userId);
            expect(response.data.data.name).toContain(`(${currentEnv.slice(0, 3)})`);
            createdVenueId = response.data.data.id;
        });
    });

    describe('GET /venues/:id', () => {
        it('should return a single venue', async () => {
            const response = await api.get<Venue>(`${config.api.endpoints.venues}/${createdVenueId}`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveProperty('id', createdVenueId);
            expect(response.data.data).toHaveProperty('userId');
            expect(response.data.data).toHaveProperty('user');
        });

        it('should return 404 for non-existent venue', async () => {
            try {
                await api.get<Venue>(`${config.api.endpoints.venues}/99999`);
                // If we get here, the request didn't throw as expected
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe('PATCH /venues/:id', () => {
        it('should update a venue', async () => {
            const response = await api.patch<Venue>(
                `${config.api.endpoints.venues}/${createdVenueId}`,
                testData.update
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveProperty('id', createdVenueId);
            expect(response.data.data.description).toBe(testData.update.description);
        });
    });

    describe('PUT /venues/:id', () => {
        it('should replace a venue', async () => {
            const response = await api.put<Venue>(
                `${config.api.endpoints.venues}/${createdVenueId}`,
                testData.replace
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveProperty('id', createdVenueId);
            expect(response.data.data.name).toContain(`(${currentEnv.slice(0, 3)})`);
        });
    });

    describe('DELETE /venues/:id', () => {
        it('should delete a venue', async () => {
            const response = await api.delete<Venue>(`${config.api.endpoints.venues}/${createdVenueId}`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
        });

        it('should return 404 when getting deleted venue', async () => {
            try {
                await api.get<Venue>(`${config.api.endpoints.venues}/${createdVenueId}`);
                // If we get here, the request didn't throw as expected
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                expect(error.response.status).toBe(404);
            }
        });
    });
});
