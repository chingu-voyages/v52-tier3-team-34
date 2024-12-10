import { z } from 'zod';
import { BaseQuerySchema } from './base.types';
import { EventStatus } from './event.types';

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

export const UserParamsSchema = z.object({
  id: z.string()
    .regex(/^\d+$/, "ID must be a positive integer")
    .refine((val) => parseInt(val) > 0, "ID must be positive")
});

export const UserQuerySchema = BaseQuerySchema.extend({
  filter: z.object({
    id: z.coerce.number().int().positive().optional(),
    email: z.string().email().optional(),
    name: z.string().optional(),
    googleId: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional()
  }).optional()
});

// Schema for user events query parameters
export const UserEventsQuerySchema = BaseQuerySchema.extend({
  filter: z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.enum([EventStatus.DRAFT, EventStatus.PUBLISHED, EventStatus.CANCELLED]).optional(),
  }).optional()
});

// Response types
export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  profileImage: string | null;
  createdAt: Date;
}

// Parameter types
export interface UserParams {
  id: string;
}

// Query types derived from schemas
export type UserQuery = z.infer<typeof UserQuerySchema>;
export type UserEventsQuery = z.infer<typeof UserEventsQuerySchema>;