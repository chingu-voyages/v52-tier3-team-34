import { z } from 'zod';

export interface GoogleUser {
  email: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  name: string | null;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    picture?: string;
  };
}

// Login validation schema
export const LoginSchema = z.object({
  googleIdToken: z.string().min(1, "Google ID token is required")
});

export interface JWTError extends Error {
  name: 'JsonWebTokenError' | 'TokenExpiredError' | 'NotBeforeError';
  message: string;
}
