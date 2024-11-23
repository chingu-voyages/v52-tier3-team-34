import { ApiResponse, ApiErrorResponse } from './api';

/**
 * Test response wrapper that includes HTTP status code
 * This separates HTTP transport concerns from API response structure
 */
export interface TestResponse<T> {
    status: number;          // HTTP status code
    data: ApiResponse<T>;    // Actual API response
}

/**
 * Test error response wrapper
 */
export interface TestErrorResponse {
    status: number;          // HTTP status code
    data: ApiErrorResponse;  // API error response
}

/**
 * Helper type to access the data field of an API response
 * Useful in tests when you need to access the actual data
 */
export type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : T;

/**
 * Helper type to get the error from an API error response
 */
export type UnwrapApiError = ApiErrorResponse['error'];
