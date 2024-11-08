import { z } from 'zod';

export const GoogleUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  googleId: z.string(),
  profileImage: z.string().optional()
});

export type GoogleUserInput = z.infer<typeof GoogleUserSchema>; 