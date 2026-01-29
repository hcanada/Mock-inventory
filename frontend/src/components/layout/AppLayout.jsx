import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-950 noise-overlay">
      <Sidebar />
      <div className="lg:pl-72">
        <Navbar />
        <main className="py-8 px-4 sm:px-6 lg:px-10">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
