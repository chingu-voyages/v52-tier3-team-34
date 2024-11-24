# API Standards Documentation

## Overview

This document defines the standard patterns and conventions for our REST API. All resources must follow these standards to ensure consistency across the API.

## URL Structure

### Versioning
All endpoints must include version prefix:
```
/api/v1/[resource]
```

### Resource Endpoints
- List: `GET /api/v1/[resource]`
- Single: `GET /api/v1/[resource]/:id`
- Create: `POST /api/v1/[resource]`
- Update: `PATCH /api/v1/[resource]/:id`
- Replace: `PUT /api/v1/[resource]/:id`
- Delete: `DELETE /api/v1/[resource]/:id`

### Authentication Endpoints
Authentication endpoints follow a separate structure:
```
POST /api/v1/auth/[provider]           # Initiate auth flow
GET  /api/v1/auth/[provider]/callback  # OAuth callback
```

Example for Google OAuth:
```
POST /api/v1/auth/google
GET  /api/v1/auth/google/callback
```

## Response Structure

### Standard Success Response
```typescript
{
  status: 'success',
  data: T,                    // Direct resource (T[] for lists, T for single)
  meta?: {                    // Optional metadata
    pagination?: {
      page: number,          // Current page number
      limit: number,         // Items per page
      total: number,         // Total items available
      totalPages: number,    // Total number of pages
      hasNext: boolean,      // More pages after this one?
      hasPrevious: boolean   // Pages before this one?
    },
    filters?: Record<string, any>,  // Applied filters
    sort?: {
      field: string,         // Field being sorted
      direction: 'asc' | 'desc'  // Sort direction
    },
    fields?: string[],       // Fields selected
    includes?: string[]      // Relationships included
  },
  timestamp: string          // ISO 8601 format
}
```

### Standard Error Response
```typescript
{
  status: 'error',
  error: {
    code: string,        // e.g., 'RESOURCE_NOT_FOUND'
    message: string,     // User-friendly message
    details?: any        // Additional error context
  },
  timestamp: string      // ISO 8601 format
}
```

## Query Parameters

All query parameters are optional. When omitted, default behaviors are applied.

### Parameter Formats

#### Pagination
```
?page=1&limit=20
```

#### Filtering
```
?filter[status]=active&filter[type]=concert
```

#### Sorting
```
?sort=name:asc
```

#### Field Selection
```
?fields=id,name,description
```

#### Includes/Expansions
```
?include=venue,organizer
```

### Default Behaviors

#### Pagination
- Default page: 1
- Default limit: 10
- Example: `?page=1&limit=20`

#### Field Selection
- When `fields` parameter is omitted, returns all default fields for the resource
- Example: `?fields=id,name,description`

#### Includes/Expansions
- When `include` parameter is omitted, no relationships are expanded
- Can be used together with field selection
- Example: `?include=related1,related2&fields=id,name`

#### Sorting
- When `sort` parameter is omitted, uses resource's default sorting
- Format: `field:direction` (e.g., `name:asc`)
- Example: `?sort=createdAt:desc`

#### Filtering
- When `filter` parameter is omitted, no filters are applied
- Format: `filter[field]=value`
- Example: `?filter[status]=active&filter[type]=featured`

### Combining Parameters

All query parameters can be combined to create complex queries:

```
/api/v1/events?fields=id,name&include=venue&sort=date:desc&filter[type]=concert&page=1&limit=10
```

## HTTP Status Codes

### Success Codes
- `200 OK`: Successful request
- `201 Created`: Resource successfully created
- `204 No Content`: Successful request with no response body (e.g., DELETE)

### Client Error Codes
- `400 Bad Request`: Invalid request format or parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded

### Server Error Codes
- `500 Internal Server Error`: Unexpected server error
- `503 Service Unavailable`: Service temporarily unavailable

## Error Handling Strategy

### Error Response Structure
All error responses follow the standard error response format with additional context based on the error type.

### Error Code Pattern
Error codes follow the pattern: `RESOURCE_ACTION_ERROR`
- `RESOURCE`: The type of resource (e.g., USER, EVENT, VENUE)
- `ACTION`: The operation being performed (e.g., CREATE, UPDATE, DELETE)
- `ERROR`: The type of error (e.g., NOT_FOUND, INVALID_INPUT)

