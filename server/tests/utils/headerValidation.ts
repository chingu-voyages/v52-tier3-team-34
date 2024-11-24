import { TestResponse } from '../types/test';

/**
 * Common header validation utilities
 */
export const headerValidation = {
    /**
     * Validates common headers that should be present in all responses
     */
    validateCommonHeaders(headers: TestResponse<any>['headers']) {
        expect(headers).toBeDefined();
        expect(headers['content-type']).toMatch(/application\/json/);
    },

    /**
     * Validates security headers
     */
    validateSecurityHeaders(headers: TestResponse<any>['headers']) {
        expect(headers['x-frame-options']).toBe('DENY');
        expect(headers['x-content-type-options']).toBe('nosniff');
        expect(headers['x-xss-protection']).toBe('1; mode=block');
    },

    /**
     * Validates cache control headers
     */
    validateCacheHeaders(headers: TestResponse<any>['headers'], shouldCache: boolean) {
        if (shouldCache) {
            expect(headers['cache-control']).toMatch(/max-age=/);
            expect(headers).toHaveProperty('etag');
        } else {
            expect(headers['cache-control']).toBe('no-cache, no-store, must-revalidate');
        }
    },

    /**
     * Validates CORS headers
     */
    validateCorsHeaders(headers: TestResponse<any>['headers']) {
        expect(headers['access-control-allow-origin']).toBe('*');
        expect(headers['access-control-allow-methods']).toMatch(/GET/);
        expect(headers['access-control-allow-headers']).toBeDefined();
    },

    /**
     * Validates custom API headers
     */
    validateApiHeaders(headers: TestResponse<any>['headers']) {
        expect(headers['x-request-id']).toMatch(/[\w-]+/);
        expect(headers['x-api-version']).toMatch(/v\d+/);
    },

    /**
     * Validates rate limiting headers
     */
    validateRateLimitHeaders(headers: TestResponse<any>['headers']) {
        expect(headers['x-ratelimit-limit']).toMatch(/\d+/);
        expect(headers['x-ratelimit-remaining']).toMatch(/\d+/);
    }
};
