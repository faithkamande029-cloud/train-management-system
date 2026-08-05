import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../components/common/Button/Button";
import { normalizeBooking } from "../../services/bookingService.js";

function BookingConfirmation() {
  const { state } = useLocation();
  const booking = normalizeBooking(state?.booking);
  const reference = booking?.id
    ? String(booking.id).startsWith("BK-") ? booking.id : `BK-${booking.id}`
    : "Booking confirmed";
  const seatSummary = Array.isArray(booking?.seatNumbers) && booking.seatNumbers.length
    ? booking.seatNumbers.join(", ")
    : booking?.seatNumber || "—";

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="border-b border-zinc-800 bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-900 px-8 py-10 text-center">
          <div className="mb-4 flex justify-center">
            <FaCheckCircle className="text-red-400 text-6xl" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">Booking Confirmation</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Booking Complete</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400">
            Your ticket is ready. Review your trip details below and jump straight to your dashboard or booking history.
          </p>
        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">Train details</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{booking?.trainName || "Journey booked"}</h3>
              </div>
              <span className="rounded-full bg-green-600/15 px-3 py-1 text-sm font-semibold text-green-400">
                {booking?.status || "confirmed"}
              </span>
            </div>

            <div className="mt-6 space-y-3 text-sm text-zinc-300">
              <div className="flex items-center justify-between rounded-lg bg-zinc-800/80 px-4 py-3">
                <span className="text-zinc-400">Route</span>
                <span className="font-semibold text-white">{booking?.fromStation || "—"} → {booking?.toStation || "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-800/80 px-4 py-3">
                <span className="text-zinc-400">Departure</span>
                <span className="font-semibold text-white">{booking?.departureTime || "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-800/80 px-4 py-3">
                <span className="text-zinc-400">Seats</span>
                <span className="font-semibold text-white">{seatSummary}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-800/80 px-4 py-3">
                <span className="text-zinc-400">Fare</span>
                <span className="font-semibold text-white">Ksh {Number(booking?.fare || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">Booking reference</p>
            <h3 className="mt-2 text-3xl font-bold text-red-400">{reference}</h3>

            <div className="mt-6 space-y-3 text-sm text-zinc-300">
              <div className="flex justify-between gap-4"><span className="text-zinc-400">Passenger</span><span className="font-medium text-white">{booking?.passengerName || "—"}</span></div>
              <div className="flex justify-between gap-4"><span className="text-zinc-400">Email</span><span className="font-medium text-white">{booking?.email || "—"}</span></div>
              <div className="flex justify-between gap-4"><span className="text-zinc-400">Train</span><span className="font-medium text-white">{booking?.trainName || booking?.trainId || "—"}</span></div>
              <div className="flex justify-between gap-4"><span className="text-zinc-400">Payment</span><span className="font-medium text-white">{booking?.paymentMethod || "—"}{booking?.cardLast4 ? ` •••• ${booking.cardLast4}` : ""}</span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-t border-zinc-800 px-8 py-8">
          <Link to="/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
          <Link to="/bookings">
            <Button>View My Bookings</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BookingConfirmation;
