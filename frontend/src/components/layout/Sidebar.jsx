import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', adminOnly: false },
  { name: 'Inventory', href: '/inventory', adminOnly: false },
  { name: 'Activity Logs', href: '/logs', adminOnly: true },
];

export function Sidebar() {
  const { isAdmin } = useAuth();

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-gray-800 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-white">Inventory MS</h1>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
