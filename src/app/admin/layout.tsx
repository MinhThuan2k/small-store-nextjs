/** @format */
'use client'
import { AppProviders } from '@/app/AppProviders'
import HeaderBar from '@/components/layouts/HeaderBar'
import Sidebar from '@/components/layouts/Sidebar'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState('dashboard')

  return (
    <AppProviders>
      <div className="flex bg-slate-100 min-h-screen">
        <Sidebar page={page} setPage={setPage} />
        <div className="flex-1 flex flex-col min-h-screen">
          <HeaderBar page={page} />
          {children}
        </div>
      </div>
    </AppProviders>
  )
}
