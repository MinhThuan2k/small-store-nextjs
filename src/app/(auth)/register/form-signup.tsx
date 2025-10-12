/*************  ✨ Windsurf Command ⭐  *************/
import React, { useState } from 'react'
import { zod } from 'zod'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { authService } from '@/services/auth.service'
import Image from 'next/image'
import { Input, Label } from '@/components/ui'
import { motion } from 'framer-motion'

const registerPayloadSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: zod.string().refine((val, { password }) => val === password, {
    message: 'Passwords do not match'
  })
})

const FormRegister = () => {
  const [registerForm, setRegisterForm] = useState<RegisterPayload>({
    email: '',
    password: '',
    confirmPassword: ''
  }))

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
    onSuccess: () => {
      toast.success('Register successfully!', {
        autoClose: 1000,
        onClose: () => {
          redirect('/sign-in', RedirectType.replace)
        }
      })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Register failed!')
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationResult = registerPayloadSchema.safeParse(registerForm)
    if (!validationResult.success) {
      const errors = validationResult.error.issues.reduce<{ [key: string]: string }>((previous, current) => {
        return { ...previous, [current.path[0]]: current.message }
      }, {})
      setRegisterForm((prevState) => ({
        ...prevState,
        ...errors
      }))
      return
    }
    mutate(registerForm)
  }


/*******  4f19c13a-2c0f-4de5-bafc-0be845dc1cb8  *******/