import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui'
import * as LucideIcons from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Shelfs', value: 10, icon: 'Boxes' },
    { label: 'Total Medicines', value: 22, icon: 'Pill' },
    { label: 'Total Stock Quantity', value: 2287, icon: 'Database' },
    { label: 'Total Suppliers', value: 10, icon: 'Factory' },
    { label: 'Total Purchase Amount', value: '66,767', icon: 'CreditCard' },
    { label: 'Number of Sales', value: 50, icon: 'ShoppingCart' }
  ]

  const lowStock = [
    { name: 'Paracetamol', batch: '2024001', quantity: 10, price: 12, buy: 8 },
    { name: 'Ibuprofen', batch: '2024002', quantity: 5, price: 15, buy: 9 },
    { name: 'Aspirin', batch: '2024003', quantity: 8, price: 10, buy: 6 },
    { name: 'Amoxicillin', batch: '2024004', quantity: 12, price: 20, buy: 15 }
  ]

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((item) => {
          const Icon = (LucideIcons as any)[item.icon]
          return (
            <Card
              key={item.label}
              className="p-5 flex flex-col items-center justify-center rounded-xl shadow hover:shadow-lg transition bg-white"
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-6 h-6 text-indigo-600" />}
                <div className="text-2xl font-bold">{item.value}</div>
              </div>
              <div className="text-sm text-slate-500 mt-1">{item.label}</div>
            </Card>
          )
        })}
      </div>

      {/* Low Stock Table */}
      <Card className="p-6 rounded-xl bg-white shadow">
        <h3 className="text-lg font-semibold mb-4">Low Stock List</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Medicine Name</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Buying Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStock.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-slate-50">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.batch}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>${row.price}</TableCell>
                <TableCell>${row.buy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
