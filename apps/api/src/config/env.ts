import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { z } from 'zod';

// 1) Check the application stage
const APP_STAGE =
  (process.env.APP_STAGE as
    | 'development'
    | 'test'
    | 'staging'
    | 'production'
    | undefined) ?? 'development';

console.log('\n⏳ Loading environment variables...\n');
// 2) Load .env.<stage> and base .env (if exists)
const envFile = path.resolve(process.cwd(), `.env.${APP_STAGE}`);
if (fs.existsSync(envFile)) dotenv.config({ path: envFile });
dotenv.config(); // .env as fallback

// 3) Validate variables
const EnvSchema = z.object({
  APP_STAGE: z
    .enum(['development', 'test', 'staging', 'production'])
    .default(APP_STAGE),
  PORT: z.coerce.number().int().positive().default(4000),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 chars'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 chars'),
  JWT_ACCESS_TTL_SEC: z.coerce.number().int().positive().default(60 * 15), // 15 minutes
  JWT_REFRESH_TTL_SEC: z.coerce.number().int().positive().default(60 * 60 * 24 * 7), // 7 days
  JWT_ALGORITHM: z.enum(['HS256', 'RS256']).default('HS256'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().positive().default(10),

  REDIS_URL: z.string().min(1).optional(), 
});

const parsed = EnvSchema.safeParse({ ...process.env, APP_STAGE });

if (parsed.success) {
  console.log('\n✅ Environment configuration is valid\n');
} else {
    console.error('❌ Invalid environment configuration:');
    
    const errors = parsed.error.issues;
    const fieldErrors = errors.filter(error => error.path.length > 0);

    if (fieldErrors.length > 0) {
        console.error('\nMissing or invalid environment variables:');
        fieldErrors.forEach(error => {
            const field = error.path.join('.');
            const message = error.message;
            console.error(`  • ${field}: ${message}`);
        });
    }

    console.error('\nPlease check your .env files and ensure all required variables are set.');
    process.exit(1);
}

export const env = Object.freeze(parsed.data);
export const isDev = env.APP_STAGE === 'development';
export const isTest = env.APP_STAGE === 'test';
export const isStaging = env.APP_STAGE === 'staging';
export const isProd = env.APP_STAGE === 'production';
