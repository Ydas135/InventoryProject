import { useAuth } from '../hooks/useAuth'
import { Outlet, Navigate } from 'react-router';

export const ProtectedRoute = () => {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }
  return (
    <Outlet />
  )
}