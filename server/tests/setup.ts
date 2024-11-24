// Set default environment if not specified
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { getCurrentEnvironment } from './utils/environment';
import { config } from './config';

// Increase timeout for all tests
jest.setTimeout(30000); // Increased timeout to allow for server startup

// Add custom matchers if needed
expect.extend({
    // Add custom matchers here
});

// Log test environment information
beforeAll(async () => {
    console.log('Test Environment:', getCurrentEnvironment());
    console.log('API URL:', config.api.baseUrl);
});
