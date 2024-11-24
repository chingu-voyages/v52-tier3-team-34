# Test Utilities Documentation

## Overview
This document describes the test utilities available in the Live Music Finder API test framework.

## Test Assertions (`testAssertions.ts`)

### TestAssertions Class
Static class providing common assertions for API responses.

#### Methods

##### `assertSuccessResponse<T>`
Validates basic success response structure.

```typescript
TestAssertions.assertSuccessResponse(response, expectedStatus = 200)
```

**Parameters:**
- `response`: TestResponse<T> - The response to validate
- `expectedStatus`: number (optional) - Expected HTTP status code, defaults to 200

**Example:**
```typescript
const response = await api.get<User>('/users/1');
TestAssertions.assertSuccessResponse(response);
```

##### `assertResponseData<T>`
Validates response data against expected structure.

```typescript
TestAssertions.assertResponseData(response, expectedData)
```

**Parameters:**
- `response`: TestResponse<T> - The response to validate
- `expectedData`: Partial<T> - Expected data structure

**Example:**
```typescript
const response = await api.get<User>('/users/1');
TestAssertions.assertResponseData(response, {
    id: 1,
    name: 'John Doe'
});
```

##### `assertPagination<T>`
Validates pagination metadata in response.

```typescript
TestAssertions.assertPagination(response, expectedPage, expectedLimit)
```

**Parameters:**
- `response`: TestResponse<T> - The response to validate
- `expectedPage`: number - Expected page number
- `expectedLimit`: number - Expected items per page

**Example:**
```typescript
const response = await api.get<User[]>('/users?page=2&limit=10');
TestAssertions.assertPagination(response, 2, 10);
```

##### `assertErrorResponse`
Validates error response structure.

```typescript
TestAssertions.assertErrorResponse(error, expectedStatus, expectedCode)
```

**Parameters:**
- `error`: TestErrorResponse - The error response to validate
- `expectedStatus`: number - Expected HTTP status code
- `expectedCode`: string - Expected error code

**Example:**
```typescript
try {
    await api.get('/users/999');
} catch (error) {
    TestAssertions.assertErrorResponse(error, 404, 'NOT_FOUND');
}
```

### ResponseValidator Class
Static class providing type-safe response validation.

#### Methods

##### `isValidSuccessResponse<T>`
Type guard for success responses.

```typescript
ResponseValidator.isValidSuccessResponse<T>(response): response is TestResponse<T>
```

**Example:**
```typescript
if (ResponseValidator.isValidSuccessResponse<User>(response)) {
    // TypeScript knows response is TestResponse<User>
    const userData = response.data.data;
}
```

##### `isValidErrorResponse`
Type guard for error responses.

```typescript
ResponseValidator.isValidErrorResponse(response): response is TestErrorResponse
```

**Example:**
```typescript
if (ResponseValidator.isValidErrorResponse(error)) {
    // TypeScript knows error is TestErrorResponse
    const errorCode = error.data.error.code;
}
```

##### `hasValidPagination<T>`
Checks if response has valid pagination metadata.

```typescript
ResponseValidator.hasValidPagination<T>(response): boolean
```

**Example:**
```typescript
const response = await api.get<User[]>('/users');
if (ResponseValidator.hasValidPagination(response)) {
    const { page, limit } = response.data.meta.pagination;
}
```

## Best Practices

1. **Use Type Guards**
   - Always use type guards before accessing response properties
   - Let TypeScript help catch type errors early

2. **Assertion Composition**
   - Combine assertions for complex validations
   - Create custom assertions for domain-specific checks

3. **Error Handling**
   - Use try/catch with error assertions
   - Validate both HTTP and API error details

4. **Pagination**
   - Always validate pagination metadata when expected
   - Check both structure and values
