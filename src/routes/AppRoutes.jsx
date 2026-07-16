// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import TrainListPage from "../pages/Trains/TrainList";
import TrainDetailsPage from "../pages/Trains/TrainDetails";
import AddTrain from "../pages/Trains/AddTrain";
import ScheduleManagement from "../pages/Schedules/ScheduleManagement";
import BookTicket from "../pages/Bookings/BookTicket";
import MyBookings from "../pages/Bookings/MyBookings";
import BookingConfirmation from "../pages/Bookings/BookingConfirmation";
import UserManagement from "../pages/Admin/UserManagement";
import Reports from "../pages/Admin/Reports";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SeatSelector from "../components/booking/SeatSelector";

// stations
import AdminStationManagement from "../pages/Stations/AdminStationManagement";
import AdminLayout from "../layouts/AdminLayout";

// admin layout
// import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trains" element={<TrainListPage />} />
        <Route path="/trains/:id/seats" element={<SeatSelector />} />
        <Route path="/trains/:id" element={<TrainDetailsPage />} />
        {/* Route for schedule management */}
        <Route path="/schedules" element={<ScheduleManagement />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/bookings/new" element={<BookTicket />} />
        <Route path="/bookings/confirm" element={<BookingConfirmation />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/trains/add" element={<AddTrain />} />
        {/* station route */}
        <Route path="/stations" element={<AdminStationManagement />} />
        <Route path="/admin/users" element={<AdminLayout />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>
 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;