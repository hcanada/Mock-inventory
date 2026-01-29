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
    <nav className="sticky top-0 z-40 bg-surface-950/80 backdrop-blur-xl border-b border-surface-700/50">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16">
          {/* Mobile logo */}
          <div className="flex items-center lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-cyan flex items-center justify-center">
                <svg className="w-5 h-5 text-surface-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <span className="font-display font-bold text-surface-100">Inventory</span>
            </div>
          </div>

          <div className="flex-1" />

          {/* User section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-violet to-accent-rose flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-accent-violet/20">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-surface-100">{user?.name}</p>
                <p className="text-xs text-surface-400 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-surface-700/50" />

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-surface-400 hover:text-accent-rose rounded-lg transition-all duration-200 hover:bg-accent-rose/10"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
