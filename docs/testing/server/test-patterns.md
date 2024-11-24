# Test Patterns and Type System

## Response Type Hierarchy

### 1. Base API Response Types
```typescript
// Base success response wrapper
interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    meta?: {
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
        filters?: Record<string, any>;
        sort?: {
            field: string;
            direction: 'asc' | 'desc';
        };
    };
    timestamp: string;
}

// Base error response
interface ApiErrorResponse {
    status: 'error';
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
}
```

### 2. Test Response Wrappers
```typescript
// Success response in tests
interface TestResponse<T> {
    status: number;          // HTTP status code
    data: ApiResponse<T>;    // API response with data
}

// Error response in tests
interface TestErrorResponse {
    status: number;          // HTTP status code
    data: ApiErrorResponse;  // API error details
}
```

### 3. Helper Types
```typescript
// Extract data type from API response
type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : T;

// Extract error details from error response
type UnwrapApiError = ApiErrorResponse['error'];
```

## Usage Patterns

### 1. Success Response Pattern
```typescript
// Define your domain type
interface User {
    id: number;
    email: string;
    name: string;
}

// Test successful response
it('should return user data', async () => {
    const response = await api.get<User>('/users/1');
    
    // Test HTTP layer
    expect(response.status).toBe(200);
    
    // Test API response structure
    expect(response.data.status).toBe('success');
    expect(response.data.data).toMatchObject({
        id: expect.any(Number),
        email: expect.any(String),
        name: expect.any(String)
    });
});
```

### 2. Error Response Pattern
```typescript
// Test error response
it('should handle not found error', async () => {
    await expect(api.get('/users/999')).rejects.toMatchObject({
        status: 404,
        data: {
            status: 'error',
            error: {
                code: 'NOT_FOUND',
                message: expect.any(String)
            }
        }
    });
});
```

### 3. Pagination Pattern
```typescript
// Test paginated response
it('should return paginated results', async () => {
    const response = await api.get<User[]>('/users?page=1&limit=10');
    
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('success');
    expect(response.data.meta?.pagination).toMatchObject({
        page: 1,
        limit: 10,
        total: expect.any(Number),
        totalPages: expect.any(Number),
        hasNext: expect.any(Boolean),
        hasPrevious: expect.any(Boolean)
    });
});
```

## Best Practices

1. **Type Safety**
   - Always use generic types with API calls
   - Use type assertions sparingly
   - Let TypeScript infer types when possible

2. **Response Checking**
   - Always check HTTP status code first
   - Then verify API response status
   - Finally check actual data structure

3. **Error Handling**
   - Use try/catch or expect().rejects for error cases
   - Verify both HTTP and API error details
   - Check specific error codes and messages

4. **Pagination Handling**
   - Always verify pagination metadata structure
   - Check page boundaries
   - Verify navigation flags (hasNext, hasPrevious)
