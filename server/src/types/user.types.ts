import { z } from 'zod';
import { BaseQuerySchema } from './base.types';
import { EventStatus } from './event.types';

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
export type UserEventsQuery = z.infer<typeof UserEventsQuerySchema>;