import { useState } from "react";
import { useCreateBooking } from "../../hooks";
import BookingForm from "../../components/booking/BookingForm";
import SeatSelector from "../../components/booking/SeatSelector";
import PaymentForm from "../../components/booking/PaymentForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks";

const STEPS = {
  DETAILS: "details",
  SEATS: "seats",
  PAYMENT: "payment",
  CONFIRM: "confirm",
};

function BookTicket() {
  const navigate = useNavigate();
  const createBooking = useCreateBooking();
  const { user } = useAuth();

  const [step, setStep] = useState(STEPS.DETAILS);
  const [bookingData, setBookingData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalFare, setTotalFare] = useState(0);

  const handleDetailsSubmit = (data) => {
    setBookingData(data);
    setStep(STEPS.SEATS);
  };

  const handleSeatsSelected = (result) => {
    setSelectedSeats(result.seats);
    setTotalFare(result.totalPrice);
    setStep(STEPS.PAYMENT);
  };

  const handlePayment = (paymentData) => {
    const payload = {
      ...bookingData,
      // Ownership must be assigned from the authenticated account, never a form value.
      email: user?.email || bookingData.email,
      seatNumbers: selectedSeats.map((s) => s.id),
      fare: totalFare,
      paymentMethod: paymentData.paymentMethod,
      cardLast4: paymentData.cardNumber.slice(-4),
    };

    createBooking.mutate(payload, {
      onSuccess: (response) => {
        setStep(STEPS.CONFIRM);
        toast.success("Booking confirmed!");
        navigate("/bookings/confirm", { state: { booking: response.data } });
      },
      onError: (err) => {
        const message = err.response?.data?.message || err.message || "Booking failed";
        toast.error(message);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {Object.values(STEPS).map((s, index) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s ? "bg-red-600 text-white" :
              index < Object.values(STEPS).indexOf(step) ? "bg-green-600 text-white" :
              "bg-zinc-700 text-gray-400"
            }`}>
              {index + 1}
            </div>
            {index < Object.values(STEPS).length - 1 && (
              <div className={`w-12 h-0.5 ${index < Object.values(STEPS).indexOf(step) ? "bg-green-600" : "bg-zinc-700"}`} />
            )}
          </div>
        ))}
      </div>

      {step === STEPS.DETAILS && (
        <BookingForm onAdd={handleDetailsSubmit} isSubmitting={false} />
      )}

      {step === STEPS.SEATS && (
        <SeatSelector
          onBookingComplete={handleSeatsSelected}
          bookedSeats={[]} // Fetch from API if needed
        />
      )}

      {step === STEPS.PAYMENT && (
        <PaymentForm
          onPay={handlePayment}
          fare={totalFare}
          isSubmitting={createBooking.isPending}
        />
      )}

      {step === STEPS.CONFIRM && <p className="text-center text-gray-600">Opening confirmation…</p>}
    </div>
  );
}

export default BookTicket;
