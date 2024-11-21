/**
 * Clean response structure for tests, avoiding circular references
 */
export interface TestResponse<T> {
    status: number;
    data: {
        status: string;
        data: T;
    };
}

/**
 * Error response structure for tests
 */
export interface TestErrorResponse {
    status: number;
    message: string;
}
