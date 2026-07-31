import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';
import { TrainFront } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/trains', label: 'Trains' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/bookings', label: 'Bookings' },
];

function App() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute ? (
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <TrainFront className="h-8 w-8 text-red-500" />
                <span className="text-lg font-bold uppercase tracking-[0.2em] text-white">GARILM</span>
              </Link>
            </div>

            <nav className="hidden items-center gap-2 text-sm font-semibold text-zinc-300 md:flex lg:gap-6 lg:text-base">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `transition hover:text-white ${isActive ? "text-white" : "text-zinc-300"}`}
                >
                  {item.label}
                </NavLink>
              ))}
              {user?.role === 'admin' ? (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => `transition hover:text-white ${isActive ? "text-white" : "text-zinc-300"}`}
                >
                  Admin
                </NavLink>
              ) : null}
            </nav>

            <div className="flex items-center gap-2">
              {user ? (
                <button type="button" onClick={logout} className="rounded-lg border border-red-500/40 bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
                  Log out
                </button>
              ) : (
                <Link to="/login" className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>
      ) : null}
      
      <main className="page-content flex flex-col min-h-screen">
        <div className="flex-1">
          <AppRoutes />
        </div>

      </main>
    </div>
  );
}

export default App;
