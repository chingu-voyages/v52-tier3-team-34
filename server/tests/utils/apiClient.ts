import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types/api';
import { getApiBaseUrl } from './environment';

/**
 * API Client for making HTTP requests in tests
 */
export class ApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: getApiBaseUrl(),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Extract only the necessary data from Axios response
     */
    private extractResponse<T>(response: AxiosResponse): ApiResponse<T> {
        // Create a new object with only the properties we need
        const cleanResponse = {
            status: response.status,
            data: {
                status: response.data.status,
                data: response.data.data
            }
        };

        // Break circular references by creating a new object
        return JSON.parse(JSON.stringify(cleanResponse));
    }

    /**
     * Make a GET request
     */
    async get<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.get(url);
            return this.extractResponse<T>(response);
        } catch (error: any) {
            if (error.response) {
                throw {
                    response: {
                        status: error.response.status,
                        data: error.response.data
                    }
                };
            }
            throw error;
        }
    }

    /**
     * Make a POST request
     */
    async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.post(url, data);
            return this.extractResponse<T>(response);
        } catch (error: any) {
            if (error.response) {
                throw {
                    response: {
                        status: error.response.status,
                        data: error.response.data
                    }
                };
            }
            throw error;
        }
    }

    /**
     * Make a PATCH request
     */
    async patch<T>(url: string, data: any): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.patch(url, data);
            return this.extractResponse<T>(response);
        } catch (error: any) {
            if (error.response) {
                throw {
                    response: {
                        status: error.response.status,
                        data: error.response.data
                    }
                };
            }
            throw error;
        }
    }

    /**
     * Make a PUT request
     */
    async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.put(url, data);
            return this.extractResponse<T>(response);
        } catch (error: any) {
            if (error.response) {
                throw {
                    response: {
                        status: error.response.status,
                        data: error.response.data
                    }
                };
            }
            throw error;
        }
    }

    /**
     * Make a DELETE request
     */
    async delete<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.delete(url);
            return this.extractResponse<T>(response);
        } catch (error: any) {
            if (error.response) {
                throw {
                    response: {
                        status: error.response.status,
                        data: error.response.data
                    }
                };
            }
            throw error;
        }
    }
}
