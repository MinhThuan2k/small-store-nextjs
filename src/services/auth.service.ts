import http from '@/lib/http'
import * as z from 'zod'

export const loginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export type LoginPayload = z.infer<typeof loginPayloadSchema>

class AuthService {
  login(payload: LoginPayload) {
    const parsedPayload = loginPayloadSchema.parse(payload)
    return http.post<Response>('/api/v1/sign-in', parsedPayload)
  }
}

export const authService = new AuthService()
