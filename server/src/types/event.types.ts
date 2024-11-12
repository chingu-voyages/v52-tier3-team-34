import { z } from 'zod';

// Enum for event status
export const EventStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled'
} as const;

// Schema for validating event creation/updates
export const EventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  startDate: z.string().datetime(),  // ISO 8601 format
  endDate: z.string().datetime(),    // ISO 8601 format
  location: z.string().min(1, "Location is required").max(200),
  status: z.enum([EventStatus.DRAFT, EventStatus.PUBLISHED, EventStatus.CANCELLED])
    .default(EventStatus.DRAFT)
});

// Schema for PATCH operations - all fields are optional
export const EventUpdateSchema = EventSchema.partial();

// Schema for query parameters
export const EventQuerySchema = z.object({
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  status: z.enum([EventStatus.DRAFT, EventStatus.PUBLISHED, EventStatus.CANCELLED]).optional(),
  orderBy: z.enum(['startDate', 'title', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional()
});

// Schema for URL parameters
export const EventParamsSchema = z.object({
  id: z.string()
    .regex(/^\d+$/, "ID must be a positive integer")
    .refine((val) => parseInt(val) > 0, "ID must be positive")
});

// TypeScript types derived from Zod schemas
export type EventInput = z.infer<typeof EventSchema>;
export type EventUpdateInput = z.infer<typeof EventUpdateSchema>;
export type EventQuery = z.infer<typeof EventQuerySchema>;
export type EventParams = z.infer<typeof EventParamsSchema>;

// Type for API responses
export type EventResponse = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: keyof typeof EventStatus;
  createdAt: string;
  updatedAt: string;
}; 