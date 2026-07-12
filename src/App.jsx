import { Link, NavLink } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <header className="max-w-8xl mx-auto grid grid-cols-3 items-center px-7 py-3 bg-zinc-950">
        {/* logo */}
        <div className="justify-self-start">
          <Link to="/" className="flex items-center gap-2">
            <TrainFront className='w-10 h-10 text-red-500'/> 
            <span className=' font-bold uppercase text-white'>GariLM</span>
          </Link>
        </div>       
  
        {/* nav-links */}
        <nav className="flex justify-self-center items-center gap-2 md:gap-5 lg:gap-6 text-white text-sm md:text-base lg:text-lg font-semibold">
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
        
        {/* pill-button */}
        <div className='justify-self-end bg-red-500 p-1.5 rounded-xl hover:bg-zinc-400  cursor-pointer '>
          <Link 
            to="/login" 
            className="text-white font-semibold">
            {user ? 'Signed In' : 'User Login'}
          </Link>
        </div>        
      </header>

      <main className="page-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
