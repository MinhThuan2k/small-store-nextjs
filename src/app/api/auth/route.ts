import { HTTP_STATUS } from '@/lib/http'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST({ request }: { request: NextRequest }) {
  const raw = await request.json()

  const sessionToken = raw?.session_token
  if (!sessionToken) {
    return Response.json(
      { massage: 'UNAUTHORIZED!' },
      { status: HTTP_STATUS.UNAUTHORIZED }
    )
  }

  const cookie = await cookies()
  cookie.set('sessionToken', sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })

  return Response.json({})
}
