import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader/Loader";
import AdminLayout from "../layouts/AdminLayout";

function AdminRoute() {
  const { user, isLoading } = useAuth();
  const isAuthenticatedAdmin = Boolean(user?.email && user?.role === "admin");

  if (isLoading) {
    return <Loader fullScreen text="Authenticating..." />;
  }

  if (!isAuthenticatedAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default AdminRoute;
