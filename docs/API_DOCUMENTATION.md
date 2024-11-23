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

## System Endpoints

### GET /health
Health check endpoint for infrastructure monitoring (load balancers, container orchestrators, etc.).

**Response:**
```json
{
  "status": "up"
}
```

**Notes:**
- Returns HTTP 200 when service is healthy
- Minimal response format optimized for infrastructure tools
- No authentication required

## Resource Endpoints

### Events API

#### GET /events
List all events with optional filtering and includes.

**Query Parameters:**
- `include`: Related resources to include (e.g., venue)
- `page`: Page number
- `limit`: Items per page
- `sort`: Sort field and direction (e.g., `startDate:asc`)
- `fields`: Comma-separated list of fields to return
- `filter`: Additional filters (implementation-specific)

#### GET /events/zone
Find events within a geographic zone.

**Query Parameters:**
- `lat`: Latitude of zone center
- `lng`: Longitude of zone center
- `radius`: Search radius in meters
- `startDate`: Optional filter for events after this date
- `status`: Optional filter by event status

**Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "properties": {
        "id": 1,
        "title": "Event Title",
        "description": "Event Description",
        "startDate": "2024-01-01T00:00:00Z",
        "endDate": "2024-01-02T00:00:00Z",
        "status": "published",
        "venue": {
          "id": 1,
          "name": "Venue Name",
          "address": "Venue Address"
        }
      }
    }
  ],
  "center": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "radius": 1000
}
```

#### GET /events/:id
Get a single event by ID.

**Path Parameters:**
- `id`: Event ID

#### GET /events/:id/geojson
Get event details in GeoJSON format.

**Path Parameters:**
- `id`: Event ID

#### POST /events
Create a new event.

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "startDate": "ISO 8601 datetime",
  "endDate": "ISO 8601 datetime",
  "status": "draft|published|cancelled",
  "venueId": "number"
}
```

#### PATCH /events/:id
Update specific fields of an event.

**Path Parameters:**
- `id`: Event ID

**Request Body:**
Same fields as POST, all optional

#### PUT /events/:id
Replace an entire event.

**Path Parameters:**
- `id`: Event ID

**Request Body:**
Same as POST, all fields required

#### DELETE /events/:id
Delete an event.

**Path Parameters:**
- `id`: Event ID

### Venues API

#### GET /venues
List all venues with optional filtering and includes.

**Query Parameters:**
- `include`: Related resources to include (e.g., events, user)
- `page`: Page number
- `limit`: Items per page
- `sort`: Sort field and direction (e.g., `name:asc`)
- `fields`: Comma-separated list of fields to return

#### GET /venues/:id
Get a single venue by ID.

**Path Parameters:**
- `id`: Venue ID

#### GET /venues/:id/geojson
Get venue details in GeoJSON format.

**Path Parameters:**
- `id`: Venue ID

#### POST /venues
Create a new venue.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "contact": {
    "phone": "string (optional)",
    "email": "string (optional)",
    "website": "string (optional)"
  },
  "images": ["string (URL)"],
  "coordinates": {
    "lat": "number (-90 to 90)",
    "lng": "number (-180 to 180)"
  },
  "userId": "number"
}
```

#### PATCH /venues/:id
Update specific fields of a venue.

**Path Parameters:**
- `id`: Venue ID

**Request Body:**
Same fields as POST, all optional

#### PUT /venues/:id
Replace an entire venue.

**Path Parameters:**
- `id`: Venue ID

**Request Body:**
Same as POST, all fields required

#### DELETE /venues/:id
Delete a venue.

**Path Parameters:**
- `id`: Venue ID

### Users API

#### GET /users
List all users with optional filtering and includes.

**Query Parameters:**
- `include`: Related resources to include (e.g., venues)
- `page`: Page number
- `limit`: Items per page
- `sort`: Sort field and direction (e.g., `name:asc`)
- `fields`: Comma-separated list of fields to return

#### GET /users/:id
Get a single user by ID.

**Path Parameters:**
- `id`: User ID

#### POST /users
Create a new user.

**Request Body:**
```json
{
  "googleId": "string",
  "email": "string",
  "name": "string",
  "picture": "string (URL)"
}
```

#### PATCH /users/:id
Update specific fields of a user.

**Path Parameters:**
- `id`: User ID

**Request Body:**
Same fields as POST, all optional

#### PUT /users/:id
Replace an entire user.

**Path Parameters:**
- `id`: User ID

**Request Body:**
Same as POST, all fields required

#### DELETE /users/:id
Delete a user.

**Path Parameters:**
- `id`: User ID

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {} // Optional additional context
  }
}
```

Common error codes:
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Permission denied
- `INTERNAL_ERROR`: Server error
