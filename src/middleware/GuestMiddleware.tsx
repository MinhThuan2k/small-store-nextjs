import { RootStateRedux } from '@/redux/store'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export const GuestMiddleware = ({ children }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootStateRedux) => state.auth.isAuthenticated
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/projects/jira', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <AnimatePresence mode='wait'>
      {!isAuthenticated && (
        <motion.div
          key='guest-content'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='min-h-screen'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
