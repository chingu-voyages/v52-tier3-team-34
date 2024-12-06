# Google Authentication Implementation Plan

## Overview
Implementation of Google Authentication for the Live Music Finder API, based on the successful spike implementation. This plan follows a phase-by-phase approach, ensuring the application remains testable at each step.

## Prerequisites
- [x] Access to project's Google Cloud Console
- [x] PostgreSQL database access
- [x] Postman installed

## Phase 0: Project Setup
0.1. [x] Create feature branch: `feat/google-auth`
0.2. [x] Create Google Cloud Project
   0.2.1. [x] Configure OAuth consent screen
   0.2.2. [x] Create OAuth 2.0 Client ID
   0.2.3. [x] Download client credentials
0.3. [x] Install dependencies
   ```bash
   npm install google-auth-library jsonwebtoken
   npm install @types/jsonwebtoken --save-dev
   ```
0.4. [x] Set up environment variables
   0.4.1. [x] Add to .env:
      ```
      GOOGLE_CLIENT_ID=your_client_id
      GOOGLE_CLIENT_SECRET=your_client_secret
      JWT_SECRET=your_jwt_secret
      JWT_EXPIRATION=1h
      ```
   0.4.2. [x] Update .env.example
0.5. [x] Update Postman collection
   0.5.1. [x] Import spike collection as base
   0.5.2. [x] Update environment variables
   0.5.3. [x] Test health endpoint

## Phase 1: Core Authentication Services
1.1. [x] Create auth service structure:
   ```
   src/
   ├── services/
   │   ├── auth/
   │   │   ├── google.auth.service.ts
   │   │   └── jwt.service.ts
   ├── types/
   │   └── auth.types.ts
   ```
1.2. [x] Implement Google auth verification
1.3. [x] Implement JWT service
1.4. [x] Create auth middleware
1.5. [x] Add basic error handling
1.6. [ ] Test with Postman's Google OAuth flow (pending auth routes implementation)

## Phase 2: User Management
2.1. [x] Review current User model compatibility
2.2. [x] Add auth-related fields:
   - [x] Optional name field
   - [x] Google ID field
   - [x] Profile image field
2.3. [x] Implement user service methods:
   2.3.1. [x] findOrCreateGoogleUser
   2.3.2. [x] updateUserProfile
2.4. [x] Add user type definitions:
   - [x] GoogleUserSchema
   - [x] GoogleUserUpdateSchema
   - [x] Query schemas consistent with other models
2.5. [ ] Test user operations with Postman (pending auth routes)

## Phase 3: Auth Endpoints
3.1. [ ] Implement auth routes:
   ```
   src/
   ├── routes/
   │   ├── auth.routes.ts
   │   └── index.ts
   ```
3.2. [ ] Add endpoints:
   3.2.1. [ ] POST /auth/login (Google sign-in)
   3.2.2. [ ] GET /health/auth (protected route test)
3.3. [ ] Add request validation
3.4. [ ] Add error responses
3.5. [ ] Update and test with Postman collection

## Phase 4: Protected Routes
4.1. [x] Add auth middleware to Events routes:
   4.1.1. [x] POST /events
   4.1.2. [x] PUT /events/:id
   4.1.3. [x] DELETE /events/:id
4.2. [x] Add auth middleware to Venues routes:
   4.2.1. [x] POST /venues
   4.2.2. [x] PUT /venues/:id
   4.2.3. [x] DELETE /venues/:id
4.3. [ ] Update route documentation
4.4. [ ] Update and test with Postman collection

## Testing Checklist
For each phase:
- [x] Phase 0: Project Setup
- [x] Phase 1: Core Services (pending final OAuth flow test)
- [x] Phase 2: User Management (pending auth routes testing)
- [ ] Phase 3: Auth Endpoints
- [x] Phase 4: Protected Routes (pending final testing with auth)

## Notes
- Each phase should be tested thoroughly before proceeding
- Keep the app running without errors throughout implementation
- Update Postman collection with each new endpoint
- Document any deviations from spike implementation

## Current Status (Updated)
- Core services implemented (Google Auth, JWT)
- User model updated with auth fields
- Type definitions and schemas complete
- Protected routes middleware added
- Next: Implementing Auth Controller & Routes
- Pending: Complete OAuth flow testing
