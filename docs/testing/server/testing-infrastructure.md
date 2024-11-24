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
    data: ApiResponse<T>;    // API response
}

interface TestErrorResponse {
    status: number;
    data: ApiErrorResponse;
}
```

### 2. API Client (`/server/tests/utils/apiClient.ts`)
- Type-safe HTTP requests using Axios
- Automatic response transformation
- Error handling with type safety
- Environment-aware configuration

### 3. Response Transformer (`/server/tests/utils/responseTransformer.ts`)
- Separates HTTP and API concerns
- Standardizes error handling
- Maintains type safety
- Handles pagination metadata

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
