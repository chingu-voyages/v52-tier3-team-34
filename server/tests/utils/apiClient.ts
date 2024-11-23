import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../config';
import { transformResponse, transformError } from './responseTransformer';
import { TestResponse, TestErrorResponse } from '../types/test';

/**
 * API Client for making HTTP requests in tests
 * Returns responses with separated HTTP and API concerns
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
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<TestResponse<T>> {
        try {
            const response = await this.api.get(url, config);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a POST request
     */
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TestResponse<T>> {
        try {
            const response = await this.api.post(url, data, config);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a PUT request
     */
    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TestResponse<T>> {
        try {
            const response = await this.api.put(url, data, config);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a PATCH request
     */
    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<TestResponse<T>> {
        try {
            const response = await this.api.patch(url, data, config);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }

    /**
     * Make a DELETE request
     */
    async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<TestResponse<T>> {
        try {
            const response = await this.api.delete(url, config);
            return transformResponse<T>(response);
        } catch (error: any) {
            throw transformError(error);
        }
    }
}
