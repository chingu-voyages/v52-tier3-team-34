import { UserResponse } from './user.types';

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface User extends UserResponse {}
  }
}
