// Set default environment if not specified
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Increase timeout for all tests
jest.setTimeout(10000);

// Add custom matchers if needed
expect.extend({
    // Add custom matchers here
});

// Log test environment information
beforeAll(() => {
    console.log('Test Environment:', process.env.NODE_ENV);
    console.log('API URL:', process.env.API_URL || 'http://localhost:3000/api');
});
