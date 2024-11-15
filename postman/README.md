# API Testing with Postman

This directory contains Postman collections and environments for testing the V52 Tier3 Team 34 API.

## Files Structure

```
postman/
├── v52-tier3-team-34.postman_collection.json  # API endpoints collection
├── local.postman_environment.json             # Local environment variables
├── production.postman_environment.json        # Production environment variables
└── README.md                                  # This file
```

## Environment Setup

The API can be tested in two environments:

### 1. Local Environment

- File: `local.postman_environment.json`
- Base URL: `http://localhost:3000`
- Use for local development and testing

### 2. Production Environment

- File: `production.postman_environment.json`
- Base URL: `https://v52-tier3-team-34.onrender.com`
- Use for testing the deployed API

### Switching Environments

1. In Postman, look for the environment dropdown in the top right corner
2. Select either "Local Environment" or "Production Environment"
3. All requests will automatically use the selected environment's baseUrl

### Environment Variables

Current variables:

- `baseUrl`: Base URL for all API requests
  - Local: `http://localhost:3000`
  - Production: `https://v52-tier3-team-34.onrender.com`

## Setup Instructions

### 1. Install Postman

- Download and install [Postman](https://www.postman.com/downloads/)
- Create a free account if you don't have one

### 2. Import Collection and Environment

#### Method 1: Using Postman UI

1. Open Postman
2. Click "Import" button (top left)
3. Drag and drop both JSON files:
   - `v52-tier3-team-34.postman_collection.json`
   - `local.postman_environment.json`

#### Method 2: Using Files

1. Open Postman
2. Click "Import" button
3. Click "Upload Files"
4. Select both JSON files from the postman directory

### 3. Select Environment

1. Look for the environment dropdown in the top right corner
2. Select "Local Environment"
3. Verify the environment variables:
   - `baseUrl` should be set to `http://localhost:3000`

## Available Endpoints

### Health Check

- **Endpoint**: GET `/api/health`
- **Purpose**: Verify API server is running
- **Expected Response**:
  ```json
  {
    "status": "success",
    "message": "Server is running",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

### Users

#### List Users

- **Endpoint**: GET `/api/users`
- **Query Parameters**:
  - page: number (optional, default: 1)
  - limit: number (optional, default: 10, max: 100)
  - orderBy: string (optional, values: 'name', 'email', 'createdAt')
  - order: string (optional, values: 'asc', 'desc')
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "email": "john.dev@example.com",
        "name": "John Developer",
        "profileImage": "https://example.com/avatars/john.jpg",
        "createdAt": "2024-03-11T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 10,
      "itemsPerPage": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

#### Get User by ID

- **Endpoint**: GET `/api/users/:id`
- **Parameters**:
  - id: number (positive integer)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "email": "john.dev@example.com",
      "name": "John Developer",
      "profileImage": "https://example.com/avatars/john.jpg",
      "createdAt": "2024-03-11T10:30:00.000Z"
    },
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "User not found",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

#### Create User

- **Endpoint**: POST `/api/users`
- **Request Body**:
  ```json
  {
    "email": "new.user@example.com",
    "name": "New User",
    "googleId": "google_new_123",
    "profileImage": "https://example.com/avatars/new.jpg" // optional
  }
  ```
- **Success Response** (201):
  ```json
  {
    "status": "success",
    "data": {
      "id": 11,
      "email": "new.user@example.com",
      "name": "New User",
      "profileImage": "https://example.com/avatars/new.jpg",
      "createdAt": "2024-03-11T10:30:00.000Z"
    },
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```
- **Error Response** (400):
  ```json
  {
    "status": "error",
    "message": "User with this email already exists",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

#### Update User

- **Endpoint**: PATCH `/api/users/:id`
- **Parameters**:
  - id: number (positive integer)
- **Request Body** (all fields optional):
  ```json
  {
    "email": "updated.email@example.com",
    "name": "Updated Name",
    "googleId": "new_google_id",
    "profileImage": "https://example.com/avatars/updated.jpg"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "email": "updated.email@example.com",
      "name": "Updated Name",
      "profileImage": "https://example.com/avatars/updated.jpg",
      "createdAt": "2024-03-11T10:30:00.000Z"
    },
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "User not found",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

#### Replace User

- **Endpoint**: PUT `/api/users/:id`
- **Parameters**:
  - id: number (positive integer)
- **Request Body** (all fields required):
  ```json
  {
    "email": "replaced.user@example.com",
    "name": "Replaced User",
    "googleId": "google_replaced_123",
    "profileImage": "https://example.com/avatars/replaced.jpg" // optional
  }
  ```
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "email": "replaced.user@example.com",
      "name": "Replaced User",
      "profileImage": "https://example.com/avatars/replaced.jpg",
      "createdAt": "2024-03-11T10:30:00.000Z"
    },
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "User not found",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

#### Delete User

- **Endpoint**: DELETE `/api/users/:id`
- **Parameters**:
  - id: number (positive integer)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "message": "User deleted successfully",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "User not found",
    "timestamp": "2024-03-11T10:30:00.000Z"
  }
  ```

### Events

#### List Events

- **Endpoint**: GET `/api/events`
- **Query Parameters**:
  - page: number (optional, default: 1)
  - limit: number (optional, default: 10, max: 100)
  - status: string (optional, values: 'draft', 'published', 'cancelled')
  - orderBy: string (optional, values: 'startDate', 'title', 'createdAt')
  - order: string (optional, values: 'asc', 'desc')
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "Jazz Night at Blue Note",
        "description": "Live jazz quartet performing classic standards...",
        "startDate": "2024-03-25T19:00:00.000Z",
        "endDate": "2024-03-25T23:00:00.000Z",
        "location": "Blue Note Bar & Restaurant",
        "status": "published",
        "createdAt": "2024-03-12T10:00:00.000Z",
        "updatedAt": "2024-03-12T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 4,
      "itemsPerPage": 10,
      "hasNextPage": false,
      "hasPreviousPage": false
    },
    "timestamp": "2024-03-12T10:00:00.000Z"
  }
  ```

#### Get Event by ID

- **Endpoint**: GET `/api/events/:id`
- **Parameters**:
  - id: number (positive integer)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Jazz Night at Blue Note",
      "description": "Live jazz quartet performing classic standards...",
      "startDate": "2024-03-25T19:00:00.000Z",
      "endDate": "2024-03-25T23:00:00.000Z",
      "location": "Blue Note Bar & Restaurant",
      "status": "published",
      "createdAt": "2024-03-12T10:00:00.000Z",
      "updatedAt": "2024-03-12T10:00:00.000Z"
    },
    "timestamp": "2024-03-12T10:00:00.000Z"
  }
  ```

#### Create Event

- **Endpoint**: POST `/api/events`
- **Request Body**:
  ```json
  {
    "title": "New Jazz Night",
    "description": "Live jazz performance",
    "startDate": "2024-04-01T19:00:00Z",
    "endDate": "2024-04-01T23:00:00Z",
    "status": "published",
    "venueId": 1
  }
  ```
- **Success Response** (201):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "New Jazz Night",
      "description": "Live jazz performance",
      "startDate": "2024-04-01T19:00:00.000Z",
      "endDate": "2024-04-01T23:00:00.000Z",
      "status": "published",
      "venueId": 1,
      "venue": {
        "id": 1,
        "name": "Blue Note Jazz Club",
        "address": "131 W 3rd St, New York, NY 10012",
        "coordinates": {
          "lat": 40.730483,
          "lng": -74.000339
        }
      },
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    },
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```

#### Update Event

- **Endpoint**: PATCH `/api/events/:id`
- **Parameters**:
  - id: number (positive integer)
- **Request Body** (all fields optional):
  ```json
  {
    "title": "Updated Event Title",
    "status": "published"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Updated Event Title",
      "description": "Original description...",
      "startDate": "2024-03-25T19:00:00.000Z",
      "endDate": "2024-03-25T23:00:00.000Z",
      "location": "Original location",
      "status": "published",
      "createdAt": "2024-03-12T10:00:00.000Z",
      "updatedAt": "2024-03-12T10:30:00.000Z"
    },
    "timestamp": "2024-03-12T10:30:00.000Z"
  }
  ```

#### Replace Event

- **Endpoint**: PUT `/api/events/:id`
- **Parameters**:
  - id: number (positive integer)
- **Request Body** (all fields required):
  ```json
  {
    "title": "Replaced Event",
    "description": "New description",
    "startDate": "2024-04-01T10:00:00Z",
    "endDate": "2024-04-01T12:00:00Z",
    "location": "New Location",
    "status": "published"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Replaced Event",
      "description": "New description",
      "startDate": "2024-04-01T10:00:00.000Z",
      "endDate": "2024-04-01T12:00:00.000Z",
      "location": "New Location",
      "status": "published",
      "createdAt": "2024-03-12T10:00:00.000Z",
      "updatedAt": "2024-03-12T10:30:00.000Z"
    },
    "timestamp": "2024-03-12T10:30:00.000Z"
  }
  ```

#### Delete Event

- **Endpoint**: DELETE `/api/events/:id`
- **Parameters**:
  - id: number (positive integer)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "message": "Event deleted successfully",
    "timestamp": "2024-03-12T10:30:00.000Z"
  }
  ```

