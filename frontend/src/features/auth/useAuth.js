import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  setCredentials,
  logout,
} from './authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleSetCredentials = (credentials) => {
    dispatch(setCredentials(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff';

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isStaff,
    setCredentials: handleSetCredentials,
    logout: handleLogout,
  };
}
