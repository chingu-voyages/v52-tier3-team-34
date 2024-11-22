# Live Music Finder API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Authentication details will be added in future versions.

## Common Parameters

### Include Parameter
The `include` parameter allows you to include related resources in the response. It's available on specific endpoints and accepts a comma-separated list of relationships.

Example:
```
GET /venues/1?include=events,user
```

### Pagination
List endpoints support pagination using the following query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Example:
```
GET /venues?page=1&limit=20
```

## Endpoints

### Users API

#### GET /users
List all users with optional filtering and includes.

**Query Parameters:**
- `include`: Related resources to include
  - Available includes: `venues`
- `page`: Page number
- `limit`: Items per page
- `sort`: Sort field and direction (e.g., `name:asc`)
- `fields`: Comma-separated list of fields to return

**Example Response with Venues Include:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "profileImage": "https://example.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "venues": [
        {
          "id": 1,
          "name": "Venue Name",
          "description": "Venue Description",
          // ... other venue fields
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

#### GET /users/:id
Get a single user by ID with optional includes.

**Query Parameters:**
- `include`: Related resources to include
  - Available includes: `venues`

**Example Response with Venues Include:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "profileImage": "https://example.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "venues": [
      {
        "id": 1,
        "name": "Venue Name",
        "description": "Venue Description",
        // ... other venue fields
      }
    ]
  }
}
```

### Venues API

#### GET /venues
List all venues with optional filtering and includes.

**Query Parameters:**
- `include`: Related resources to include
  - Available includes: `events`, `user`
- `page`: Page number
- `limit`: Items per page
- `sort`: Sort field and direction (e.g., `name:asc`)
- `fields`: Comma-separated list of fields to return

**Example Response with Events and User Include:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Venue Name",
      "description": "Venue Description",
      "address": "123 Main St",
      "contact": {
        "phone": "123-456-7890"
      },
      "coordinates": {
        "lat": 40.7128,
        "lng": -74.0060
      },
      "events": [
        {
          "id": 1,
          "title": "Event Title",
          "description": "Event Description",
          "startDate": "2024-12-01T19:00:00.000Z",
          // ... other event fields
        }
      ],
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "profileImage": "https://example.com/image.jpg",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

#### GET /venues/:id
Get a single venue by ID with optional includes.

**Query Parameters:**
- `include`: Related resources to include
  - Available includes: `events`, `user`

**Example Response with Events and User Include:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Venue Name",
    "description": "Venue Description",
    "address": "123 Main St",
    "contact": {
      "phone": "123-456-7890"
    },
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    },
    "events": [
      {
        "id": 1,
        "title": "Event Title",
        "description": "Event Description",
        "startDate": "2024-12-01T19:00:00.000Z",
        // ... other event fields
      }
    ],
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "profileImage": "https://example.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Events API

#### GET /events
List all events with optional filtering and includes.

**Query Parameters:**
- `include`: Related resources to include
  - Available includes: `venue`
- `page`: Page number
- `limit`: Items per page
- `sort`: Sort field and direction (e.g., `startDate:asc`)
- `fields`: Comma-separated list of fields to return
- `status`: Filter by status (`draft`, `published`, `cancelled`)

**Example Response with Venue Include:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Event Title",
      "description": "Event Description",
      "startDate": "2024-12-01T19:00:00.000Z",
      "endDate": "2024-12-01T23:00:00.000Z",
      "status": "published",
      "venue": {
        "id": 1,
        "name": "Venue Name",
        "description": "Venue Description",
        // ... other venue fields
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      // Additional error context
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Common error codes:
- `RESOURCE_NOT_FOUND`: The requested resource was not found
- `INVALID_REQUEST`: The request parameters were invalid
- `VALIDATION_ERROR`: The request data failed validation

## Rate Limiting
Rate limiting details will be added in future versions.

## Changelog

### 2024-11-22
- Added support for includes in single-resource endpoints:
  - GET /users/:id now supports `venues` include
  - GET /venues/:id now supports `events` and `user` includes
- Updated documentation to reflect include capabilities
