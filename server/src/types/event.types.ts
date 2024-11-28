import { z } from "zod";
import { BaseQuerySchema } from "./base.types";

// Enum for event status
export const EventStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
  CANCELLED: "cancelled",
} as const;

// Schema for validating event creation/updates
export const EventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  startDate: z.string().datetime(), // ISO 8601 format
  endDate: z.string().datetime(),
  status: z
    .enum([EventStatus.DRAFT, EventStatus.PUBLISHED, EventStatus.CANCELLED])
    .default(EventStatus.DRAFT),
  artist: z.string().optional(),
  genre: z.array(z.string()).default([]),
  price: z.number().nonnegative().default(0),
  venueId: z.number().positive("Venue ID is required"),
});

// Schema for PATCH operations - all fields are optional
export const EventUpdateSchema = EventSchema.partial();

// Schema for query parameters
export const EventQuerySchema = BaseQuerySchema.extend({
  filter: z.object({
    id: z.coerce.number().int().positive().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum([EventStatus.DRAFT, EventStatus.PUBLISHED, EventStatus.CANCELLED]).optional(),
    venueId: z.coerce.number().int().positive().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    artist: z.string().optional(),
    genre: z.string().optional(),
    price: z.coerce.number().nonnegative().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional()
  }).optional()
});

// Schema for URL parameters
export const EventParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a positive integer")
    .refine((val) => parseInt(val) > 0, "ID must be positive"),
});

// Schema for zone search query parameters
export const EventZoneQuerySchema = z.object({
  lat: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lng: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  radius: z.coerce
    .number()
    .positive("Radius must be positive")
    .max(50, "Radius cannot exceed 50 kilometers"),
  // Optional filters
  startDate: z.string().datetime().optional(), // Filter events starting after this time
  endDate: z.string().datetime().optional(), // Filter events ending before this time
  status: z
    .enum([EventStatus.DRAFT, EventStatus.PUBLISHED, EventStatus.CANCELLED])
    .optional(),
});

// TypeScript types derived from Zod schemas
export type EventInput = z.infer<typeof EventSchema>;
export type EventUpdateInput = z.infer<typeof EventUpdateSchema>;
export type EventQuery = z.infer<typeof EventQuerySchema>;
export type EventParams = z.infer<typeof EventParamsSchema>;
export type EventZoneQuery = z.infer<typeof EventZoneQuerySchema>;

// Type for API responses
export type EventResponse = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: keyof typeof EventStatus;
  artist?: string;
  genre: string[];
  price: number;
  venueId: number;
  venue?: {
    id: number;
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
  updatedAt: string;
};

// Type for zone search response
export type EventZoneResponse = {
  type: "FeatureCollection";
  features: EventGeoJSONFeature[];
  center: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  radius: number; // Search radius in kilometers
};

// GeoJSON types for events
export type EventGeoJSONFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude] from venue
  };
  properties: {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: keyof typeof EventStatus;
    artist?: string;
    genre: string[];
    price: number;
    venue: {
      id: number;
      name: string;
      address: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};

// Type for coerced zone query parameters
export type EventZoneQueryCoerced = {
  lat: string;
  lng: string;
  radius: string;
  startDate?: string;
  endDate?: string;
  status?: keyof typeof EventStatus;
};
