import { getCurrentEnvironment, validateEnvironment, getApiBaseUrl, Environment } from './environment';

describe('Environment Utils', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalApiUrl = process.env.API_URL;

    afterEach(() => {
        // Restore original environment variables after each test
        process.env.NODE_ENV = originalEnv;
        process.env.API_URL = originalApiUrl;
    });

    describe('getApiBaseUrl', () => {
        it('should return API_URL from environment when set', () => {
            const testUrl = 'http://test-api:3000/api';
            process.env.API_URL = testUrl;
            expect(getApiBaseUrl()).toBe(testUrl);
        });

        it('should return default URL when API_URL not set', () => {
            process.env.API_URL = '';
            const result = getApiBaseUrl();
            expect(result).toBe('http://localhost:3000/api');
            expect(result).toMatch(/^https?:\/\/.+/);
        });
    });

    describe('getCurrentEnvironment', () => {
        it('should return development by default', () => {
            process.env.NODE_ENV = '';
            expect(getCurrentEnvironment()).toBe('development');
        });

        it('should return current environment when valid', () => {
            process.env.NODE_ENV = 'production';
            expect(getCurrentEnvironment()).toBe('production');
        });

        it('should handle uppercase environment names', () => {
            process.env.NODE_ENV = 'STAGING';
            expect(getCurrentEnvironment()).toBe('staging');
        });
    });

    describe('validateEnvironment', () => {
        it('should accept valid environments', () => {
            const validEnvs: Environment[] = ['development', 'staging', 'production'];
            validEnvs.forEach(env => {
                expect(() => validateEnvironment(env)).not.toThrow();
                expect(validateEnvironment(env)).toBe(env);
            });
        });

        it('should throw error for invalid environment', () => {
            expect(() => validateEnvironment('invalid')).toThrow(/Invalid environment/);
            expect(() => validateEnvironment('test')).toThrow(/Invalid environment/);
        });
    });
});
