import axios from 'axios';
import { config } from '../config';
import { describe, expect, it } from '@jest/globals';

const api = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

describe('Venues API', () => {
    let createdVenueId: number;

    describe('GET /venues', () => {
        it('should return a list of venues', async () => {
            const response = await api.get(config.api.endpoints.venues);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(Array.isArray(response.data.data.venues)).toBe(true);
        });
    });

    describe('POST /venues', () => {
        it('should create a new venue', async () => {
            const response = await api.post(config.api.endpoints.venues, config.testData.venues.new);
            expect(response.status).toBe(201);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveProperty('id');
            expect(response.data.data).toHaveProperty('userId', config.testData.venues.new.userId);
            createdVenueId = response.data.data.id;
        });
    });

    describe('GET /venues/:id', () => {
        it('should return a single venue', async () => {
            const response = await api.get(`${config.api.endpoints.venues}/${createdVenueId}`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveProperty('id', createdVenueId);
            expect(response.data.data).toHaveProperty('userId');
            expect(response.data.data).toHaveProperty('user');
        });

        it('should return 404 for non-existent venue', async () => {
            try {
                await api.get(`${config.api.endpoints.venues}/99999`);
            } catch (error: any) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe('PATCH /venues/:id', () => {
        it('should update a venue', async () => {
            const response = await api.patch(
                `${config.api.endpoints.venues}/${createdVenueId}`,
                config.testData.venues.update
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data.description).toBe(config.testData.venues.update.description);
        });
    });

    describe('PUT /venues/:id', () => {
        it('should replace a venue', async () => {
            const response = await api.put(
                `${config.api.endpoints.venues}/${createdVenueId}`,
                config.testData.venues.replace
            );
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data.name).toBe(config.testData.venues.replace.name);
        });
    });

    describe('DELETE /venues/:id', () => {
        it('should delete a venue', async () => {
            const response = await api.delete(`${config.api.endpoints.venues}/${createdVenueId}`);
            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
        });

        it('should return 404 when getting deleted venue', async () => {
            try {
                await api.get(`${config.api.endpoints.venues}/${createdVenueId}`);
            } catch (error: any) {
                expect(error.response.status).toBe(404);
            }
        });
    });
});