#### Get Event GeoJSON
- **Endpoint**: GET `/api/events/:id/geojson`
- **Parameters**: 
  - id: number (positive integer)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-74.000339, 40.730483]  // [longitude, latitude]
      },
      "properties": {
        "id": 1,
        "title": "Jazz Night at Blue Note",
        "description": "Live jazz quartet performing classic standards...",
        "startDate": "2024-03-25T19:00:00.000Z",
        "endDate": "2024-03-25T23:00:00.000Z",
        "status": "published",
        "venue": {
          "id": 1,
          "name": "Blue Note Jazz Club",
          "address": "131 W 3rd St, New York, NY 10012"
        },
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    },
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "Event not found",
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```

### Venues

#### List Venues

- **Endpoint**: GET `/api/venues`
- **Query Parameters**:
  - page: number (optional, default: 1)
  - limit: number (optional, default: 10, max: 100)
  - orderBy: string (optional, values: 'name', 'createdAt')
  - order: string (optional, values: 'asc', 'desc')
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "Blue Note Jazz Club",
        "description": "Historic jazz venue featuring nightly live performances...",
        "address": "131 W 3rd St, New York, NY 10012",
        "contact": {
          "phone": "+1-212-475-8592",
          "email": "info@bluenote.net",
          "website": "https://www.bluenotejazz.com"
        },
        "images": [
          "https://example.com/venues/bluenote1.jpg",
          "https://example.com/venues/bluenote2.jpg"
        ],
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 3,
      "itemsPerPage": 10,
      "hasNextPage": false,
      "hasPreviousPage": false
    },
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```

