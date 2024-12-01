import { z } from "zod";

// Zod schema for form validation
export const venueSchema = z.object({
    name: z.string().min(3, 'Venue name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    address: z.string().min(5, 'Please enter a valid address'),
    contact: z.object({
      email: z.string().email('Please enter a valid email'),
      phone: z.string().regex(/^\+?[\d\s-]+$/, 'Please enter a valid phone number')
    }),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180)
    }),
    images: z.array(z.string().url('Please enter valid image URLs')).min(1, 'At least one image is required')
  });
  
  // Export the VenueFormData type
  export type VenueFormData = z.infer<typeof venueSchema>;