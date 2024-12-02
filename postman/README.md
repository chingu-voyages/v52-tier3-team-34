# API Testing with Postman

This directory contains Postman collections and environments for testing the V52 Tier3 Team 34 Live Music Finder API. The collection is designed to align with our [official API documentation](../docs/API_DOCUMENTATION.md).

## Files Structure

```
postman/
├── main.postman_collection.json           # Parent collection referencing all modules
├── users.postman_collection.json          # User-related endpoints
├── venues.postman_collection.json         # Venue-related endpoints
├── events.postman_collection.json         # Event-related endpoints
├── local.postman_environment.json         # Local environment variables
├── production.postman_environment.json    # Production environment variables
└── README.md                             # This file
```

## Getting Started

1. Install [Postman](https://www.postman.com/downloads/)
2. Import the collection file: `main.postman_collection.json`
3. Import both environment files:
   - `local.postman_environment.json` for local testing
   - `production.postman_environment.json` for production testing
4. Select the appropriate environment in Postman (top-right corner)

## Environment Setup

The API can be tested in two environments:

### 1. Local Environment
- Base URL: `http://localhost:3000/api/v1`
- For local development and testing
- Requires running the API server locally
- File: `local.postman_environment.json`

### 2. Production Environment
- Base URL: `https://v52-tier3-team-34.onrender.com/api/v1`
- For testing the deployed API
- File: `production.postman_environment.json`

## Environment Variables

Both environments include these variables:
- `baseUrl`: The base URL for the API
- `userId`: Default user ID for testing (1)
- `venueId`: Default venue ID for testing (1)
- `eventId`: Default event ID for testing (1)
- `apiVersion`: API version (v1)

## Cross-Cutting Concerns

### Request/Response Format
All endpoints follow these conventions:

1. **Success Response Format**
```json
{
  "status": "success",
  "data": {
    // Response data here
  },
  "meta": {
    // Metadata like pagination
  }
}
```

2. **Error Response Format**
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

### Common Query Parameters
Available on all GET list endpoints:

1. **Pagination**
```
?page=1&limit=10
?page=2&limit=20
?page=1&limit=50
```

2. **Sorting**
```
# Single field sorting
?sort=name:asc
?sort=createdAt:desc
?sort=startDate:asc

# Multiple field sorting
?sort=status:asc,createdAt:desc
?sort=name:asc,id:desc
```

3. **Field Selection**
```
# Basic fields
?fields=id,name,email

# Nested fields
?fields=id,name,contact.phone,coordinates

# Combined with includes
?fields=id,name,venues.name,venues.address
```

4. **Include Related Resources**
```
# Single include
?include=venues
?include=events
?include=user

# Multiple includes
?include=venues,events
?include=venue,user
```

### URL Parameter Examples

#### Users API Examples

1. **List Users with Various Filters**
```
# Paginated list with includes
GET /users?page=1&limit=10&include=venues

# Sorted list with specific fields
GET /users?sort=name:asc&fields=id,name,email

# Combined parameters
GET /users?page=1&limit=20&sort=createdAt:desc&fields=id,name&include=venues

# Complex query
GET /users?page=1&limit=10&sort=name:asc,createdAt:desc&fields=id,name,email&include=venues
```

2. **Get User with Different Includes**
```
# Get user with venues
GET /users/1?include=venues

# Get user with specific venue fields
GET /users/1?include=venues&fields=id,name,venues.name,venues.address
```

#### Venues API Examples

1. **List Venues with Filters**
```
# Basic pagination
GET /venues?page=1&limit=10

# Include related data
GET /venues?include=events,user

# Sort by multiple fields
GET /venues?sort=name:asc,createdAt:desc

# Filter specific fields with includes
GET /venues?fields=id,name,address&include=events&page=1&limit=20

# Complex query
GET /venues?page=1&limit=10&sort=name:asc&fields=id,name,address,contact&include=events,user
```

2. **Get Venue with Various Options**
```
# Get venue with events
GET /venues/1?include=events

# Get venue with events and user
GET /venues/1?include=events,user

# Get venue with specific fields and includes
GET /venues/1?fields=id,name,address,events.title&include=events
```

#### Events API Examples

1. **List Events with Filters**
```
# Filter by status
GET /events?status=published

# Filter by status with pagination
GET /events?status=published&page=1&limit=20

# Sort by date with venue include
GET /events?sort=startDate:asc&include=venue

# Complex filtering
GET /events?status=published&sort=startDate:asc&include=venue&fields=id,title,startDate,venue.name

# Advanced query
GET /events?page=1&limit=10&status=published&sort=startDate:asc,title:asc&fields=id,title,startDate&include=venue
```

2. **Get Event with Options**
```
# Get event with venue
GET /events/1?include=venue

# Get specific event fields
GET /events/1?fields=id,title,description,startDate,venue.name&include=venue
```

### Common Combined Examples

1. **Venue Events List**
```
# Get venue with upcoming events
GET /venues/1?include=events&sort=events.startDate:asc

# Get venue with published events
GET /venues/1?include=events&fields=id,name,events.title,events.startDate&sort=events.startDate:asc
```

2. **User Venues with Events**
```
# Get user with venues and their events
GET /users/1?include=venues.events

# Get user with venues and published events
GET /users/1?include=venues.events&fields=id,name,venues.name,venues.events.title
```

3. **Complex Queries**
```
# Paginated venues with events and user info
GET /venues?page=1&limit=10&include=events,user&fields=id,name,events.title,user.name&sort=name:asc

# Events with venue and sorting
GET /events?status=published&include=venue&fields=id,title,startDate,venue.name&sort=startDate:asc&page=1&limit=20
```

### Common HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Available Endpoints

### 1. Health Check

#### GET /health
Check API health status.

**Response Example:**
```json
{
  "status": "success",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Users API

#### GET /users
List all users.

**Query Parameters:**
- `include`: Related resources to include (venues)
- `page`, `limit`: Pagination
- `sort`: Sort field and direction
- `fields`: Field selection

**Response Example:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "profileImage": "https://example.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
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
Get user by ID.

**Query Parameters:**
- `include`: Related resources to include (venues)

**Response:** Same as list but single object.

#### POST /users
Create new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "profileImage": "https://example.com/image.jpg"
}
```

**Response:** Returns created user with 201 status.

#### PATCH /users/:id
Update user fields.

**Request Body:**
```json
{
  "name": "Updated Name"
}
```

**Response:** Returns updated user.

#### PUT /users/:id
Replace entire user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "profileImage": "https://example.com/image.jpg"
}
```

**Response:** Returns replaced user.

#### DELETE /users/:id
Delete user.

**Response:** 200 status with success message.

### 3. Venues API

#### GET /venues
List all venues.

**Query Parameters:**
- `include`: Related resources (events, user)
- `page`, `limit`: Pagination
- `sort`: Sort field and direction
- `fields`: Field selection

**Response Example:**
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
Get venue by ID.

**Query Parameters:**
- `include`: Related resources (events, user)

**Response:** Same as list but single object.

#### POST /venues
Create new venue.

**Request Body:**
```json
{
  "name": "Venue Name",
  "description": "Venue Description",
  "address": "123 Main St",
  "contact": {
    "phone": "123-456-7890"
  },
  "coordinates": {
    "lat": 40.7128,
    "lng": -74.0060
  }
}
```

**Response:** Returns created venue with 201 status.

#### PATCH /venues/:id
Update venue fields.

**Request Body:**
```json
{
  "name": "Updated Venue Name",
  "contact": {
    "phone": "987-654-3210"
  }
}
```

**Response:** Returns updated venue.

#### PUT /venues/:id
Replace entire venue.

**Request Body:** Same as POST.

**Response:** Returns replaced venue.

#### DELETE /venues/:id
Delete venue.

**Response:** 200 status with success message.

### 4. Events API

#### GET /events
List all events.

**Query Parameters:**
- `include`: Related resources (venue)
- `page`, `limit`: Pagination
- `sort`: Sort field and direction
- `fields`: Field selection
- `status`: Filter by status (draft, published, cancelled)

**Response Example:**
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
      "status": "published"
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

#### GET /events/:id
Get event by ID.

**Query Parameters:**
- `include`: Related resources (venue)

**Response:** Same as list but single object.

#### POST /events
Create new event.

**Request Body:**
```json
{
  "title": "Event Title",
  "description": "Event Description",
  "startDate": "2024-12-01T19:00:00.000Z",
  "endDate": "2024-12-01T23:00:00.000Z",
  "status": "draft",
  "venueId": 1
}
```

**Response:** Returns created event with 201 status.

#### PATCH /events/:id
Update event fields.

**Request Body:**
```json
{
  "title": "Updated Event Title",
  "status": "published"
}
```

**Response:** Returns updated event.

#### PUT /events/:id
Replace entire event.

**Request Body:** Same as POST.

**Response:** Returns replaced event.

#### DELETE /events/:id
Delete event.

**Response:** 200 status with success message.

## Testing Tips

1. **Environment Selection**
   - Always verify the correct environment is selected before testing
   - Check the environment indicator in Postman's top-right corner

2. **Request Flow Testing**
   Recommended testing sequence:
   1. Create a new resource (POST)
   2. Retrieve it (GET)
   3. Update it (PATCH/PUT)
   4. Delete it (DELETE)
   5. Verify deletion (GET)

3. **Include Parameter Testing**
   - Test endpoints with and without includes
   - Verify nested resource data is correct

4. **Pagination Testing**
   - Test different page sizes
   - Verify total counts and pagination metadata
   - Test edge cases (page=0, negative limits)

## Common Issues and Solutions

1. **Cannot connect to server**
   - Verify the API server is running (for local environment)
   - Check your internet connection
   - Verify the environment URL is correct

2. **Authentication Issues**
   - Authentication will be implemented in future versions
   - Currently, all endpoints are publicly accessible

3. **Invalid Includes**
   - Check the API documentation for valid include parameters
   - Verify the spelling of included resources

## Additional Resources

- [Official API Documentation](../docs/API_DOCUMENTATION.md)
- [Postman Learning Center](https://learning.postman.com/docs/getting-started/introduction/)
