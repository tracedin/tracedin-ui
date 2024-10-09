import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ReactQueryProviderProps {
  children: React.ReactNode
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }): React.ReactElement => {
  const debug = process.env.NODE_ENV === 'development'

  const reactQueryClient = new QueryClient({
    defaultOptions: {
      mutations: {},
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
      {debug && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
