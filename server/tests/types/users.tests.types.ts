/**
 * User API Test Types
 * These types represent the expected contract of the Users API
 * for testing purposes, independent of the actual API implementation.
 */

/**
 * User data as returned by the API
 */
export interface UserTest {
    id: number;
    email: string;
    name: string;
    profileImage?: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Data required to create a new user
 */
export interface CreateUserTest {
    email: string;
    name: string;
    googleId: string;
    profileImage?: string;
}

/**
 * Data that can be updated for a user
 */
export interface UpdateUserTest {
    name?: string;
    profileImage?: string | null;
}

/**
 * Parameters for filtering users
 */
export interface UserFiltersTest {
    email?: string;
    name?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

/**
 * Response metadata
 */
export interface ResponseMeta {
    pagination?: PaginationMeta;
    filters?: Record<string, unknown>;
    includes?: string[];
}

/**
 * Error response structure
 */
export interface ApiError {
    code: string;
    message: string;
    details?: any[];
}

/**
 * Base API response structure
 */
export interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    meta?: ResponseMeta;
    timestamp: string;
    error?: ApiError;
}

/**
 * Response types for user endpoints
 */
export interface UserListResponse extends ApiResponse<UserTest[]> {
    meta: ResponseMeta; // Override meta to be required for list responses
}

export interface UserResponse extends ApiResponse<UserTest> {}
