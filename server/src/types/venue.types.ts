import { z } from "zod";

// Schema for coordinates
const CoordinatesSchema = z.object({
  lat: z.number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lng: z.number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
});

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
  coordinates: CoordinatesSchema,
  userId: z.number().int().positive("User ID must be a positive integer")
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

// GeoJSON types
export type GeoJSONPoint = {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
};

export type GeoJSONFeature = {
  type: 'Feature';
  geometry: GeoJSONPoint;
  properties: VenueProperties;
};

export type VenueProperties = {
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

// Type for API responses
export interface VenueResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
};
