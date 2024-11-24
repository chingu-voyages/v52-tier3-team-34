import { getCurrentEnvironment } from './environment';
import { config } from '../config';

describe('Environment Utils', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalApiUrl = process.env.API_URL;

    afterEach(() => {
        // Restore original environment variables after each test
        process.env.NODE_ENV = originalEnv;
        process.env.API_URL = originalApiUrl;
    });

    describe('API Configuration', () => {
        it('should use API_URL from environment when set', () => {
            const testUrl = 'http://test-api:3000/api';
            process.env.API_URL = testUrl;
            // Force config reload
            jest.resetModules();
            const { config } = require('../config');
            expect(config.api.baseUrl).toBe(testUrl);
        });

        it('should use default URL when API_URL not set', () => {
            process.env.API_URL = '';
            // Force config reload
            jest.resetModules();
            const { config } = require('../config');
            const result = config.api.baseUrl;
            expect(result).toBe('http://localhost:3000/api');
            expect(result).toMatch(/^https?:\/\/.+/);
        });
    });

    describe('getCurrentEnvironment', () => {
        it('should return development by default', () => {
            process.env.NODE_ENV = '';
            expect(getCurrentEnvironment()).toBe('development');
        });

        it('should return the current environment when set', () => {
            process.env.NODE_ENV = 'staging';
            expect(getCurrentEnvironment()).toBe('staging');
        });

        it('should handle uppercase environment names', () => {
            process.env.NODE_ENV = 'PRODUCTION';
            expect(getCurrentEnvironment()).toBe('production');
        });

        it('should throw error for invalid environment', () => {
            process.env.NODE_ENV = 'invalid';
            expect(() => getCurrentEnvironment()).toThrow(/Invalid environment/);
        });
    });
});
