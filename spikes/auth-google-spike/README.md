# Google Authentication Spike

## Goal
Test Google Authentication implementation for API-only access, preparing for future client integration.

## Tech Stack
- Backend: Node.js, Express, TypeScript
- Auth: Google OAuth 2.0, JWT
- Database: SQLite via Prisma (for simplicity)
- Testing: Postman

## Setup

### 1. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=3000
DATABASE_URL="file:./dev.db"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
JWT_SECRET="your-jwt-secret"
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: 
     - `https://oauth.pstmn.io/v1/callback` (for Postman)
5. Copy Client ID and Client Secret to `.env`

### 3. Development Setup
```bash
# Install dependencies
npm install

# Initialize database
npx prisma migrate dev

# Start development server
npm run dev
```

## API Contract

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Health Checks
```
GET /health
Response: { status: "up" }

GET /health/auth  [Protected]
Response: {
  status: "up",
  auth: {
    status: "authenticated",
    provider: "google",
    user: {
      id: number,
      email: string,
      name: string,
      profileImage: string
    }
  },
  timestamp: string
}
```

#### Authentication
```
POST /auth/login
Body: { googleIdToken: string }
Response: {
  token: string,
  user: {
    id: number,
    email: string,
    name: string,
    profileImage: string
  }
}

GET /auth/profile  [Protected]
Response: {
  user: {
    id: number,
    email: string,
    name: string,
    profileImage: string
  }
}

POST /auth/logout  [Protected]
Response: { message: string }
```

## Testing with Postman

### 1. Import Collection
1. Import `server/postman/Auth_Spike_API.postman_collection.json`
2. Import `server/postman/Auth_Spike_API.postman_environment.json`

### 2. Configure Environment
1. Select "Auth Spike API Environment"
2. Set variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `BASE_URL` (default: http://localhost:3000/api/v1)

### 3. Test Flow
1. Get Google Token:
   - Open "Get Google Token" request
   - Go to Authorization tab
   - Click "Get New Access Token"
   - Complete Google login
   - Copy ID token to `GOOGLE_ID_TOKEN` variable

2. Test Authentication:
   - Try public health check
   - Login with Google token
   - JWT will be automatically saved
   - Test protected endpoints

## Implementation Details

### Authentication Flow
1. Client obtains Google ID Token
2. Token sent to `/auth/login`
3. Server verifies token with Google
4. Server creates/updates user
5. Server returns JWT
6. JWT used for subsequent requests

### Security Features
- Token-based authentication
- Google ID token verification
- Type-safe request validation
- Secure error handling
- Protected route middleware

## Future Integration
This spike provides a foundation for:
1. React client integration
2. Production deployment
3. Additional OAuth providers
4. Enhanced security features

## Notes
- This is a spike/proof of concept
- Uses SQLite for simplicity
- Focuses on API-only authentication
- Prepared for client integration
