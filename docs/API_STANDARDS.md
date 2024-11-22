# API Standards Documentation

## Response Structure

### Standard Response Format
```typescript
{
  status: 'success' | 'error',
  data: T,                    // Direct resource (T[] for lists, T for single)
  meta?: {                    // Optional metadata
    pagination?: {
      page: number,
      limit: number,
      total: number,
      totalPages: number,
      hasNext: boolean,
      hasPrevious: boolean
    },
    filters?: Record<string, any>,  // Applied filters
    sort?: {
      field: string,
      direction: 'asc' | 'desc'
    }
  },
  timestamp: string           // ISO 8601 format
}
```

### Error Response Format
```typescript
{
  status: 'error',
  error: {
    code: string,        // e.g., 'RESOURCE_NOT_FOUND'
    message: string,     // User-friendly message
    details?: any        // Additional error context
  },
  timestamp: string
}
```

## URL Structure

### Versioning
All endpoints must include version prefix:
```
/api/v1/[resource]
```

## API Endpoints

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

## Query Parameters

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

## Resource Schemas

### User Resource
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  // OAuth-ready fields (optional)
  authProvider?: 'local' | 'google';  // extensible for more providers
  providerId?: string;                // stores OAuth provider IDs
  // ... other user fields
}
```

## Implementation Phases

### Phase 1: Base Response Structure
- [x] Direct resource access in data field
- [x] Consistent success/error responses
- [x] Timestamp field
- [x] Versioned endpoints

### Phase 2: Metadata & Pagination
- [x] Pagination metadata
- [ ] Filter metadata
- [ ] Sort metadata
- [x] OAuth-ready User schema

### Phase 3: Advanced Features
- [ ] Field selection
- [ ] Relationship expansion
- [ ] Advanced filtering
- [ ] Google authentication
- [ ] Multi-environment testing

### Phase 4: Performance & Security
- [ ] Rate limiting headers
- [ ] Caching (ETag)
- [ ] CORS configuration
- [ ] Advanced error tracking

## Benefits
- Alignment with major API providers (GitHub, Stripe, Digital Ocean)
- Resource-agnostic structure
- Clean metadata separation
- Scalable for future additions
- Consistent client experience

## Examples

### Success Response (List)
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Example Resource",
      "description": "Description here"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3,
      "hasNext": true,
      "hasPrevious": false
    }
  },
  "timestamp": "2024-01-20T12:00:00Z"
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {
      "resourceId": "123",
      "resourceType": "event"
    }
  },
  "timestamp": "2024-01-20T12:00:00Z"
}
```

## Current Status
Currently implementing Phase 1, aligning Events and Venues APIs with the standard response structure. Future phases will be implemented incrementally to maintain backward compatibility while improving API consistency.
