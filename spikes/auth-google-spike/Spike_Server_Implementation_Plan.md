# Server Implementation Plan

## Project Scope
All development confined to: `spikes/auth-google-spike/server/`

## Phase 1: TypeScript & Basic Setup
1. Initialize project
   - Create package.json
   - Install dependencies (express, typescript, etc.)
   - Setup tsconfig.json (strict mode)
   - Configure environment variables

2. Setup project structure
   ```
   server/
   ├── src/
   │   ├── types/      # TypeScript definitions
   │   ├── config/     # Environment config
   │   └── server.ts   # Entry point
   ├── prisma/
   └── tests/
   ```

3. Create basic Express server
   - Define app types
   - Setup error handling
   - Test server running

 Commit: "Setup: Basic TypeScript Express server"

## Phase 2: Database & User Model
1. Setup Prisma with SQLite
   - Initialize Prisma
   - Create User model
   - Generate client & types
   - Test database connection

2. Create user service
   - Define User interfaces
   - Implement CRUD operations
   - Add type safety

 Commit: "Add: Database and User model"

## Phase 3: Authentication Setup
1. Setup Google OAuth
   - Configure Google Cloud credentials
   - Add auth types and interfaces
   - Setup token verification

2. Implement JWT handling
   - Create JWT service with types
   - Type-safe token generation
   - Token validation

 Commit: "Add: Authentication setup"

## Phase 4: API Implementation
1. Create auth endpoints
   - POST /auth/login
   - POST /auth/logout
   - Add request/response types

2. Create test endpoints
   - GET /api/public/one
   - GET /api/public/two
   - GET /api/protected/one
   - GET /api/protected/two

3. Implement middleware
   - Type-safe auth middleware
   - Error handling middleware
   - Request validation

 Commit: "Add: API endpoints and middleware"

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

 Commit: "Add: Testing setup and documentation"

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