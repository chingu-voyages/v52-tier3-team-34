# Server Implementation Plan

## Project Scope
All development confined to: `spikes/auth-google-spike/server/`

## Authentication Flow Overview
1. Client obtains Google ID Token (via Google Identity Services)
2. Client sends token to our API
3. Server verifies token with Google
4. Server creates/updates user and returns JWT
5. Client uses JWT for subsequent requests

## Phase 1: TypeScript & Basic Setup
1. Initialize project
   - Create package.json
   - Install dependencies (google-auth-library, jsonwebtoken)
   - Setup tsconfig.json
   - Configure environment variables (GOOGLE_CLIENT_ID, JWT_SECRET)

2. Setup project structure
   ```
   server/
   ├── src/
   │   ├── types/         # TypeScript definitions
   │   ├── services/      # Auth & User services
   │   ├── middleware/    # JWT middleware
   │   ├── config/        # Environment config
   │   └── server.ts      # Entry point
   ├── prisma/
   └── tests/
   ```

## Phase 2: Database & User Model
1. Setup Prisma with SQLite
   - Initialize Prisma
   - Create User model with Google fields
   - Generate client & types

2. Create user service
   - Define User interfaces
   - Implement CRUD operations
   - Add type safety

## Phase 3: Authentication Implementation
1. Google Token Verification
   - Setup google-auth-library
   - Create verification service
   - Handle token validation errors

2. JWT Implementation
   - Create JWT service
   - Token generation
   - Token validation middleware

## Phase 4: API Implementation
1. Auth Endpoints
   ```typescript
   // Main authentication endpoint
   POST /auth/login
   Body: { 
     googleIdToken: string  // From Google Identity Services
   }
   Response: {
     token: string,        // Our JWT for future requests
     user: {
       id: number,
       email: string,
       name: string,
       profileImage: string
     }
   }

   // Optional endpoints
   POST /auth/logout      // Clear client-side token
   GET /auth/profile     // Get current user data
   ```

2. Test Endpoints
   ```typescript
   // Public routes (no auth)
   GET /api/public/test
   
   // Protected routes (require JWT)
   GET /api/protected/test
   Headers: { 
     Authorization: "Bearer {jwt}" 
   }
   ```

## Phase 5: Testing with Postman
1. Setup Collection
   ```
   Collection: Google Auth Spike
   Environment Variables:
   - BASE_URL: http://localhost:3000
   - JWT: <dynamic>
   ```

2. Test Flow
   A. Get Google ID Token
   - Use Postman's OAuth 2.0
   - Configure Google OAuth settings
   - Get ID token

   B. Login Flow
   - Send token to /auth/login
   - Store returned JWT

   C. Test Protected Routes
   - Use JWT in Authorization header
   - Verify protection works

3. Success Criteria
   - Google token verification works
   - JWT auth flow works
   - Protected routes secured
   - User data stored correctly

## Notes for React Implementation
- Use @react-oauth/google package
- Implement GoogleLogin component
- Store JWT in secure storage
- Add auth headers to API calls

## Final Steps
- Review all type definitions
- Ensure no any types remain
- Test all flows
- Create pull request to development branch

## Success Criteria
- All endpoints working as expected
- Complete TypeScript coverage
- Google authentication flow successful
- JWT tokens properly handled
- Protected routes secured
- Error cases handled properly

## Notes
- Keep all code within server/ directory
- Ensure type safety at each step
- Test each phase before committing
- Document setup requirements

## Document History
| Version | Date       | Changes                                                            |
|---------|------------|--------------------------------------------------------------------|
| 1.0     | 2024-01-17 | Initial version with TypeScript focus                              |
|         |            | Added commit points and project scope                              |
|         |            | Structured for step-by-step implementation                         |