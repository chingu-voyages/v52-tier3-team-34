import { config } from '../config';
import { describe, expect, it, beforeAll } from '@jest/globals';
import { getCurrentEnvironment } from '../utils/environment';
import { eventTestData } from '../data/events';
import { ApiClient } from '../utils/apiClient';
import { EventResponse, EventListResponse, EventGeoJSONResponse, EventGeoJSON } from '../types/events';
import { ApiResponse, ApiErrorResponse } from '../types/api';
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
        // Get test user for creating events
        testUser = await getTestUser();
        expect(testUser).toBeDefined();
    });

    describe('POST /events', () => {
        it('should create a new event', async () => {
            // Validate test data before using
            validateTestData(testData.new, 'event creation');

            const response = await api.post<EventResponse>('/events', testData.new);
            expect(response.status).toBe(201);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toBeDefined();
            expect(response.data.data.title).toBe(testData.new.title);
            
            // Store created event ID for later tests
            createdEventId = response.data.data.id;
        });

        it('should return 400 for invalid event data', async () => {
            const invalidData = { ...testData.new, title: '' };
            const response = await api.post<ApiErrorResponse>('/events', invalidData);
            expect(response.status).toBe(400);
            expect(response.data.error).toBeDefined();
        });
    });

    describe('GET /events', () => {
        it('should list events with pagination', async () => {
            const response = await api.get<EventListResponse>('/events?page=1&limit=10');
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
            expect(response.data.pagination).toBeDefined();
        });

        it('should filter events by status', async () => {
            const response = await api.get<EventListResponse>('/events?status=published');
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
            response.data.data.forEach(event => {
                expect(event.status).toBe('published');
            });
        });

        it('should return events in default format', async () => {
            const response = await api.get<EventListResponse>('/events');
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
        });

        it('should return events in GeoJSON format', async () => {
            const response = await api.get<EventGeoJSONResponse>('/events?format=geojson');
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data.type).toBe('FeatureCollection');
            expect(Array.isArray(response.data.data.features)).toBe(true);
            
            // Additional GeoJSON validation
            if (response.data.data.features.length > 0) {
                const feature = response.data.data.features[0];
                expect(feature.type).toBe('Feature');
                expect(feature.geometry.type).toBe('Point');
                expect(Array.isArray(feature.geometry.coordinates)).toBe(true);
                expect(feature.properties).toBeDefined();
            }
        });

        it('should handle pagination', async () => {
            const pageSize = 5;
            const response = await api.get<EventListResponse>(`/events?page=1&limit=${pageSize}`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.pagination).toBeDefined();
            expect(response.data.pagination?.itemsPerPage).toBe(pageSize);
        });

        it('should filter events by date range', async () => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7); // 7 days ago
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 7); // 7 days from now

            const response = await api.get<EventListResponse>(
                `/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
        });

        it('should filter events by location', async () => {
            const lat = 37.7749;
            const lng = -122.4194;
            const radius = 10; // 10km radius

            const response = await api.get<EventListResponse>(
                `/events?lat=${lat}&lng=${lng}&radius=${radius}`
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
        });
    });

    describe('GET /events/zone', () => {
        it('should find events in a geographic zone', async () => {
            const params = {
                lat: 40.7580,  // Times Square coordinates
                lng: -73.9855,
                radius: 10     // 10km radius
            };
            const response = await api.get<EventListResponse>('/events/zone', { params });
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data)).toBe(true);
        });

        it('should return 400 for invalid zone parameters', async () => {
            const params = {
                lat: 'invalid',
                lng: -73.9855,
                radius: 10
            };
            const response = await api.get<ApiErrorResponse>('/events/zone', { params });
            expect(response.status).toBe(400);
            expect(response.data.error).toBeDefined();
        });
    });

    describe('GET /events/:id', () => {
        it('should get event by ID', async () => {
            const response = await api.get<EventResponse>(`/events/${createdEventId}`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data.id).toBe(createdEventId);
        });

        it('should return 404 for non-existent event', async () => {
            const response = await api.get<ApiErrorResponse>('/events/99999');
            expect(response.status).toBe(404);
            expect(response.data.error).toBeDefined();
        });
    });

    describe('GET /events/:id/geojson', () => {
        it('should get event in GeoJSON format', async () => {
            const response = await api.get<ApiResponse<EventGeoJSON>>(`/events/${createdEventId}/geojson`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data.type).toBe('Feature');
            expect(response.data.data.geometry).toBeDefined();
            expect(response.data.data.properties).toBeDefined();
        });
    });

    describe('PATCH /events/:id', () => {
        it('should update event details', async () => {
            validateTestData(testData.update, 'event update');

            const response = await api.patch<EventResponse>(
                `/events/${createdEventId}`,
                testData.update
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data.description).toBe(testData.update.description);
        });

        it('should return 400 for invalid update data', async () => {
            const invalidData = { ticketPrice: -100 };
            const response = await api.patch<ApiErrorResponse>(
                `/events/${createdEventId}`,
                invalidData
            );
            expect(response.status).toBe(400);
            expect(response.data.error).toBeDefined();
        });
    });

    describe('DELETE /events/:id', () => {
        it('should delete an event', async () => {
            const response = await api.delete(`/events/${createdEventId}`);
            expect(response.status).toBe(204);
        });

        it('should return 404 when deleting non-existent event', async () => {
            const response = await api.delete<ApiErrorResponse>(`/events/${createdEventId}`);
            expect(response.status).toBe(404);
            expect(response.data.error).toBeDefined();
        });
    });

    describe('Error Handling', () => {
        it('should handle invalid event creation', async () => {
            const invalidData = { title: '' }; // Missing required fields
            
            try {
                await api.post<EventResponse>('/events', invalidData);
                fail('Expected request to fail');
            } catch (error: any) {
                const errorResponse = error.response?.data as ApiErrorResponse;
                expect(error.response?.status).toBe(400);
                expect(errorResponse.status).toBe('error');
                expect(errorResponse.error).toBeDefined();
            }
        });

        it('should handle event not found', async () => {
            const nonExistentId = '000000000000000000000000';
            
            try {
                await api.get<EventResponse>(`/events/${nonExistentId}`);
                fail('Expected request to fail');
            } catch (error: any) {
                const errorResponse = error.response?.data as ApiErrorResponse;
                expect(error.response?.status).toBe(404);
                expect(errorResponse.status).toBe('error');
                expect(errorResponse.error).toBeDefined();
            }
        });

        it('should handle invalid query parameters', async () => {
            try {
                await api.get<EventListResponse>('/events?radius=invalid');
                fail('Expected request to fail');
            } catch (error: any) {
                const errorResponse = error.response?.data as ApiErrorResponse;
                expect(error.response?.status).toBe(400);
                expect(errorResponse.status).toBe('error');
                expect(errorResponse.error).toBeDefined();
            }
        });

        it('should handle invalid date range', async () => {
            const endDate = new Date();
            const startDate = new Date(endDate.getTime() + 86400000); // Start date after end date

            try {
                await api.get<EventListResponse>(
                    `/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
                );
                fail('Expected request to fail');
            } catch (error: any) {
                const errorResponse = error.response?.data as ApiErrorResponse;
                expect(error.response?.status).toBe(400);
                expect(errorResponse.status).toBe('error');
                expect(errorResponse.error).toBeDefined();
            }
        });
    });
});
