/** @format */

'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import { OverlayLoading } from '@/components/ui/loading/OverlayLoading'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <OverlayLoading />
        </div>
      }
    >
      <QueryClientProvider client={getQueryClient()}>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </QueryClientProvider>
    </Suspense>
  )
}
