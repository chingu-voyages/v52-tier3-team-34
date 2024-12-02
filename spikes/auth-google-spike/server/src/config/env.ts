import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env file
dotenv.config();

// Schema for environment variables
const envSchema = z.object({
  PORT: z.string().default('3000'),
  GOOGLE_CLIENT_ID: z.string({
    required_error: 'GOOGLE_CLIENT_ID is required in .env',
  }),
  JWT_SECRET: z.string({
    required_error: 'JWT_SECRET is required in .env',
  }),
  DATABASE_URL: z.string().default('file:./dev.db'),
  CLIENT_URL: z.string({
    required_error: 'CLIENT_URL is required in .env',
  }),
});

// Parse and validate environment variables
export const config = envSchema.parse({
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
});
