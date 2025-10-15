import http from '@/lib/http'
import { LoginPayload, RegisterPayload } from '@/schemaValidators/auth.validator'

class AuthService {
  login(payload: LoginPayload) {
    return http.post<any>('/api/v1/sign-in', payload)
  }

  register(payload: RegisterPayload) {
    return http.post<Response>('/api/v1/register', payload)
  }
}

export const authService = new AuthService()
