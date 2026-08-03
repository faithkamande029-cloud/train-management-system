import { useState } from "react";
import { useBookings, useUpdateBooking, useDeleteBooking } from "../../hooks";
import TicketCard from "../../components/booking/TicketCard";
import Modal from "../../components/common/Modal/Modal";
import Button from "../../components/common/Button/Button";
import Loader from "../../components/common/Loader/Loader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

function MyBookings() {
  const { data: bookings, isLoading } = useBookings();
  const { user } = useAuth();
  const updateBooking = useUpdateBooking();
  const deleteBooking = useDeleteBooking();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const isAdmin = user?.role === "admin";
  const visibleBookings = isAdmin
    ? (bookings || [])
    : (bookings || []).filter((booking) => booking.email?.toLowerCase() === user?.email?.toLowerCase());
  const sortedBookings = [...(visibleBookings || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
    const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
    return dateB - dateA;
  });
  const latestBooking = sortedBookings[0];
  const previousBookings = sortedBookings.slice(1, 4);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBooking.mutate(
        { id, data: { status: "cancelled" } },
        {
          onSuccess: () => {
            toast.success("Booking cancelled");
            setSelectedBooking(null);
          },
          onError: (err) => toast.error(err.message || "Failed to cancel booking"),
        }
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      deleteBooking.mutate(id, {
        onSuccess: () => {
          toast.success("Booking deleted");
          setSelectedBooking(null);
        },
        onError: (err) => toast.error(err.message || "Failed to delete booking"),
      });
    }
  };

  if (isLoading) return <Loader />;

  if (sortedBookings.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-gray-400">No bookings found.</p>
        <Button className="mt-4" onClick={() => navigate("/bookings/new")}>
          Book a Ticket
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-3 space-y-6 px-6 py-5">
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="uppercase tracking-widest font-bold text-xl">{isAdmin ? "Booking management" : "Passenger portal"}</p>
          <h2 className="text-xl font-bold text-zinc-600 mt-2">{isAdmin ? "All bookings" : "My bookings"}</h2>
        </div>
        <Button onClick={() => navigate("/bookings/new")}>Book New Ticket</Button>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">Booking history</p>
            <h3 className="mt-2 text-xl font-bold text-white">Your recent trips</h3>
          </div>
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            {sortedBookings.length} total
          </span>
        </div>

        {latestBooking ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">Latest booking</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${latestBooking.status === "confirmed" ? "bg-green-600/15 text-green-400" : latestBooking.status === "pending" ? "bg-yellow-600/15 text-yellow-400" : "bg-red-600/15 text-red-400"}`}>
                  {latestBooking.status || "confirmed"}
                </span>
              </div>
              <h4 className="mt-3 text-xl font-bold text-white">{latestBooking.trainName || latestBooking.fromStation || "Journey"}</h4>
              <p className="mt-2 text-sm text-zinc-400">{latestBooking.fromStation || "—"} → {latestBooking.toStation || "—"}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-300">
                <span className="rounded-full bg-zinc-800 px-3 py-1">Seats {latestBooking.seatNumber || latestBooking.seatNumbers?.join(", ") || "—"}</span>
                <span className="rounded-full bg-zinc-800 px-3 py-1">{latestBooking.departureTime || "—"}</span>
                <span className="rounded-full bg-zinc-800 px-3 py-1">Ksh {Number(latestBooking.fare || 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">Previous bookings</p>
              <ul className="mt-4 space-y-3">
                {previousBookings.length > 0 ? previousBookings.map((booking) => (
                  <li key={booking.id} className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-3 text-sm text-zinc-300">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-white">{booking.trainName || booking.fromStation || "Booking"}</span>
                      <span className="text-xs text-zinc-500">{booking.departureTime || "—"}</span>
                    </div>
                    <p className="mt-1 text-zinc-400">{booking.fromStation || "—"} → {booking.toStation || "—"}</p>
                  </li>
                )) : <li className="text-sm text-zinc-500">You will see earlier trips here as soon as you book more.</li>}
              </ul>
            </div>
          </div>
        ) : null}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBookings.map((booking) => (
          <TicketCard
            key={booking.id}
            booking={booking}
            onSelect={setSelectedBooking}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(booking.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Booking Details"
        size="sm"
      >
        {selectedBooking && (
          <div className="mx-auto max-w-md space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-400 text-sm">Passenger</p><p className="text-white font-medium">{selectedBooking.passengerName}</p></div>
              <div><p className="text-gray-400 text-sm">Email</p><p className="text-white font-medium">{selectedBooking.email}</p></div>
              <div><p className="text-gray-400 text-sm">Train</p><p className="text-white font-medium">{selectedBooking.trainId}</p></div>
              <div><p className="text-gray-400 text-sm">Seat</p><p className="text-white font-medium">{selectedBooking.seatNumber}</p></div>
              <div><p className="text-gray-400 text-sm">Fare</p><p className="text-white font-medium">${Number(selectedBooking.fare).toLocaleString()}</p></div>
              <div><p className="text-gray-400 text-sm">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedBooking.status === "confirmed" ? "bg-green-600" :
                  selectedBooking.status === "pending" ? "bg-yellow-600" :
                  "bg-red-600"
                }`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-zinc-600">
              {selectedBooking.status !== "cancelled" && (isAdmin || selectedBooking.email?.toLowerCase() === user?.email?.toLowerCase()) && (
                <Button variant="danger" onClick={() => handleCancelBooking(selectedBooking.id)}>
                  Cancel Booking
                </Button>
              )}
              <Button variant="secondary" onClick={() => setSelectedBooking(null)}>Close</Button>
              {isAdmin && <Button variant="danger" onClick={() => handleDelete(selectedBooking.id)}>Delete</Button>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyBookings;
