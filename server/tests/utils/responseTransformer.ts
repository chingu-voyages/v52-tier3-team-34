import { AxiosResponse, AxiosError, RawAxiosResponseHeaders, AxiosResponseHeaders } from 'axios';
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
 * Transform Axios headers to our test response format
 */
function transformHeaders(headers: RawAxiosResponseHeaders | AxiosResponseHeaders): { [key: string]: string | string[] | undefined } {
    const transformedHeaders: { [key: string]: string | string[] | undefined } = {};
    
    Object.entries(headers).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            transformedHeaders[key] = undefined;
        } else if (Array.isArray(value)) {
            transformedHeaders[key] = value;
        } else {
            transformedHeaders[key] = String(value);
        }
    });
    
    return transformedHeaders;
}

/**
 * Transform Axios response to our test response format
 * Separates HTTP status from API response data
 */
export function transformResponse<T>(response: AxiosResponse<ServerResponse<T>>): TestResponse<T> {
    const { data: serverResponse, status: httpStatus, headers } = response;
    const timestamp = serverResponse?.timestamp || new Date().toISOString();

    // Ensure we have a valid server response
    if (!serverResponse || typeof serverResponse !== 'object') {
        throw new Error('Invalid server response format');
    }

    // Handle error responses
    if (serverResponse.status === 'error' && serverResponse.error) {
        throw new AxiosError(
            serverResponse.error.message,
            serverResponse.error.code,
            response.config,
            response.request,
            response
        );
    }

    // Create API response
    const apiResponse: ApiResponse<T> = {
        status: 'success',
        data: serverResponse.data,
        timestamp,
        meta: serverResponse.pagination ? {
            pagination: {
                page: serverResponse.pagination.currentPage,
                limit: serverResponse.pagination.itemsPerPage,
                total: serverResponse.pagination.totalItems,
                totalPages: serverResponse.pagination.totalPages,
                hasNext: serverResponse.pagination.hasNextPage,
                hasPrevious: serverResponse.pagination.hasPreviousPage
            }
        } : undefined
    };

    return {
        status: httpStatus,
        data: apiResponse,
        headers: transformHeaders(headers)
    };
}

/**
 * Transform Axios error to our test error format
 * Separates HTTP status from API error response
 */
export function transformError(error: AxiosError<ServerResponse<unknown>>): TestErrorResponse {
    const errorResponse = error.response?.data;
    const httpStatus = error.response?.status || 500;
    const headers = error.response?.headers || {};
    const timestamp = errorResponse?.timestamp || new Date().toISOString();

    // If we have a structured error response from the server
    if (errorResponse?.error && typeof errorResponse.error === 'object') {
        const apiError: ApiErrorResponse = {
            status: 'error',
            error: {
                code: String(errorResponse.error.code || error.code || 'UNKNOWN_ERROR'),
                message: String(errorResponse.error.message || error.message || 'An unknown error occurred'),
                details: errorResponse.error.details
            },
            timestamp
        };

        return {
            status: httpStatus,
            data: apiError,
            headers: transformHeaders(headers)
        };
    }

    // For unstructured errors
    return {
        status: httpStatus,
        data: {
            status: 'error',
            error: {
                code: String(error.code || 'UNKNOWN_ERROR'),
                message: error.message || 'An unknown error occurred'
            },
            timestamp
        },
        headers: transformHeaders(headers)
    };
}
