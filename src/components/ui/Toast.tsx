import { toast, ToastContent, ToastOptions } from 'react-toastify'

const baseConfig = {
  autoClose: 1000
}

export function ToastSuccess(content: ToastContent<'success'>, options?: ToastOptions<'success'>) {
  return toast.success(content, {
    ...baseConfig,
    ...options
  })
}

export function ToastError(content: ToastContent<'error'>, options?: ToastOptions<'error'>) {
  return toast.error(content, {
    ...baseConfig,
    ...options
  })
}
