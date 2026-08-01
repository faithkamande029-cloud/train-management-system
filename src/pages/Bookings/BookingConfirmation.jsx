import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../components/common/Button/Button";

function BookingConfirmation() {
  const { state } = useLocation();
  const booking = state?.booking;
  const reference = booking?.id
    ? String(booking.id).startsWith("BK-") ? booking.id : `BK-${booking.id}`
    : "Booking confirmed";

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
      <div className="bg-zinc-900 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border-t-8 border-zinc-500">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-red-400 text-6xl" />
        </div>
        <p className="text-zinc-400 uppercase tracking-widest font-semibold">Booking Confirmation</p>
        <h2 className="text-3xl font-bold text-white mt-3">Booking Complete</h2>
        <p className="text-gray-400 mt-4">
          Your ticket has been booked successfully. A confirmation has been generated and your booking is now available in the system.
        </p>
        <div className="bg-zinc-800 border border-gray-700 rounded-xl p-6 mt-8">
          <p className="text-zinc-400 text-sm">Booking Reference</p>
          <h3 className="text-3xl font-bold text-red-400 mt-2">{reference}</h3>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <Link to="/bookings">
            <Button>View Booking</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BookingConfirmation;
