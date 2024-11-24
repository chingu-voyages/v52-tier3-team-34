import { TestResponse, TestErrorResponse, UnwrapApiResponse } from '../types/test';
import { ApiErrorResponse } from '../types/api';
import { headerValidation } from './headerValidation';

/**
 * Assertions for common API response patterns
 */
export class TestAssertions {
    /**
     * Asserts that a response is a successful API response
     * @param response The test response to validate
     * @param expectedStatus Expected HTTP status code (default: 200)
     */
    static assertSuccessResponse<T>(response: TestResponse<T>, expectedStatus = 200): void {
        expect(response.status).toBe(expectedStatus);
        headerValidation.validateCommonHeaders(response.headers);
        expect(response.data.status).toBe('success');
        expect(response.data.timestamp).toBeDefined();
    }

    /**
     * Asserts that a response matches expected data structure
     * @param response The test response to validate
     * @param expectedData Expected data structure
     */
    static assertResponseData<T>(response: TestResponse<T>, expectedData: Partial<UnwrapApiResponse<T>>): void {
        this.assertSuccessResponse(response);
        expect(response.data.data).toMatchObject(expectedData);
    }

    /**
     * Asserts that a response includes valid pagination metadata
     * @param response The test response to validate
     * @param expectedPage Expected page number
     * @param expectedLimit Expected items per page
     */
    static assertPagination<T>(
        response: TestResponse<T>,
        expectedPage: number,
        expectedLimit: number
    ): void {
        this.assertSuccessResponse(response);
        expect(response.data.meta?.pagination).toMatchObject({
            page: expectedPage,
            limit: expectedLimit,
            total: expect.any(Number),
            totalPages: expect.any(Number),
            hasNext: expect.any(Boolean),
            hasPrevious: expect.any(Boolean)
        });
    }

    /**
     * Asserts that a response is an error with expected details
     * @param error The error response to validate
     * @param expectedStatus Expected HTTP status code
     * @param expectedCode Expected error code
     */
    static assertErrorResponse(
        error: TestErrorResponse,
        expectedStatus: number,
        expectedCode: string
    ): void {
        expect(error.status).toBe(expectedStatus);
        headerValidation.validateCommonHeaders(error.headers);
        expect(error.data.status).toBe('error');
        expect(error.data.error.code).toBe(expectedCode);
        expect(error.data.error.message).toBeDefined();
    }
}

/**
 * Response validators for type-safe response checking
 */
export class ResponseValidator {
    /**
     * Validates that a response has the required success response structure
     * @param response The response object to validate
     * @returns True if response has valid structure
     */
    static isValidSuccessResponse<T>(response: unknown): response is TestResponse<T> {
        if (!response || typeof response !== 'object') return false;
        
        const testResponse = response as TestResponse<T>;
        return (
            typeof testResponse.status === 'number' &&
            testResponse.data?.status === 'success' &&
            typeof testResponse.data?.timestamp === 'string' &&
            'data' in testResponse.data
        );
    }

    /**
     * Validates that a response has the required error response structure
     * @param response The response object to validate
     * @returns True if response has valid error structure
     */
    static isValidErrorResponse(response: unknown): response is TestErrorResponse {
        if (!response || typeof response !== 'object') return false;
        
        const errorResponse = response as TestErrorResponse;
        return (
            typeof errorResponse.status === 'number' &&
            errorResponse.data?.status === 'error' &&
            typeof errorResponse.data?.error?.code === 'string' &&
            typeof errorResponse.data?.error?.message === 'string'
        );
    }

    /**
     * Validates that a response has valid pagination metadata
     * @param response The response object to validate
     * @returns True if response has valid pagination
     */
    static hasValidPagination<T>(response: TestResponse<T>): boolean {
        const pagination = response.data.meta?.pagination;
        if (!pagination) return false;

        return (
            typeof pagination.page === 'number' &&
            typeof pagination.limit === 'number' &&
            typeof pagination.total === 'number' &&
            typeof pagination.totalPages === 'number' &&
            typeof pagination.hasNext === 'boolean' &&
            typeof pagination.hasPrevious === 'boolean'
        );
    }
}

/**
 * Common test assertions
 */
export const testAssertions = {
    /**
     * Validates a successful response
     */
    validateSuccessResponse<T>(response: TestResponse<T>, expectedStatus = 200) {
        // Validate HTTP layer
        expect(response.status).toBe(expectedStatus);
        headerValidation.validateCommonHeaders(response.headers);

        // Validate API response
        expect(response.data.status).toBe('success');
        expect(response.data.data).toBeDefined();
    },

    /**
     * Validates an error response
     */
    validateErrorResponse(response: TestErrorResponse, expectedStatus: number, expectedCode: string) {
        // Validate HTTP layer
        expect(response.status).toBe(expectedStatus);
        headerValidation.validateCommonHeaders(response.headers);

        // Validate error response
        expect(response.data.status).toBe('error');
        expect(response.data.error.code).toBe(expectedCode);
        expect(response.data.error.message).toBeDefined();
    },

    /**
     * Validates pagination metadata
     */
    validatePagination(response: TestResponse<any>, expectedPage: number, expectedLimit: number) {
        expect(response.data.meta?.pagination).toBeDefined();
        expect(response.data.meta?.pagination?.page).toBe(expectedPage);
        expect(response.data.meta?.pagination?.limit).toBe(expectedLimit);
    },

    /**
     * Header validation utilities
     */
    headers: headerValidation
};
