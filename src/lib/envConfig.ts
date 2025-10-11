import z from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string()
})

const envParse = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
})

if (!envParse.success) {
  throw new Error('Config env loading fail!')
}

const envConfig = envParse.data
export default envConfig
