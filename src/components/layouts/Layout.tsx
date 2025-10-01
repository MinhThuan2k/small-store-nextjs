import { Outlet } from 'react-router-dom'
import HeaderBar from './HeaderBar'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Card } from '../ui'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'

export default function Layout() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className='flex bg-slate-100 min-h-screen'>
      <Sidebar page={page} setPage={setPage} />
      <div className='flex-1 flex flex-col min-h-screen'>
        <HeaderBar page={page} />
        <div className='p-6 flex-1 overflow-auto'>
          {/* <Outlet /> */}
          {page === 'dashboard' && <DashboardPage />}
          {page !== 'dashboard' && (
            <Card className='p-6 rounded-xl shadow bg-white'>
              Nội dung {page} đang phát triển...
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
