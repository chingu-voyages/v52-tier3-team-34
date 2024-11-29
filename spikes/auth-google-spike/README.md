# Google Authentication Spike

## Goal
Test Google Authentication implementation for API-only access, preparing for future client integration.

## Tech Stack
- Backend: Node.js, Express, TypeScript
- Auth: Google OAuth 2.0, JWT
- Database: SQLite via Prisma (for simplicity)

## API Contract (Authentication)

### Endpoints
# Auth
POST /auth/login     # Receives Google ID token, returns JWT
POST /auth/logout    # Invalidates JWT

# Test Routes
GET  /api/protected/one  # Protected endpoint
GET  /api/protected/two  # Protected endpoint
GET  /api/public/one     # Public endpoint
GET  /api/public/two     # Public endpoint

### Implementation Details
- Authentication Middleware
- JWT Token Management
- Error Handlers
- User Management (SQLite/Prisma)
- Types and Interfaces

These components will be migrated to the main API project after validation.

## Testing Flows

### Current: API-Only (Postman)
1. Access public endpoints (no auth needed)
2. Try protected endpoints (will fail)
3. Login:
   - Use Postman's OAuth 2.0 to get Google ID token
   - Send token to /auth/login
   - Receive JWT
4. Access protected endpoints with JWT
5. Test logout

### Future: Client Integration
1. User clicks "Login with Google" button
2. Google OAuth popup opens
3. User authenticates with Google
4. Client receives Google ID token
5. Client sends token to API's /auth/login
6. Client receives and stores JWT
7. Client uses JWT for protected endpoints

## Environment Setup
Required in `.env`:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
JWT_SECRET=
DATABASE_URL="file:./dev.db"