#### Get Venue by ID

- **Endpoint**: GET `/api/venues/:id`
- **Parameters**:
  - id: number (positive integer)
- **Success Response** (200): Same structure as single venue in list response
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "Venue not found",
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```

#### Create Venue

- **Endpoint**: POST `/api/venues`
- **Request Body**:
  ```json
  {
    "name": "New Venue",
    "description": "Venue description",
    "address": "Venue address",
    "contact": {
      "phone": "+1-555-0123",
      "email": "contact@venue.com",
      "website": "https://www.venue.com"
    },
    "coordinates": {
      "lat": 51.509865,
      "lng": -0.118092
    },
    "images": ["https://example.com/venue1.jpg"]
  }
  ```
- **Success Response** (201): Same structure as Get Venue response

#### Update Venue

- **Endpoint**: PATCH `/api/venues/:id`
- **Parameters**: id (number)
- **Request Body** (all fields optional): Same structure as Create
- **Success Response** (200): Same structure as Get Venue response

#### Replace Venue

- **Endpoint**: PUT `/api/venues/:id`
- **Parameters**: id (number)
- **Request Body** (all fields required): Same structure as Create
- **Success Response** (200): Same structure as Get Venue response

#### Delete Venue

- **Endpoint**: DELETE `/api/venues/:id`
- **Parameters**: id (number)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "message": "Venue deleted successfully",
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```

