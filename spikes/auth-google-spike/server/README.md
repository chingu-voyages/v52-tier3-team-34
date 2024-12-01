# Google OAuth Authentication - Server Implementation

## Overview
Server-side implementation of Google OAuth authentication for Live Music Finder. Handles token validation, user management, and JWT generation.

## Tech Stack
- Express + TypeScript
- Prisma (SQLite for spike)
- JWT for tokens
- Google OAuth2 APIs

## Quick Start
```bash
npm install
npm run dev
```

## Testing with Postman
For detailed API testing instructions, see [Spike Server Test Plan Using Postman](./Spike_Server_Test_Plan_Using_Postman.md). This guide includes:
- OAuth 2.0 configuration steps
- Environment setup
- Test cases for all endpoints
- Authentication flow testing

## API Endpoints

### Public
`GET /api/v1/health`
- Health check endpoint
- No authentication required
- Returns: `{ status: "up" }`

### Authentication
`POST /api/v1/auth/login`
- Accepts Google ID token
- Request:
  ```json
  {
    "googleIdToken": "token-from-google"
  }
  ```
- Process:
  1. Validates Google token
  2. Extracts user info (email, name, picture)
  3. Database operations:
     - Looks up user by googleId
     - If not found: Creates new user
     - If found: Updates user data
  4. Generates JWT with user info
  5. Returns JWT to client

### Protected Routes
Require valid JWT in Authorization header

`GET /api/v1/health/auth`
- Protected health check
- Returns: `{ status: "up", user: UserInfo }`

`GET /api/v1/auth/profile`
- Get current user profile
- Returns: User data

`POST /api/v1/auth/logout`
- Invalidate current token
- Clears server-side token record

## Database Schema

### User Model
```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  name         String
  googleId     String   @unique
  profileImage String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Environment Setup
```env
DATABASE_URL="file:./dev.db"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
JWT_SECRET="your-jwt-secret"
CLIENT_URL="http://localhost:5173"
```

## Security Implementation
- Google token validation
- JWT for session management
- Protected route middleware
- CORS configuration
- Environment variables
- Type-safe implementation

## Security Note
> **Security Note**: The `GOOGLE_CLIENT_SECRET` is required for two scenarios:
> 1. Server-side to verify tokens with Google
> 2. Postman testing because it performs the full OAuth flow
>
> However, in the actual web application, the frontend client should never have access to the Client Secret - it only needs the Client ID for the browser-based OAuth flow.

## Known Limitations
- In-memory token invalidation
- Basic error handling
- No refresh token mechanism
