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
            // Add more endpoints as needed
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
        baseUrl: 'http://localhost:3000/api',
        endpoints: {
            venues: '/venues'
        }
    },
    timeouts: {
        default: 5000,
        long: 30000
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
