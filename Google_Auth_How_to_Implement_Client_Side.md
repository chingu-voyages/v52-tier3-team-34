# Google Authentication Implementation Guide - Frontend

## Prerequisites
- Google Cloud Console access (request from team lead)
- React + TypeScript project
- Node.js and npm

## Quick Start

### 1. Install Dependencies
```bash
npm install @react-oauth/google
```

### 2. Environment Setup
Create `.env` file:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_URL=http://localhost:3000/api/v1
```

### 3. Configure Google Provider
```tsx
// App.tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      {/* Your app components */}
    </GoogleOAuthProvider>
  );
}
```

## Implementation

### 1. Auth Context
```tsx
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### 2. Login Component
```tsx
// src/components/LoginButton.tsx
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

export function LoginButton() {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: { credential: string }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleIdToken: credentialResponse.credential })
      });

      const data = await response.json();
      if (data.status === 'success') {
        login(data.data.token, data.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error('Login Failed')}
    />
  );
}
```

### 3. API Client
```tsx
// src/utils/api.ts
interface ApiOptions extends RequestInit {
  body?: any;
}

export async function callApi(endpoint: string, options: ApiOptions = {}) {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(data.message || 'API call failed');
  }

  return data;
}
```

### 4. Protected Route Component
```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}
```

## API Endpoints

### Authentication
- `POST /auth/login`
  - Body: `{ googleIdToken: string }`
  - Response: `{ token: string, user: { id: number, email: string, name: string } }`

### Protected Routes
All require `Authorization: Bearer <token>` header

#### Venues
- `POST /venues` - Create venue
- `PATCH /venues/:id` - Update venue
- `DELETE /venues/:id` - Delete venue

#### Events
- `POST /events` - Create event
- `PATCH /events/:id` - Update event
- `DELETE /events/:id` - Delete event

## Testing Checklist

1. Authentication:
   - [ ] Google login button appears
   - [ ] Successful login stores token
   - [ ] Unauthorized users redirected to login

2. Protected Routes:
   - [ ] Can't access without login
   - [ ] Can access after login
   - [ ] Logout clears access

3. API Integration:
   - [ ] Token included in requests
   - [ ] Expired token handled
   - [ ] Error messages shown
