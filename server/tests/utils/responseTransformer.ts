import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiErrorResponse } from '../types/api';
import { TestResponse, TestErrorResponse } from '../types/test';

/**
 * Raw server response structure
 */
interface ServerResponse<T> {
    status: 'success' | 'error';
    data: T;
    message?: string;
    timestamp?: string;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

/**
 * Transform Axios response to our test response format
 * Separates HTTP status from API response data
 */
export function transformResponse<T>(response: AxiosResponse<any>): TestResponse<T> {
    const { data: serverResponse, status: httpStatus } = response;
    
    // Handle simple responses (like health endpoint)
    if (typeof serverResponse === 'object' && 'status' in serverResponse && Object.keys(serverResponse).length === 1) {
        return {
            status: httpStatus,
            data: serverResponse
        };
    }

    // Handle standard API responses
    const apiResponse: ApiResponse<T> = {
        status: 'success',
        data: serverResponse.data,
        meta: serverResponse.pagination ? {
            pagination: {
                page: serverResponse.pagination.currentPage,
                limit: serverResponse.pagination.itemsPerPage,
                total: serverResponse.pagination.totalItems,
                totalPages: serverResponse.pagination.totalPages,
                hasNext: serverResponse.pagination.hasNextPage,
                hasPrevious: serverResponse.pagination.hasPreviousPage
            }
        } : undefined,
        timestamp: serverResponse.timestamp || new Date().toISOString()
    };

    return {
        status: httpStatus,
        data: apiResponse
    };
}

/**
 * Transform Axios error to our test error format
 * Separates HTTP status from API error response
 */
export function transformError(error: AxiosError<ServerResponse<unknown>>): TestErrorResponse {
    const httpStatus = error.response?.status || 500;
    const errorData = error.response?.data;
    
    const apiError: ApiErrorResponse = {
        status: 'error',
        error: {
            code: errorData?.error?.code || 'UNKNOWN_ERROR',
            message: errorData?.error?.message || error.message,
            details: errorData?.error?.details
        },
        timestamp: new Date().toISOString()
    };

    return {
        status: httpStatus,
        data: apiError
    };
}
