'use client'

import { Button, Input, Label } from '@/components/ui'
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
      first_name: '',
      last_name: '',
      phone_number: '',
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
        <div className="flex flex-col items-star justify-between">
          <h2 className="text-2xl font-bold">Register</h2>
          <h6>Let's get you all set up so you can access your personal account</h6>
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <div className="w-full">
            <Input type="text" {...register('first_name')} />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
          </div>
          <div className="w-full">
            <Input type="text" {...register('last_name')} />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <div className="w-full">
            <Input type="email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <Input type="number" {...register('phone_number')} />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
          </div>
        </div>
        <div>
          <Input type="text" {...register('password')} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <Input type="text" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <Label className="font-medium">
            <Input type="checkbox" className="w-4 h-4" />
            <span>
              I agree to all the
              <Link href={'/terms'} className="text-red-500">
                {' Terms '}
              </Link>
              and
              <Link href={'/terms'} className="text-red-500">
                {' Privacy Polices'}
              </Link>
            </span>
          </Label>
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </Button>
      <div className="flex items-center justify-center mt-2 font-medium">
        <Label>Already have an account?</Label>
        <Link href={'/sign-in'} className="px-1 text-sm text-red-500">
          {'Login'}
        </Link>
      </div>
    </form>
  )
}
