import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import TrainList from './pages/Trains/TrainList';
import TrainDetails from './pages/Trains/TrainDetails';
import AddTrain from './pages/Trains/AddTrain';
import StationManagement from './pages/Stations/StationManagement';
import ScheduleManagement from './pages/Schedules/ScheduleManagement';
import BookTicket from './pages/Bookings/BookTicket';
import MyBookings from './pages/Bookings/MyBookings';
import BookingConfirmation from './pages/Bookings/BookingConfirmation';
import UserManagement from './pages/Admin/UserManagement';
import Reports from './pages/Admin/Reports';
import NotFound from './pages/NotFound/NotFound';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/trains', label: 'Trains' },
  { to: '/stations', label: 'Stations' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/bookings', label: 'Bookings' },
  { to: '/admin/users', label: 'Admin' },
];

function App() {
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
        </nav>
        <Link to="/login" className="pill-button">
          Staff Login
        </Link>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/trains/add" element={<AddTrain />} />
          <Route path="/trains/:trainId" element={<TrainDetails />} />
          <Route path="/stations" element={<StationManagement />} />
          <Route path="/schedules" element={<ScheduleManagement />} />
          <Route path="/bookings" element={<BookTicket />} />
          <Route path="/bookings/my" element={<MyBookings />} />
          <Route path="/bookings/confirmation" element={<BookingConfirmation />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
