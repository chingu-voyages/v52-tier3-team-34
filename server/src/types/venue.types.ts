import { z } from "zod";

// Schema for contact information
const ContactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

// Schema for validating venue creation/updates
export const VenueSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  address: z.string().min(1, "Address is required").max(200),
  contact: ContactSchema,
  images: z.array(z.string().url()).min(1, "At least one image is required"),
});

// Schema for PATCH operations - all fields are optional
export const VenueUpdateSchema = VenueSchema.partial();

// Schema for query parameters
export const VenueQuerySchema = z.object({
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  orderBy: z.enum(["name", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

// Schema for URL parameters
export const VenueParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a positive integer")
    .refine((val) => parseInt(val) > 0, "ID must be positive"),
});

// TypeScript types derived from Zod schemas
export type VenueInput = z.infer<typeof VenueSchema>;
export type VenueUpdateInput = z.infer<typeof VenueUpdateSchema>;
export type VenueQuery = z.infer<typeof VenueQuerySchema>;
export type VenueParams = z.infer<typeof VenueParamsSchema>;

// Type for API responses
export type VenueResponse = {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
};
