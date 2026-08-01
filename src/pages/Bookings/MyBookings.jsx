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

  if (visibleBookings.length === 0) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBookings.map((booking) => (
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
