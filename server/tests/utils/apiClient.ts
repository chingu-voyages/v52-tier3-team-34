import axios, { AxiosInstance } from 'axios';
import { ApiResponse, ApiErrorResponse } from '../types/api';
import { config } from '../config';
import { transformResponse, transformError } from './responseTransformer';

/**
 * API Client for making HTTP requests in tests
 */
export class ApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: config.api.baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Make a GET request
     */
    async get<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.get(url);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a POST request
     */
    async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.post(url, data);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a PATCH request
     */
    async patch<T>(url: string, data: any): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.patch(url, data);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a PUT request
     */
    async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.put(url, data);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a DELETE request
     */
    async delete<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.delete(url);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }
}