Examples:
- `USER_NOT_FOUND`: User resource doesn't exist
- `EVENT_CREATE_ERROR`: Failed to create event
- `VENUE_UPDATE_ERROR`: Failed to update venue

### Error Handling Layers

#### 1. Request Validation (400)
The first layer of error handling occurs in the validation middleware:
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "sortDir",
      "error": "Must be one of: asc, desc"
    }
  }
}
```

#### 2. Resource Operations (400/404)
The second layer handles expected errors in resource operations:
```json
{
  "status": "error",
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "Event with ID 123 not found",
    "details": { "id": "123" }
  }
}
```

#### 3. Server Errors (500)
The final layer catches unexpected errors through global error handling:
```json
{
  "status": "error",
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

### Error Handling Decision Flow
1. Is it a validation error? → 400 Bad Request
2. Is the resource not found? → 404 Not Found
3. Is it a known operation error? → 400 Bad Request
4. Otherwise → 500 Internal Server Error

### Common Error Scenarios

#### List Operations
- Invalid query parameters → 400
- Invalid sort direction → 400
- Invalid filter values → 400

#### Single Resource Operations
- Resource not found → 404
- Invalid resource ID → 400
- Validation failure → 400

#### Create/Update Operations
- Invalid input data → 400
- Validation failure → 400
- Resource not found (update) → 404

#### Delete Operations
- Resource not found → 404
- Resource in use → 400

## Rate Limiting

To ensure fair usage and protect our API, rate limiting will be implemented:

### Headers
The following headers will be included in all responses:
```
X-RateLimit-Limit: 100         # Requests allowed per window
X-RateLimit-Remaining: 99      # Requests remaining in current window
X-RateLimit-Reset: 1640995200  # Unix timestamp when the limit resets
```

### Limits
- Default: 100 requests per minute per API key
- Bulk endpoints: 20 requests per minute per API key

### When Limited
If you exceed the rate limit, you'll receive:
- Status code: `429 Too Many Requests`
- Error response with retry guidance
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 30 seconds.",
    "details": {
      "retryAfter": 30,
      "limit": 100,
      "windowSize": "1 minute"
    }
  },
  "timestamp": "2024-01-20T12:00:00Z"
}
```

## Implementation Phases

### Phase 1: Base Response Structure 
- [x] Direct resource access in data field
- [x] Consistent success/error responses
- [x] Timestamp field
- [x] Versioned endpoints  (Completed Nov 2024)

### Phase 2: Metadata & Pagination 
- [x] Pagination metadata
- [x] Filter metadata
- [x] Sort metadata
- [x] Field selection
- [x] Relationship expansion

### Phase 3: Advanced Features 
- [ ] Advanced filtering
- [ ] Multi-field sorting
- [ ] Nested includes
- [ ] Field validation
- [ ] Rate limiting

### Phase 4: Performance & Security 
- [ ] Caching (ETag)
- [ ] CORS configuration
- [ ] Advanced error tracking
- [ ] API metrics

## Examples

### List Request with All Parameters
```http
GET /api/v1/events?fields=id,name,date&include=venue,organizer&sort=date:desc&filter[type]=concert&page=2&limit=20
```

### Success Response (List)
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Summer Concert",
      "date": "2024-07-15T19:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 2,
      "limit": 20,
      "total": 50,
      "totalPages": 3,
      "hasNext": true,
      "hasPrevious": true
    },
    "filters": {
      "type": "concert"
    },
    "sort": {
      "field": "date",
      "direction": "desc"
    },
    "fields": ["id", "name", "date"],
    "includes": ["venue", "organizer"]
  },
  "timestamp": "2024-01-20T12:00:00Z"
}
```

### Error Response Example
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_QUERY_PARAMETER",
    "message": "Invalid sort direction. Must be 'asc' or 'desc'",
    "details": {
      "parameter": "sort",
      "value": "date:invalid",
      "allowedValues": ["asc", "desc"]
    }
  },
  "timestamp": "2024-01-20T12:00:00Z"
}
