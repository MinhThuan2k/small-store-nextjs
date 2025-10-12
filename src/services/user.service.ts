import http from '@/lib/http'

export interface UserProfile {
  user: {
    id: number
    name: string
    email: string
  }
}

class UserService {
  profile() {
    return http.get<UserProfile>('/api/v1/users/profile')
  }
}

export const userService = new UserService()
