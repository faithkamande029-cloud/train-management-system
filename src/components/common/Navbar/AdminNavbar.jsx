import { Link } from "react-router-dom";
import { TrainFront } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <TrainFront className="h-8 w-8 text-red-500" />
          <span className="text-lg font-bold uppercase tracking-wide text-white">GariLM Admin</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
            {user?.name || "Administrator"}
          </span>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
