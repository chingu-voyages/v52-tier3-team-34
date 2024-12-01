# Google OAuth Authentication - Client Implementation

## Overview
React client implementation for Google OAuth authentication in Live Music Finder. Handles login flow, token management, and protected routes.

## Tech Stack
- React + TypeScript
- Vite for build tooling
- @react-oauth/google for Google OAuth
- Axios for API requests
- Tailwind CSS for styling

## Quick Start
```bash
npm install
npm run dev
```

## Key Components

### Authentication Context
`src/auth/AuthContext.tsx`
- Manages auth state
- Provides login/logout methods
- Handles token storage
- Type-safe implementation

### Auth Provider
`src/auth/AuthProvider.tsx`
- Wraps app with auth context
- Handles Google OAuth setup
- Manages user session
- Error handling

### API Service
`src/services/api.ts`
- Axios instance setup
- Token interceptors
- Error handling
- Type-safe requests

### Profile Component
`src/components/Profile.tsx`
- Test component for auth flow
- Public/protected route testing
- Error scenario testing

## Authentication Flow
1. User clicks "Login with Google"
2. Google OAuth popup opens
3. On success:
   ```typescript
   // Get token from Google
   const response = await googleLogin();
   
   // Exchange for JWT
   const { token } = await api.post('/auth/login', {
     googleIdToken: response.credential
   });
   
   // Store token
   localStorage.setItem('token', token);
   ```

## Protected Routes
```typescript
// Example protected route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

## Error Handling
```typescript
// API error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear token & redirect
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);
```

## Environment Setup
```env
VITE_GOOGLE_CLIENT_ID="your-client-id"
VITE_API_URL="http://localhost:3000/api/v1"
```

> **Security Note**: The client only needs the Google Client ID, not the Client Secret. The Client Secret is exclusively used server-side and should never be included in client-side code or environment variables. This is a critical security practice in OAuth implementations.

## Testing
1. Start development server
2. Test authentication:
   - Login with Google
   - Access protected routes
   - Test token expiration
   - Test error scenarios
   - Test logout flow

## Known Limitations
- Token stored in localStorage
- No refresh token handling
- Basic error handling
