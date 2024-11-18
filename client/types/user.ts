export interface User {
  id: number;
  email: string;
  name: string;
  googleId: string;
  profileImage: string | null | undefined;
  createdAt: string; // datetime
  updatedAt: string; // datetime
}
