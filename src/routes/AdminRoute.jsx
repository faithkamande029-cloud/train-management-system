import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader/Loader";
import AdminLayout from "../layouts/AdminLayout";

function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default AdminRoute;
