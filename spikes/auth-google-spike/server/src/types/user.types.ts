import { z } from 'zod';

// Schema for Google user data
export const GoogleUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  googleId: z.string(),
  profileImage: z.string().url().optional()
});

// Schema for updating user data
export const GoogleUserUpdateSchema = GoogleUserSchema.partial();

// TypeScript types derived from schemas
export type GoogleUserInput = z.infer<typeof GoogleUserSchema>;
export type GoogleUserUpdateInput = z.infer<typeof GoogleUserUpdateSchema>;

// Response types
export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  profileImage: string | null;
  createdAt: Date;
}
