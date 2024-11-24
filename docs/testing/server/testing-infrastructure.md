# Server Testing Infrastructure

## Overview
Documentation of the testing infrastructure for the Live Music Finder backend API.

## Core Components

### 1. Response Types (`/server/tests/types/`)
#### API Response Types (`api.ts`)
```typescript
interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    meta?: {
        pagination?: {...};
        filters?: Record<string, any>;
        sort?: {...};
    };
    timestamp: string;
}

interface ApiErrorResponse {
    status: 'error';
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
}
```

#### Test Response Types (`test.ts`)
```typescript
interface TestResponse<T> {
    status: number;          // HTTP status code
    headers: {              // Response headers
        [key: string]: string | string[] | undefined;
    };
    data: ApiResponse<T>;    // API response
}

interface TestErrorResponse {
    status: number;
    headers: {              // Response headers
        [key: string]: string | string[] | undefined;
    };
    data: ApiErrorResponse;
}
```

### 2. Response Transformation (`/server/tests/utils/responseTransformer.ts`)
- Type-safe response transformation
- Consistent header handling
- Timestamp normalization
- Error response standardization
- Proper type guards and null checks

### 3. API Client (`/server/tests/utils/apiClient.ts`)
- Type-safe HTTP requests using Axios
- Automatic response transformation
- Error handling with type safety
- Environment-aware configuration

### 4. Test Configuration (`/server/tests/config.ts`)
- Environment-specific settings
- API endpoint configuration
- Timeout settings
- Test data paths

## Test Organization
### Location: `/server/tests/api/`
- Health endpoint tests
- User API tests
- Venue API tests
- Event API tests

### Test Structure
Each test suite follows:
1. Import required utilities and types
2. Define test-specific interfaces
3. Create API client instance
4. Group tests by endpoint functionality
5. Test both success and error cases

## Test Infrastructure Overview

### Response Types

Our test framework uses a layered response type system:

#### TestResponse<T>
Base response wrapper that includes:
- HTTP status code
- Response headers (for validating content-type, security headers, etc.)
- API response data

#### ApiResponse<T>
API-specific response wrapper containing:
- Response status ('success' | 'error')
- Actual response data
- Metadata (pagination, timestamps, etc.)

### Response Validation

#### Basic Validation
- Status code checks
- Response body structure
- Type safety

#### Header Validation
- Content-type verification
- Security headers
- Cache control
- Custom headers

### Test Utilities

#### Response Assertions
- Status code validation
- Data structure validation
- Header validation
- Error response validation

#### Data Factories
- User data generation
- Venue data generation
- Event data generation

## Directory Structure

```
server/tests/
├── api/              # API endpoint tests
├── types/           
│   ├── api.ts       # API type definitions
│   └── test.ts      # Test framework types
└── utils/
    ├── apiClient.ts           # HTTP client wrapper
    ├── responseTransformer.ts # Response transformation
    ├── testAssertions.ts     # Test assertion utilities
    └── testDataFactory.ts    # Test data generation
```

## Test Flow

1. Test makes request via ApiClient
2. Response is transformed via ResponseTransformer
3. Headers and status are validated
4. Response body is validated
5. Additional assertions are performed

## Common Patterns

### Response Validation
```typescript
const response = await api.get<UserResponse>('/users/1');

// Validate HTTP layer
expect(response.status).toBe(200);
expect(response.headers['content-type']).toMatch(/application\/json/);

// Validate API response
expect(response.data.status).toBe('success');
expect(response.data.data).toMatchObject({
  id: 1,
  name: 'Test User'
});
```

### Error Handling
```typescript
await expect(api.get('/invalid')).rejects.toMatchObject({
  status: 404,
  headers: {
    'content-type': expect.stringMatching(/application\/json/)
  },
  data: {
    status: 'error',
    error: {
      code: 'NOT_FOUND'
    }
  }
});
```

## Health Endpoint Tests

The health endpoint serves as a basic infrastructure test to verify API availability. Its tests are located in:
- `server/tests/api/health.test.ts`

### Response Format

1. Success Response:
```typescript
{
  status: 'success',
  timestamp: string  // ISO 8601 format
}
```

2. Error Response:
```typescript
{
  status: 'error',
  error: {
    code: 'ERR_BAD_REQUEST',
    message: string
  }
}
```

### Test Coverage
- Basic health check (GET request)
- Method validation (non-GET requests)
- Response format validation
- Content-Type header validation

## Current Status
### Implemented
- [x] Test infrastructure setup
- [x] Response type system
- [x] API client implementation
- [x] Health endpoint tests

### In Progress
- [ ] User API tests
- [ ] Venue API tests
- [ ] Event API tests
- [ ] Integration tests

## Next Steps
See the Test Framework Roadmap for detailed next steps and improvements.

## Future Improvements

1. Response schema validation
2. Automated header security checks
3. Performance metric collection
4. Test data cleanup utilities

## Usage Examples
### Basic Test Structure
```typescript
describe('API Endpoint', () => {
    it('should handle successful request', async () => {
        const response = await api.get<ResponseType>(endpoint);
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('success');
    });
});
```
