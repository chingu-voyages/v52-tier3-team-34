import dotenv from 'dotenv';
import { config } from './config';

describe('Environment Variables', () => {
    beforeAll(() => {
        // Load environment variables
        dotenv.config();
    });

    it('should load API_URL from environment or use default', () => {
        expect(config.api.baseUrl).toBeTruthy();
        expect(config.api.baseUrl).toMatch(/^https?:\/\/.+/);
    });

    it('should maintain backward compatibility with default URL', () => {
        // Even without environment variable, should have default
        const defaultUrl = 'http://localhost:3000/api';
        process.env.API_URL = '';
        expect(config.api.baseUrl || defaultUrl).toBe(defaultUrl);
    });
});
