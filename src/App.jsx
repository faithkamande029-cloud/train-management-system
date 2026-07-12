import { Link, NavLink } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/trains', label: 'Trains' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/bookings', label: 'Bookings' },
];

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark"></span>
          <span>TrainU</span>
        </Link>
        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {item.label}
            </NavLink>
          ))}
          {user?.role === 'admin' ? (
            <>
              <NavLink to="/stations" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Stations
              </NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Admin
              </NavLink>
            </>
          ) : null}
        </nav>
        {user ? (
          <div className="row-actions">
            <span className="badge">Signed in as {user.role === 'admin' ? 'Admin' : 'User'}</span>
            <Link to="/login" className="pill-button">Switch account</Link>
            <button type="button" className="pill-button" onClick={logout}>Sign out</button>
          </div>
        ) : (
          <Link to="/login" className="pill-button">Login</Link>
        )}
      </header>

      <main className="page-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
