import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Valid environment types
 */
export type Environment = 'development' | 'staging' | 'production';

/**
 * Get the API base URL from environment or default
 * @returns {string} API base URL
 */
export const getApiBaseUrl = (): string => {
    const defaultUrl = 'http://localhost:3000/api';
    return process.env.API_URL || defaultUrl;
};

/**
 * Get the current environment
 * @returns {Environment} Current environment or 'development' as default
 */
export const getCurrentEnvironment = (): Environment => {
    const defaultEnv: Environment = 'development';
    const env = process.env.NODE_ENV?.toLowerCase().trim() || defaultEnv;
    return validateEnvironment(env);
};

/**
 * Validate if the environment is one of the allowed types
 * @param {string} env Environment to validate
 * @returns {Environment} Validated environment
 * @throws {Error} If environment is invalid
 */
export const validateEnvironment = (env: string): Environment => {
    const validEnvironments: Environment[] = ['development', 'staging', 'production'];
    const normalizedEnv = env?.toLowerCase().trim() || 'development';
    
    if (!validEnvironments.includes(normalizedEnv as Environment)) {
        throw new Error(
            `Invalid environment: ${env}. Must be one of: ${validEnvironments.join(', ')}`
        );
    }
    
    return normalizedEnv as Environment;
};
