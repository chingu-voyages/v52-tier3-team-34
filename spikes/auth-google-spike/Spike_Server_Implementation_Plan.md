# Server Implementation Plan

## Phase 1: Basic Setup
1. Initialize project
   - Create package.json
   - Setup TypeScript
   - Install dependencies (express, prisma, etc.)
   - Configure environment variables

2. Create basic Express server
   - Setup server.ts
   - Add basic error handling
   - Test server running

## Phase 2: Database & User Model
1. Setup Prisma with SQLite
   - Initialize Prisma
   - Create User model
   - Generate client
   - Test database connection

2. Create user service
   - CRUD operations
   - User type definitions

## Phase 3: Authentication Setup
1. Setup Google OAuth
   - Configure Google Cloud credentials
   - Install required packages
   - Setup token verification

2. Implement JWT handling
   - Create JWT service
   - Token generation
   - Token validation

## Phase 4: API Implementation
1. Create auth endpoints
   - POST /auth/login
   - POST /auth/logout

2. Create test endpoints
   - GET /api/public/one
   - GET /api/public/two
   - GET /api/protected/one
   - GET /api/protected/two

3. Implement middleware
   - Auth middleware for protected routes
   - Error handling middleware

## Phase 5: Testing
1. Setup Postman collection
   - Environment variables
   - Google OAuth configuration
   - Request templates

2. Test flows
   - Public endpoints
   - Protected endpoints (unauthorized)
   - Login flow
   - Protected endpoints (authorized)
   - Logout

## Success Criteria
- All endpoints working as expected
- Google authentication flow successful
- JWT tokens properly handled
- Protected routes secured
- Error cases handled properly

## Notes
- Keep commits small and focused
- Test each phase before moving to next
- Document any issues or learnings
- Keep track of parts to migrate to main project