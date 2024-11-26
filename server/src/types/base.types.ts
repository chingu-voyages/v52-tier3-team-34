import { z } from 'zod';

export const BaseQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  
  // Sorting - format: field:direction (e.g., name:asc)
  sort: z.string()
    .regex(/^[\w]+:(asc|desc)$/, "Sort must be in format: field:direction")
    .optional(),
  
  // Field selection - comma-separated fields
  fields: z.string()
    .regex(/^[\w]+(,[\w]+)*$/, "Fields must be comma-separated field names")
    .optional(),
  
  // Includes/expansions - comma-separated relations
  include: z.string()
    .regex(/^[\w]+(,[\w]+)*$/, "Include must be comma-separated relation names")
    .optional(),
});
