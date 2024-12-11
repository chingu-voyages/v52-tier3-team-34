import { CredentialResponse, googleLogout } from '@react-oauth/google';
import { redirect } from '@tanstack/react-router';
import React, { createContext, useContext, useState } from 'react';

import { serverBaseUrl } from '@/config';

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

  async function login(response: CredentialResponse): Promise<void> {

    if (!response.credential) {
      throw new Error('No credential provided');
    }

    try {
      // Send the token to your backend to validate and fetch user info
      const res = await fetch(`${serverBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleIdToken: response.credential })
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();

      // Update user state with the received user data
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        picture: data.user.picture
      });
      throw redirect({ to: '/dashboard' });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function logout(): Promise<void> {
    try {
      googleLogout();

      await fetch(`${serverBaseUrl}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  }

  const isAuthenticated = !!user;

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
