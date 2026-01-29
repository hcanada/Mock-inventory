import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';

export function AdminRoute({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
