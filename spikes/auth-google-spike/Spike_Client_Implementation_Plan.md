# Client Implementation Plan

## Overview
Test Google OAuth integration in a React client that mirrors the main app's patterns while keeping implementation focused on authentication concerns.

## Tech Stack (Aligned with Main App)
- React + TypeScript
- `@tanstack/react-router` for routing
- React Context for auth state
- `axios` for API calls
- `zod` for type validation
- `@react-oauth/google` for Google OAuth

## Phase 1: Project Setup
1. Initialize Project
   ```bash
   cd spikes/auth-google-spike
   npm create vite@latest client -- --template react-ts
   ```

2. Install Dependencies
   ```bash
   npm install @tanstack/react-router axios zod @react-oauth/google
   ```

3. Project Structure
   ```
   /client
   ├── src/
   │   ├── auth/
   │   │   ├── AuthContext.tsx      # Auth state management
   │   │   ├── AuthProvider.tsx     # Context provider
   │   │   └── useAuth.ts          # Custom hook
   │   ├── components/
   │   │   ├── LoginButton.tsx     # Google OAuth button
   │   │   ├── LogoutButton.tsx    # Logout handling
   │   │   └── TestEndpoints.tsx   # Component to test auth endpoints
   │   ├── pages/
   │   │   ├── Home.tsx           # Public page
   │   │   └── Profile.tsx        # Protected page
   │   ├── services/
   │   │   └── api.ts            # Axios setup & endpoints
   │   └── types/
   │       └── auth.ts           # Type definitions
   ```

## Phase 2: Core Authentication
1. Auth Context Setup
   - User state management
   - JWT storage
   - Type definitions

2. Google OAuth Integration
   - Configure Google OAuth provider
   - Implement login button
   - Handle OAuth response
   - Token exchange with server

3. Protected Routes
   - Route configuration
   - Auth guard implementation
   - Redirect handling

## Phase 3: API Integration
1. Axios Configuration
   - Base URL setup
   - Auth interceptors
   - Error handling

2. API Services
   - Auth Endpoints:
     - Login (exchange Google token)
     - Get user profile
     - Logout
   - Test Endpoints:
     - `GET /health` (public)
     - `GET /health/auth` (protected)
     - Display response status/data
     - Show auth state impact

## Phase 4: User Interface
1. Minimal Components
   - Login/Logout buttons
   - User profile display
   - Auth status indicator
   - Test endpoints component with:
     - Buttons to trigger test endpoints
     - Response display
     - Auth state reflection

2. Pages
   - Public home page with:
     - Public test endpoint
     - Login button
   - Protected profile page with:
     - Protected test endpoint
     - User info
     - Logout button
   - Error/unauthorized views

## Phase 5: Testing & Validation
1. Auth Flow Testing
   - Login flow
   - Token management
   - Protected routes
   - Logout flow
   - Test endpoints verification:
     - Public endpoint works without auth
     - Protected endpoint requires auth
     - Protected endpoint fails without auth

2. Error Handling
   - Invalid tokens
   - Network errors
   - OAuth failures

## Implementation Steps
1. Basic Setup (1 hour)
   - Project initialization
   - Dependencies installation
   - Initial structure

2. Auth Implementation (2-3 hours)
   - Context setup
   - Google OAuth integration
   - Protected routes

3. API Integration (1-2 hours)
   - Axios setup
   - Endpoint implementation
   - Error handling
   - Test endpoints integration

4. UI & Testing (1-2 hours)
   - Basic components
   - Flow testing
   - Test endpoints verification
   - Bug fixes

## Success Criteria
1. Successfully authenticate with Google
2. Properly store and manage JWT
3. Protected routes working
4. Clean logout process
5. Error states handled
6. Patterns validated for main app
7. Test endpoints demonstrate:
   - Public access works
   - Protected access requires auth
   - Protected access works with auth
   - Protected access fails without auth

## Notes
- Keep UI minimal (focus on auth)
- Mirror main app patterns where relevant
- Document key decisions
- Note any issues for main implementation
- Use test endpoints to validate auth flow