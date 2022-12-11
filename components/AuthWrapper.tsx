
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'

const authRoutes = ['/pin-builder','/user','/user/saved','/user/saved/[boardId]','/user/created']

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const router = useRouter()
  console.log(session)

  if (session.status === 'loading') return null

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  )
}

export default AuthWrapper