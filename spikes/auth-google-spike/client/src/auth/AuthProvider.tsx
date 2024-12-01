import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AuthState, User } from '../types/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const login = async (googleToken: string) => {
    try {
      // TODO: Implement the actual API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ googleToken })
      // });
      // const data = await response.json();
      
      // For now, just mock the response
      console.log('Received Google token:', googleToken);
      
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        token: 'mock-jwt-token',
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Call API to invalidate token
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
