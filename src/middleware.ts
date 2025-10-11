import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privateRoute = ['admin/items']
const authRoute = ['sign-in', 'register']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = await cookies()
  const sessionToken = cookie.get('sessionToken')

  if (authRoute.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (privateRoute.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [...authRoute, ...privateRoute]
}
