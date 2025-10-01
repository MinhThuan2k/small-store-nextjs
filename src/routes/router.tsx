import Layout from '@/components/layouts/Layout'
import { AuthMiddleware } from '@/middleware/AuthMiddleware'
import { GuestMiddleware } from '@/middleware/GuestMiddleware'
import { LoginPage } from '@/pages/auth/LoginPage'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { createBrowserRouter } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    Component: () => (
      <GuestMiddleware>
        <LoginPage />
      </GuestMiddleware>
    )
  },
  {
    Component: () => (
      // <AuthMiddleware>
      //   <Layout />
      // </AuthMiddleware>
      <Layout />
    ),
    children: [
      {
        index: true,
        path: 'dashboard',
        Component: DashboardPage
      }
    ]
  }
]

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
})
