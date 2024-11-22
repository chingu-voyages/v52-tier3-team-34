import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiErrorResponse } from '../types/api';

interface ServerResponse<T> {
    status: 'success' | 'error';
    data: T;
    message?: string;
    timestamp?: string;
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

interface ServerError {
    error: string;
    timestamp?: string;
}

/**
 * Transform Axios response to our API response format
 */
export function transformResponse<T>(response: AxiosResponse<ServerResponse<T>>): ApiResponse<T> {
    return {
        status: 'success',
        data: response.data.data,
        message: response.data.message,
        timestamp: response.data.timestamp,
        pagination: response.data.pagination
    };
}

/**
 * Transform Axios error to our API error format
 */
export function transformError(error: AxiosError<ServerError>): ApiErrorResponse {
    if (error.response?.data) {
        return {
            status: 'error',
            error: error.response.data.error,
            timestamp: error.response.data.timestamp
        };
    }
    
    return {
        status: 'error',
        error: error.message
    };
}