#### Response Format

Venues can be returned in two formats:

1. **Standard Format**:

```json
{
  "id": 1,
  "name": "Blue Note Jazz Club",
  "coordinates": {
    "lat": 40.730483,
    "lng": -74.000339
  }
  // ... other fields
}
```

2. **GeoJSON Format** (for map integration):

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-74.000339, 40.730483] // [longitude, latitude]
  },
  "properties": {
    "id": 1,
    "name": "Blue Note Jazz Club"
    // ... other venue properties
  }
}
```

#### Get Venue GeoJSON

- **Endpoint**: GET `/api/venues/:id/geojson`
- **Parameters**:
  - id: number (positive integer)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-74.000339, 40.730483] // [longitude, latitude]
      },
      "properties": {
        "id": 1,
        "name": "Blue Note Jazz Club",
        "description": "Historic jazz venue featuring nightly live performances...",
        "address": "131 W 3rd St, New York, NY 10012",
        "contact": {
          "phone": "+1-212-475-8592",
          "email": "info@bluenote.net",
          "website": "https://www.bluenotejazz.com"
        },
        "images": [
          "https://example.com/venues/bluenote1.jpg",
          "https://example.com/venues/bluenote2.jpg"
        ],
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    },
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```
- **Error Response** (404):
  ```json
  {
    "status": "error",
    "message": "Venue not found",
    "timestamp": "2024-03-20T10:00:00.000Z"
  }
  ```

## Testing Instructions

### Basic Request Testing

1. Expand the "Health" folder in the collection
2. Click on "Health Check"
3. Click "Send" to make the request
4. Verify the response matches the expected format

### Environment Variables

- The collection uses `{{baseUrl}}` variable
- This is automatically replaced with `http://localhost:3000` in local environment
- To test against different environments, update the URL in environment settings

### Running All Tests

1. Click on the collection name
2. Click the "Run" button
3. In the Collection Runner:
   - Select which requests to run
   - Set the iteration count
   - Click "Run" button

## Troubleshooting

### Common Issues

1. **Cannot connect to server**

   - Verify the API server is running
   - Check if port 3000 is available
   - Verify no firewall is blocking the connection

2. **Environment variables not working**

   - Ensure the environment is selected
   - Check if variables are correctly defined
   - Try reloading Postman

3. **Invalid responses**
   - Verify server is running in the correct mode
   - Check console for any server errors
   - Verify request headers and body format

### Getting Help

If you encounter issues:

1. Check the server logs
2. Verify your local environment setup
3. Contact the development team
4. Create an issue in the project repository

## Contributing

### Adding New Endpoints

1. Open the collection in Postman
2. Right-click on the collection or folder
3. Select "Add Request"
4. Configure the request:
   - Set method (GET, POST, etc.)
   - Add path using `{{baseUrl}}`
   - Configure headers and body
   - Add description and examples

### Best Practices

1. **Naming Conventions**

   - Use clear, descriptive names for requests
   - Group related requests in folders
   - Include HTTP method in request name

2. **Documentation**

   - Add descriptions to requests
   - Include example responses
   - Document required headers/body

3. **Testing**
   - Test all possible responses
   - Include error cases
   - Verify against API specifications

## Future Endpoints

As new API endpoints are developed, they will be added to this collection in their respective categories:

- Authentication
- Users
- Events
- Venues
- etc.

Check the collection regularly for updates!
