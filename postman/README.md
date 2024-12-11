# Live Music Finder API - Postman Collections

This directory contains Postman collections for testing the Live Music Finder API, organized into authentication, events, venues, and user management endpoints.

## Prerequisites

### Google OAuth Setup (Required)
Before you can test the API, you need to set up Google OAuth:

Get your credentials:   
   - Client ID
   - Client Secret

## Setup Instructions

### 1. Files to Import
- **Collections**:
  - `main.postman_collection.json` - Main collection that references all others
  - `auth.postman_collection.json` - Authentication endpoints
  - `users.postman_collection.json` - User management endpoints
  - `events.postman_collection.json` - Event management endpoints
  - `venues.postman_collection.json` - Venue management endpoints

- **Environment** (choose one):
  - `local.postman_environment.json` - For testing with localhost
  - `production.postman_environment.json` - For testing with production server

### 2. Import Steps
1. Open Postman
2. Click "Import" button (top left)
3. Choose "File" > "Upload Files"
4. Select all collection files and your chosen environment file
5. Click "Import"

### 3. Configure Environment
1. Click the environment dropdown (top right)
2. Choose either "Local Environment" or "Production Environment"
3. Open the environment settings and set required variables:
   ```
   GOOGLE_CLIENT_ID: "your-client-id-here"
   GOOGLE_CLIENT_SECRET: "your-client-secret-here"
   ```
4. Save the environment

### 4. Verify Setup
1. Collections sidebar should show all imported collections
2. Environment dropdown should show your selected environment as active
3. Environment should have Google OAuth credentials set

## Using the Collections

### Environment Variables
- **Base URL**: 
  - Local: `http://localhost:3000/api/v1`
  - Production: `https://v52-tier3-team-34.onrender.com/api/v1`

- **Authentication**:
  - `JWT`: Set automatically after login
  - `GOOGLE_ID_TOKEN`: Set during OAuth flow

- **Pagination & Sorting**:
  - `currentPage`: Default 1
  - `pageSize`: Default 10
  - `sortBy`: Default "createdAt"
  - `sortOrder`: Default "desc"

- **Resource IDs**: Set automatically during testing
  - `userId`
  - `eventId`
  - `venueId`

### Testing Flow
1. **Start with Auth**:
   - Use Auth collection to login
   - JWT token is automatically stored
   - Required for most endpoints

2. **Test API Features**:
   - Users: Profile management
   - Events: Create, search, manage events
   - Venues: Location-based venue operations

3. **Error Scenarios**:
   - Each collection includes error tests
   - Test invalid inputs
   - Test unauthorized access

## Troubleshooting

1. **Auth Issues**:
   - Verify Google OAuth credentials are set
   - Check JWT token is present
   - Ensure environment is active

2. **Request Errors**:
   - Check environment variables
   - Verify request body format
   - Look for validation errors

## Best Practices
1. Use environment variables, don't hardcode values
2. Test happy paths before error scenarios
3. Clean up created resources after testing
4. Keep environment credentials secure