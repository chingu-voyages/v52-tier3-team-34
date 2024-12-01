import { CredentialResponse } from '@react-oauth/google';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (response: CredentialResponse) => Promise<void>;
  logout: () => void;
}
