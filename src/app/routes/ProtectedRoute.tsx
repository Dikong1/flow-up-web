import { useAuth } from '@/shared/hooks/use-auth'
import { Spinner } from '@/shared/ui/shadcn/spinner'
import { Navigate, Outlet, useLocation } from 'react-router'

export const ProtectedRoute = () => {
   const { isLoading, isAuthenticated } = useAuth()
   const location = useLocation()

   if (isLoading) return (
      <div className='h-screen flex justify-center items-center'>
         <Spinner className='size-12' />
      </div>
   )

   if (!isAuthenticated) {
      return <Navigate to="/auth" replace state={{ from: location }} />
   }

   return <Outlet />
}