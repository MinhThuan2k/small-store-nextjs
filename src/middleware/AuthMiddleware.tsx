import { OverlayLoading } from '@/components/ui/loading/OverlayLoading'
import { loginSuccess, logout } from '@/redux/actions/authActions'
import { useReduxDispatch } from '@/redux/hooks'
import { RootStateRedux } from '@/redux/store'
import { userService } from '@/services/user.service'
import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export const AuthMiddleware = ({ children }: Props) => {
  const dispatch = useReduxDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(
    (state: RootStateRedux) => state.auth.isAuthenticated
  )
  const [isChecking, setIsChecking] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      userService
        .profile()
        .then((user) => {
          dispatch(loginSuccess({ user, token }))
        })
        .catch(() => {
          dispatch(logout())
          navigate('/', { replace: true })
        })
        .finally(() => {
          setIsChecking(false)
        })
    } else {
      dispatch(logout())
      setIsChecking(false)
      navigate('/', { replace: true })
    }
  }, [dispatch, navigate])

  if (isChecking || !isAuthenticated) {
    return <OverlayLoading />
  }

  return children
}
