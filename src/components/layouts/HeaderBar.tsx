import { Button, Input } from '@/components/ui'
import * as LucideIcons from 'lucide-react'
export default function HeaderBar({ page }: { page: string }) {
  const Search = (LucideIcons as any)['Search']
  const Bell = (LucideIcons as any)['Bell']
  return (
    <div className='flex items-center justify-between px-6 py-3 bg-white shadow sticky top-0 z-10 border-b'>
      <h2 className='text-xl font-semibold capitalize'>{page}</h2>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          {Search && (
            <Search className='w-4 h-4 absolute left-3 top-2.5 text-slate-400' />
          )}
          <Input
            placeholder='Tìm kiếm...'
            className='pl-9 pr-2 w-64 rounded-full border-slate-200'
          />
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='relative rounded-full hover:bg-slate-100'
        >
          {Bell && <Bell className='w-5 h-5' />}
          <span className='absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full' />
        </Button>
        <div className='w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md' />
      </div>
    </div>
  )
}
