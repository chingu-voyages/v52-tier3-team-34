import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Valid environment types
 */
export type Environment = 'development' | 'staging' | 'production';

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
 * @throws {Error} If environment is not valid
 */
function validateEnvironment(env: string): Environment {
    const validEnvironments: Environment[] = ['development', 'staging', 'production'];
    
    if (validEnvironments.includes(env as Environment)) {
        return env as Environment;
    }

    throw new Error(
        `Invalid environment: ${env}\n` +
        `Valid environments are: ${validEnvironments.join(', ')}`
    );
}
