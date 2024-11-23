import { config } from '../config';
import { describe, expect, it, beforeAll } from '@jest/globals';
import { getCurrentEnvironment } from '../utils/environment';
import { eventTestData } from '../data/events';
import { ApiClient } from '../utils/apiClient';
import { Event, EventGeoJSON, EventGeoJSONCollection } from '../types/events';
import { getTestUser, validateTestData } from '../utils/testData';
import { User } from '@prisma/client';

const currentEnv = getCurrentEnvironment();
console.log(`Running event tests in ${currentEnv} environment`);

// Create API client instance
const api = new ApiClient();

// Get environment-specific test data
const testData = eventTestData[currentEnv];

describe('Events API', () => {
    let createdEventId: number;
    let testUser: User;

    beforeAll(async () => {
        expect(api).toBeDefined();
        // Validate required test data exists
        await validateTestData(testData, 'events');
        // Get a valid test user
        testUser = await getTestUser();
        // Update test data with valid user ID
        testData.new.userId = testUser.id;
    });

    describe('POST /events', () => {
        it('should create a new event', async () => {
            const response = await api.post<Event>(config.api.endpoints.events, testData.new);
            
            // Test HTTP layer
            expect(response.status).toBe(201);
            
            // Test API response
            expect(response.data.status).toBe('success');
            const event = response.data.data;
            expect(event.title).toContain(`(${currentEnv.slice(0, 3)})`);
            expect(event).toHaveProperty('id');
            createdEventId = event.id;
        });

        it('should return 400 for invalid event data', async () => {
            try {
                await api.post<Event>(config.api.endpoints.events, {});
                expect('Request should have thrown a 400').toBeFalsy();
            } catch (error: any) {
                expect(error.status).toBe(400);
                expect(error.data.status).toBe('error');
            }
        });
    });

    describe('GET /events', () => {
        it('should return a list of events', async () => {
            const response = await api.get<Event[]>(config.api.endpoints.events);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            const events = response.data.data;
            expect(Array.isArray(events)).toBe(true);
            events.forEach(event => {
                expect(event).toHaveProperty('id');
                expect(event).toHaveProperty('title');
            });
        });
    });

    describe('GET /events/geojson', () => {
        it('should return events in GeoJSON format', async () => {
            const response = await api.get<EventGeoJSONCollection>(config.api.endpoints.eventsGeoJSON);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            const geoJSON = response.data.data;
            expect(geoJSON.type).toBe('FeatureCollection');
            expect(Array.isArray(geoJSON.features)).toBe(true);
            
            // Test feature properties
            if (geoJSON.features.length > 0) {
                const feature = geoJSON.features[0];
                expect(feature).toHaveProperty('type', 'Feature');
                expect(feature).toHaveProperty('geometry');
                expect(feature).toHaveProperty('properties');
            }
        });
    });

    describe('GET /events/:id', () => {
        it('should return a single event', async () => {
            const response = await api.get<Event>(`${config.api.endpoints.events}/${createdEventId}`);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            const event = response.data.data;
            expect(event).toHaveProperty('id', createdEventId);
            expect(event).toHaveProperty('title');
        });

        it('should return 404 for non-existent event', async () => {
            try {
                await api.get<Event>(`${config.api.endpoints.events}/99999`);
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                expect(error.status).toBe(404);
                expect(error.data.status).toBe('error');
            }
        });
    });

    describe('GET /events/:id/geojson', () => {
        it('should return a single event in GeoJSON format', async () => {
            const response = await api.get<EventGeoJSON>(`${config.api.endpoints.events}/${createdEventId}/geojson`);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            const geoJSON = response.data.data;
            expect(geoJSON.type).toBe('Feature');
            expect(geoJSON.geometry).toBeDefined();
            expect(geoJSON.properties).toBeDefined();
        });
    });

    describe('PATCH /events/:id', () => {
        it('should update an event', async () => {
            const response = await api.patch<Event>(
                `${config.api.endpoints.events}/${createdEventId}`,
                testData.update
            );
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
            const event = response.data.data;
            expect(event.description).toBe(testData.update.description);
        });

        it('should return 404 for non-existent event', async () => {
            try {
                await api.patch<Event>(`${config.api.endpoints.events}/99999`, testData.update);
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                expect(error.status).toBe(404);
                expect(error.data.status).toBe('error');
            }
        });
    });

    describe('DELETE /events/:id', () => {
        it('should delete an event', async () => {
            const response = await api.delete(`${config.api.endpoints.events}/${createdEventId}`);
            
            // Test HTTP layer
            expect(response.status).toBe(200);
            
            // Test API response
            expect(response.data.status).toBe('success');
        });

        it('should return 404 when getting deleted event', async () => {
            try {
                await api.get<Event>(`${config.api.endpoints.events}/${createdEventId}`);
                expect('Request should have thrown a 404').toBeFalsy();
            } catch (error: any) {
                expect(error.status).toBe(404);
                expect(error.data.status).toBe('error');
            }
        });
    });
});
