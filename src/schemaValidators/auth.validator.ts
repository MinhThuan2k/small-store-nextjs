import z from 'zod'

export const loginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export type LoginPayload = z.infer<typeof loginPayloadSchema>
export const registerPayloadSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type RegisterPayload = z.infer<typeof registerPayloadSchema>
