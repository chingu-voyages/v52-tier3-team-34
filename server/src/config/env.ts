import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debug: Log loaded env vars
console.log('DEBUG: Loaded env vars:', {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET: !!process.env.JWT_SECRET,
  ENV_FILE_PATH: path.resolve(__dirname, '../../.env')
});

// Schema for environment variables
const envSchema = z.object({
  PORT: z.string().default('3000'),
  GOOGLE_CLIENT_ID: z.string({
    required_error: 'GOOGLE_CLIENT_ID is required in .env',
  }),
  GOOGLE_CLIENT_SECRET: z.string({
    required_error: 'GOOGLE_CLIENT_SECRET is required in .env',
  }),
  JWT_SECRET: z.string({
    required_error: 'JWT_SECRET is required in .env',
  }),
  JWT_EXPIRATION: z.string().default('1h'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
});

// Parse and validate environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export const config = env.data;
