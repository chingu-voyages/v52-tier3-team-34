import dotenv from 'dotenv';
import { getCurrentEnvironment } from './utils/environment';

// Load environment variables
dotenv.config();

/**
 * Environment-specific configuration type
 */
export type EnvironmentConfig = {
    api: {
        baseUrl: string;
        endpoints: {
            venues: string;
            events: string;
            eventsGeoJSON: string;
            health: string;  // Health check endpoint
            users: string;   // Users endpoint
        };
    };
    timeouts: {
        default: number;
        long: number;
    };
};

/**
 * Default configuration values
 */
const defaultConfig: EnvironmentConfig = {
    api: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        endpoints: {
            venues: '/api/v1/venues',
            events: '/api/v1/events',
            eventsGeoJSON: '/api/v1/events/geojson',
            health: '/api/v1/health',
            users: '/api/v1/users'
        }
    },
    timeouts: {
        default: 5000,
        long: 15000
    }
};

/**
 * Environment-specific configurations
 */
const environmentConfigs: Record<string, Partial<EnvironmentConfig>> = {
    development: defaultConfig,
    staging: {
        api: {
            baseUrl: process.env.API_URL || defaultConfig.api.baseUrl,
            endpoints: defaultConfig.api.endpoints
        }
    },
    production: {
        api: {
            baseUrl: process.env.API_URL || defaultConfig.api.baseUrl,
            endpoints: defaultConfig.api.endpoints
        },
        timeouts: {
            default: 10000,
            long: 60000
        }
    }
};

/**
 * Get configuration for current environment
 * @returns {EnvironmentConfig} Configuration for current environment
 */
function getEnvironmentConfig(): EnvironmentConfig {
    const env = getCurrentEnvironment();
    const envConfig = environmentConfigs[env] || defaultConfig;
    
    return {
        ...defaultConfig,
        ...envConfig,
        api: {
            ...defaultConfig.api,
            ...envConfig.api,
            baseUrl: process.env.API_URL || envConfig.api?.baseUrl || defaultConfig.api.baseUrl
        }
    };
}

export const config = getEnvironmentConfig();
