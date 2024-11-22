/**
 * Common API response wrapper
 * Used for both API responses and test responses
 */
export interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    meta?: {
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
        filters?: Record<string, any>;
        sort?: {
            field: string;
            direction: 'asc' | 'desc';
        };
    };
    timestamp: string;  // ISO 8601 format
}

/**
 * Error response structure
 */
export interface ApiErrorResponse {
    status: 'error';
    error: {
        code: string;        // e.g., 'RESOURCE_NOT_FOUND'
        message: string;     // User-friendly message
        details?: any;       // Additional error context
    };
    timestamp: string;       // ISO 8601 format
}
