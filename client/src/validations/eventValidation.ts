// src/validations/eventValidation.ts
import { z } from 'zod';

export interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  duration: {
    days: string;
    hours: string;
    minutes: string;
  };
  artist: string;
  genre: string[];
  price: number;
  venueId: number;
  image: string;
  terms: boolean;
  endDate: string;
}

// Separate type for data that will be sent to the API
export type EventSubmissionData = Omit<EventFormData, 'terms' | 'duration'> & {
  price: number;
  startDate: string;
  endDate: string;
};

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  description: z.string().min(10, 'Description must have at least 10 characters'),
  startDate: z.string().refine((date) => {
    try {
      new Date(date).toISOString();
      return true;
    } catch {
      return false;
    }
  }, 'Invalid date format'),
  duration: z.object({
    days: z.string().regex(/^\d+$/, 'Days must be a number'),
    hours: z.string().regex(/^\d+$/, 'Hours must be a number'),
    minutes: z.string().regex(/^(0|15|30|45)$/, 'Minutes must be one of: 0, 15, 30, 45')
  }),
  artist: z.string().min(3, 'Artist name must have at least 3 characters'),
  genre: z.array(z.string()).min(1, 'Please select at least one genre'),
  price: z.number().min(0, 'Price must be a positive number'),
  venueId: z.number({ message: 'Venue ID must be number' }),
  image: z.string().url('Please enter a valid URL for the image').optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms'
  }),
  endDate: z.string().refine((date) => {
    try {
      new Date(date).toISOString();
      return true;
    } catch {
      return false;
    }
  }, 'Invalid date format')
});
