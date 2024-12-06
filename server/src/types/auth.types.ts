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
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
    picture?: string;
  };
}
