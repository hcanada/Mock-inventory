import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center lg:hidden">
            <h1 className="text-lg font-bold text-gray-900">Inventory MS</h1>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.name}</span>
              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
