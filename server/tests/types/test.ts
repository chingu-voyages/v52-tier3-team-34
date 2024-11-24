import { ApiResponse, ApiErrorResponse } from './api';

/**
 * Test response wrapper that includes HTTP status code.
 * This type separates HTTP transport concerns from API response structure.
 * 
 * @template T The type of data expected in the API response
 * @property status HTTP status code (e.g., 200, 201, 400, etc.)
 * @property data The full API response including status, data, and metadata
 * @property headers Response headers
 * 
 * @example
 * ```typescript
 * const response = await api.get<User>('/users/1');
 * expect(response.status).toBe(200);
 * expect(response.data.status).toBe('success');
 * ```
 */
export interface TestResponse<T> {
    status: number;          // HTTP status code
    data: ApiResponse<T>;    // Actual API response
    headers: {              // Response headers
        [key: string]: string | string[] | undefined;
    };
}

/**
 * Test error response wrapper.
 * Used when an API request results in an error.
 * 
 * @property status HTTP status code (e.g., 400, 401, 404, etc.)
 * @property data The API error response containing error details
 * @property headers Response headers
 * 
 * @example
 * ```typescript
 * await expect(api.get('/users/999')).rejects.toMatchObject({
 *     status: 404,
 *     data: {
 *         status: 'error',
 *         error: { code: 'NOT_FOUND' }
 *     }
 * });
 * ```
 */
export interface TestErrorResponse {
    status: number;          // HTTP status code
    data: ApiErrorResponse;  // API error response
    headers: {              // Response headers
        [key: string]: string | string[] | undefined;
    };
}

/**
 * Helper type to access the data field of an API response.
 * Useful in tests when you need to access the actual data without the wrapper.
 * 
 * @template T The type to unwrap
 * 
 * @example
 * ```typescript
 * type UserData = UnwrapApiResponse<typeof response.data>;
 * // UserData will be the User type without the ApiResponse wrapper
 * ```
 */
export type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : T;

/**
 * Helper type to get the error from an API error response.
 * Provides direct access to error details for type-safe error handling.
 * 
 * @example
 * ```typescript
 * const error: UnwrapApiError = {
 *     code: 'VALIDATION_ERROR',
 *     message: 'Invalid input'
 * };
 * ```
 */
export type UnwrapApiError = ApiErrorResponse['error'];
