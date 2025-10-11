import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

let _queryClient: QueryClient | null = null
export const getQueryClient = () => {
  if (!_queryClient) _queryClient = createQueryClient()
  return _queryClient
}

export { dehydrate, hydrate } from '@tanstack/react-query'
