import { AxiosResponse } from 'axios';
import { TestResponse, TestErrorResponse } from '../types/testResponse';

/**
 * Safely transforms an Axios response into our clean test response format
 */
export function transformResponse<T>(response: AxiosResponse): TestResponse<T> {
    return {
        status: response.status,
        data: {
            status: response.data.status,
            data: response.data.data
        }
    };
}

/**
 * Creates a clean error response from an error object
 */
export function transformError(error: any): TestErrorResponse {
    if (error.response) {
        return {
            status: error.response.status,
            message: error.response.data?.message || 'Unknown error'
        };
    }
    
    return {
        status: 500,
        message: error.message || 'Internal error'
    };
}
