// src/routes/AppRoutes.jsx

import { Navigate, Routes, Route } from "react-router-dom";
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
import AdminStationManagement from "../pages/Stations/AdminStationManagement";

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
        <Route path="/schedules" element={<ScheduleManagement />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/bookings/new" element={<BookTicket />} />
        <Route path="/bookings/confirm" element={<BookingConfirmation />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/trains" element={<TrainListPage />} />
        <Route path="/admin/trains/add" element={<AddTrain />} />
        <Route path="/admin/stations" element={<AdminStationManagement />} />
        <Route path="/admin/schedules" element={<ScheduleManagement />} />
        <Route path="/admin/bookings" element={<MyBookings />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;