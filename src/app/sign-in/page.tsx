/** @format */

import RandomDecorations from '@/components/ui/RandomDecorations'
import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <div className='relative flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] p-6 md:p-10 overflow-hidden'>
      <RandomDecorations />
      <LoginForm />
    </div>
  )
}
