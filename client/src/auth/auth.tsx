import { CredentialResponse } from '@react-oauth/google';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { authenticateWithGoogle, logout as logoutApi } from '@/auth/api';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface AuthContextType {
  user: User | null;
  login: (response: CredentialResponse) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and validate it
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with backend
      // For now, we'll just check if it exists
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, []);

  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received');
      }

      // Send ID token to our backend
      const data = await authenticateWithGoogle(credentialResponse.credential);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.error('Authentication failed:', error);
      // TODO: Handle error properly
    }
  }

  async function logout() {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Always clear local state, even if server call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login: handleGoogleSuccess, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
