import { AxiosResponse } from 'axios';
import { ApiResponse, ApiErrorResponse } from '../types/api';

/**
 * Safely transforms an Axios response into our clean test response format
 */
export function transformResponse<T>(response: AxiosResponse): ApiResponse<T> {
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
export function transformError(error: any): ApiErrorResponse {
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
