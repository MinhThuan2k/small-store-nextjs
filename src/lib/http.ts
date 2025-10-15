import envConfig from './envConfig'

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const

export type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

export class HttpError extends Error {
  readonly status: number
  readonly payload: any

  constructor({ status, payload }: { status: number; payload: any }) {
    super(payload?.message ?? `HTTP Error ${status}`)
    this.name = 'httpError'
    this.status = status
    this.payload = payload
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

/* Allowed methods used by this helper */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/* Core request helper:
   - Avoids forcing JSON.stringify for FormData/Blob/URLSearchParams/string
   - Adds Content-Type only when appropriate
   - Gracefully handles empty responses and non-JSON text
   - Uses URL(...) to safely join base+path
*/
const request = async <T = any>(
  method: HttpMethod,
  url: string,
  options?: CustomOptions
): Promise<{ status: number; payload: T | null }> => {
  const baseUrl =
    options?.baseUrl === undefined || !options?.baseUrl ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

  const fullUrl = (() => {
    try {
      return new URL(url, baseUrl).toString()
    } catch {
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
    }
  })()

  const rawBody = (options as any)?.body
  const isPrimitiveBody =
    rawBody === undefined ||
    rawBody === null ||
    typeof rawBody === 'string' ||
    rawBody instanceof FormData ||
    rawBody instanceof URLSearchParams ||
    rawBody instanceof Blob ||
    rawBody instanceof ArrayBuffer

  const body = isPrimitiveBody ? rawBody : JSON.stringify(rawBody)

  const baseHeader = { 'Content-Type': 'application/json' }

  const fetchOptions: RequestInit = {
    method,
    ...options,
    body,
    headers: {
      ...baseHeader,
      ...options?.headers
    }
  }

  const response = await fetch(fullUrl, fetchOptions)

  const payload = await response.json()

  const result = { status: response.status, payload }

  if (!response.ok) {
    throw new HttpError(result)
  }

  return result
}

const http = {
  get<T = any>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('GET', url, options)
  },
  post<T = any>(url: string, body?: any, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('POST', url, { ...options, body })
  },
  put<T = any>(url: string, body?: any, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('PUT', url, { ...options, body })
  },
  delete<T = any>(url: string, body?: any, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('DELETE', url, { ...options, body })
  }
}

export default http
