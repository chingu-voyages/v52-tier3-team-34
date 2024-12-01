import { createContext, useContext } from 'react';
import { AuthContextType } from '../types/auth';
import { CredentialResponse } from '@react-oauth/google';

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_response: CredentialResponse) => Promise.resolve(),
  logout: () => {},
});

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
