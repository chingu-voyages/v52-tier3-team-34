/**
 * Common API response wrapper
 * Used for both API responses and test responses to avoid circular references
 */
export interface ApiResponse<T> {
    status: number;
    data: {
        status: string;
        data: T;
    };
}

/**
 * Error response structure
 */
export interface ApiErrorResponse {
    status: number;
    message: string;
}
