import { z } from 'zod';

export const GoogleUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  googleId: z.string(),
  profileImage: z.string().optional()
});

export const UserParamsSchema = z.object({
  id: z.string()
    .regex(/^\d+$/, "ID must be a positive integer")
    .refine((val) => parseInt(val) > 0, "ID must be positive")
});

export const UserQuerySchema = z.object({
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  orderBy: z.enum(['name', 'email', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional()
});

// Schema for PATCH operations - all fields are optional
export const GoogleUserUpdateSchema = GoogleUserSchema.partial();

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  profileImage: string | null;
  createdAt: Date;
}

export type GoogleUserInput = z.infer<typeof GoogleUserSchema>;
export type GoogleUserUpdateInput = z.infer<typeof GoogleUserUpdateSchema>;
export type UserParams = z.infer<typeof UserParamsSchema>;
export type UserQuery = z.infer<typeof UserQuerySchema>; 