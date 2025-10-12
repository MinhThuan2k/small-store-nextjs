import { Button, Input } from '@/components/ui'
import { RegisterPayload, registerPayloadSchema } from '@/schemaValidators/auth.validator'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterPayload>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(registerPayloadSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data)
  })

  const onSubmit = (payload: RegisterPayload) => {
    if (isPending) return
    mutate(payload)
  }

  const loading = isSubmitting || isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Register</h2>
          <Link href="/sign-in">
            <a className="text-blue-500 hover:underline">Sign in</a>
          </Link>
        </div>
        <div>
          <Input type="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="text" {...register('password')} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <Input type="text" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </Button>
    </form>
  )
}
