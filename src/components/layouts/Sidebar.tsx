import * as React from 'react'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SidebarProps {
  page: string
  setPage: (p: string) => void
}

export default React.memo(function Sidebar({ page, setPage }: SidebarProps) {
  const menu = React.useMemo(
    () => [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'LayoutDashboard',
        route: '/admin'
      },
      {
        key: 'items',
        label: 'Sản phẩm',
        icon: 'Package',
        route: '/admin/items'
      },
      {
        key: 'categories',
        label: 'Danh mục',
        icon: 'Layers',
        route: '/admin/categories'
      },
      {
        key: 'suppliers',
        label: 'Nhà cung cấp',
        icon: 'Factory',
        route: '/admin/suppliers'
      },
      {
        key: 'customers',
        label: 'Khách hàng',
        icon: 'Users',
        route: '/admin/customers'
      },
      {
        key: 'warehouse',
        label: 'Kho hàng',
        icon: 'Warehouse',
        route: '/admin/warehouse'
      },
      {
        key: 'import',
        label: 'Nhập kho',
        icon: 'Download',
        route: '/admin/import'
      },
      {
        key: 'export',
        label: 'Xuất kho',
        icon: 'Upload',
        route: '/admin/export'
      },
      {
        key: 'orders',
        label: 'Đơn hàng',
        icon: 'ShoppingCart',
        route: '/admin/orders'
      },
      {
        key: 'reports',
        label: 'Báo cáo',
        icon: 'PieChart',
        route: '/admin/reports'
      },
      {
        key: 'settings',
        label: 'Cấu hình',
        icon: 'Settings',
        route: '/admin/settings'
      }
    ],
    []
  )

  const pathname = usePathname()
  const segments = pathname?.split('/').filter(Boolean)
  const current = segments?.[1] || 'dashboard'
  console.log(current)

  return (
    <aside className="w-64 bg-indigo-900 text-white flex flex-col min-h-screen shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-bold">
          K
        </div>
        <span className="text-lg font-semibold tracking-wide">
          KhoB2C Admin
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 space-y-1 pl-3">
        {menu.map((item) => {
          const Icon = (LucideIcons as any)[item.icon]
          const active = item.key === current

          return (
            <Link
              key={item.key}
              href={item.route}
              className={cn(
                'relative flex items-center gap-3 w-full px-5 py-3 text-sm font-medium transition-all duration-300 text-left rounded-l-3xl',
                active
                  ? 'bg-white text-indigo-700 font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              onClick={() => setPage(item.key)}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 text-xs text-white/70">
        © 2025 KhoB2C
      </div>
    </aside>
  )
})
