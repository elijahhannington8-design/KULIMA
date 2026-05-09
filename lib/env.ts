import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // SMS Provider (optional for now)
  SMS_PROVIDER_API_KEY: z.string().optional(),
  SMS_PROVIDER_SENDER_ID: z.string().optional(),

  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>

// Validate environment variables at startup
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join('.')).join(', ')
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}\n\n` +
          `Please check your .env file and ensure all required variables are set.\n` +
          `See .env.example for reference.`
      )
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()
