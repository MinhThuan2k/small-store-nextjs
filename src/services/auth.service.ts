import http from '@/lib/http'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

class AuthService {
  login(payload: LoginPayload) {
    return http.post<AuthResponse>('/api/v1/sign-in', payload)
  }
}

export const authService = new AuthService()
