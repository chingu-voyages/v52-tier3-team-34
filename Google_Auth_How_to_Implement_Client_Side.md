# Google Authentication Implementation Guide for Frontend

## Overview
This guide explains how to implement "Login with Google" in your frontend application. It's framework-agnostic and focuses on the core concepts and requirements.

## Authentication Flow
1. User clicks "Login with Google" button
2. Google OAuth consent screen appears
3. User authorizes the application
4. Your app receives Google ID token
5. Send token to our API
6. Receive JWT token for future requests
7. Store token securely
8. Use token for authenticated requests

## Implementation Steps

### 1. Setup Google Sign-In
```typescript
// These are the required configurations regardless of framework
const googleConfig = {
  client_id: "YOUR_GOOGLE_CLIENT_ID",
  scope: "email profile openid", // OpenID is required for ID tokens
  callback_url: "YOUR_CALLBACK_URL"
};
```

Note: The `openid` scope is required to receive ID tokens from Google, which is what our authentication flow expects. This scope combination (`email profile openid`) ensures we get:
- OpenID Connect ID token
- User's email address
- Basic profile information (name, profile picture)

### 2. Add Login Button
Your application needs a button that triggers the Google OAuth flow. This can be:
- Google's official button
- Custom styled button
- Any interactive element

### 3. Handle Authentication Flow

#### Core Requirements
1. Trigger Google OAuth
2. Handle the response
3. Send token to backend
4. Store received JWT
5. Handle errors

#### Generic Implementation Pattern
```javascript
// This is a pseudocode example - adapt to your framework/libraries
async function handleGoogleLogin() {
  try {
    // 1. Get Google ID token
    const googleToken = await getGoogleToken();

    // 2. Send to our API
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleIdToken: googleToken }),
    });

    // 3. Handle API response
    const { token, user } = await response.json();

    // 4. Store token securely
    securelyStoreToken(token);

    // 5. Update application state
    updateAuthState(user);

  } catch (error) {
    handleError(error);
  }
}
```

### 4. Token Management

#### Storage Options
- Memory (for SPA)
- HttpOnly Cookies (recommended)
- localStorage (if necessary, with security considerations)

#### Usage Pattern
```javascript
// Pseudocode - adapt to your implementation
function addAuthHeader(request) {
  const token = getStoredToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}
```

### 5. Protected Routes
Implement route protection based on your routing solution:
1. Check for valid token
2. Redirect unauthorized access
3. Handle token expiration

### 6. Error Handling
Handle common scenarios:
- Network errors
- Invalid tokens
- Expired tokens
- User cancellation
- API errors

## Security Best Practices

### Token Storage
- Prefer HttpOnly cookies
- If using localStorage:
  - Clear on logout
  - Implement token refresh
  - Consider XSS risks

### Request Security
- Always use HTTPS
- Validate tokens
- Implement CSRF protection
- Handle token expiration

### Error Handling
- Don't expose sensitive info
- Implement proper logging
- Show user-friendly messages

## Testing Guidelines

### Manual Testing
1. Successful login flow
2. Error scenarios
3. Token expiration
4. Protected routes
5. Logout flow

### Automated Testing
Test key functionality:
- Authentication flow
- Protected routes
- Error handling
- Token management

## Framework-Specific Examples

### React + TypeScript Implementation

#### Types and Interfaces
```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (googleToken: string) => Promise<void>;
  logout: () => void;
}
```

#### Auth Context
```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (googleToken: string): Promise<void> => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleIdToken: googleToken })
      });

      const { token, user } = await response.json();
      
      // Store token securely
      sessionStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = (): void => {
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### Protected Route Component
```typescript
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

#### API Client
```typescript
// services/api.ts
interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (requiresAuth) {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized - redirect to login
        window.location.href = '/login';
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const api = new ApiClient(process.env.REACT_APP_API_URL || '');
```

#### Usage Example
```typescript
// pages/LoginPage.tsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async (googleToken: string) => {
    try {
      await login(googleToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {/* Your Google Sign-In Button implementation */}
    </div>
  );
}

// pages/Dashboard.tsx
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function Dashboard() {
  const { user } = useAuth();

  const createEvent = async (eventData: any) => {
    try {
      await api.request('/events', {
        method: 'POST',
        body: JSON.stringify(eventData)
      });
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      {/* Your dashboard content */}
    </div>
  );
}
```

## API Endpoints Reference

### Login Endpoint
```
POST /auth/login
Body: { googleIdToken: string }
Response: {
  token: string,
  user: {
    id: number,
    email: string,
    name: string,
    picture: string
  }
}
```

### Protected Routes
All protected routes require:
```
Headers: {
  Authorization: "Bearer YOUR_JWT_TOKEN"
}
```

## Troubleshooting Guide

### Common Issues
1. Token not being sent correctly
2. CORS issues
3. Token storage problems
4. OAuth popup blocked
5. Invalid client configuration

### Solutions
- Verify token format
- Check CORS settings
- Ensure proper error handling
- Verify Google Console settings
- Check network requests

## Development Workflow
1. Setup Google credentials
2. Implement basic login flow
3. Add token management
4. Protect routes
5. Add error handling
6. Test thoroughly
7. Deploy with proper environment variables

## Additional Resources
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [JWT Best Practices](https://auth0.com/blog/jwt-security-best-practices/)
- [OAuth 2.0 Security Best Practices](https://oauth.net/2/security-best-practices/)
