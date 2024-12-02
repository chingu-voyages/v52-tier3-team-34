import { ReactNode, useEffect, useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import { AuthContext } from './AuthContext';
import { User } from '../types/auth';
import { authenticateWithGoogle, logout as logoutApi } from '../services/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
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
  };

  const logout = async () => {
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
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        login: handleGoogleSuccess,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
