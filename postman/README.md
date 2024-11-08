# API Testing with Postman

This directory contains Postman collections and environments for testing the V52 Tier3 Team 34 API.

## Files Structure

```
postman/
├── v52-tier3-team-34.postman_collection.json  # API endpoints collection
├── local.postman_environment.json             # Local environment variables
└── README.md                                  # This file
```

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