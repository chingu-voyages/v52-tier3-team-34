# Google OAuth Authentication Spike

This spike project explores implementing Google OAuth2 authentication for our Live Music Finder application, focusing on both API-only and web client flows.

## Overview

### Server Spike (Completed)
A TypeScript/Node.js implementation testing:
- Google OAuth2 authentication flow
- JWT token management
- Protected API endpoints
- User data management
- Token invalidation

### Client Spike (Upcoming)
A React implementation that will test:
- Google OAuth integration in React
- Token management in browser
- Protected route handling
- User session management

## Authentication Flows

### API-Only Flow
1. Client obtains Google ID Token (e.g., via Postman OAuth)
2. Client sends token to `/auth/login`
3. Server verifies token with Google
4. Server creates/updates user in database
5. Server returns JWT for subsequent requests
6. JWT used for protected endpoint access
7. Logout invalidates token server-side

### Web Client Flow (Upcoming)
1. User clicks "Login with Google"
2. Google OAuth popup/redirect
3. React app receives ID token
4. Same server-side flow as API-only
5. React app stores JWT
6. Protected routes use JWT
7. Logout clears tokens

## Server Implementation

### Setup
1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Configure environment:
   ```env
   DATABASE_URL="file:./dev.db"
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   JWT_SECRET="your-jwt-secret"
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start server:
   ```bash
   npm run dev
   ```

### API Endpoints

#### Public Endpoints
- `GET /health`: Server health check
  ```json
  {"status": "up", "timestamp": "2024-12-01T10:00:00.000Z"}
  ```

#### Authentication Endpoints
- `POST /auth/login`: Login with Google ID token
  ```json
  {
    "googleIdToken": "token-from-google"
  }
  ```

- `POST /auth/logout`: Invalidate current token
  - Requires Authorization header
  - Invalidates token server-side

- `GET /auth/profile`: Get user profile
  - Requires Authorization header
  - Returns user data

#### Protected Endpoints
- `GET /health/auth`: Protected health check
  - Requires Authorization header
  - Verifies authentication

### Database Operations
On Google login:
- Checks for existing user by Google ID
- Creates new user if not found
- Updates user data if found
- Schema includes: id, email, name, googleId, profileImage

### Testing with Postman

1. Import collection and environment from `/server/postman/`

2. Configure environment variables:
   - `BASE_URL`: http://localhost:3000/api/v1
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret

3. Test Flow:
   1. Use "Get Google Token" request to obtain token
   2. Login using token
   3. Test protected endpoints with received JWT
   4. Test logout and token invalidation

## Security Features
- Server-side token validation
- Token invalidation on logout
- Protected route middleware
- Type-safe implementation
- SQL injection protection via Prisma
- Request validation using Zod

## Development Notes

### Key Decisions
- TypeScript for type safety
- JWT for stateless authentication
- Prisma for type-safe database access
- Token invalidation for security
- API versioning for future compatibility

### Known Limitations
- In-memory token invalidation (would use Redis in production)
- Basic error handling
- Limited user profile data
- No refresh token implementation

## Next Steps
1. Implement React client spike
2. Test full OAuth flow in browser
3. Implement proper error handling
4. Add refresh token support
5. Move successful patterns to main project
