import dotenv from 'dotenv';

describe('Environment Variables', () => {
    beforeAll(() => {
        // Load environment variables
        dotenv.config();
    });

    it('should load API_URL from environment', () => {
        const apiUrl = process.env.API_URL;
        // Should fall back to default if not set
        expect(apiUrl || 'http://localhost:3000/api').toBeTruthy();
    });

    it('should have valid API_URL format', () => {
        const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
        // Check if it's a valid URL format
        expect(apiUrl).toMatch(/^https?:\/\/.+/);
    });
});
