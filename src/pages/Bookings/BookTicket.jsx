import { useState } from "react";
import { useCreateBooking, useTrains, useSchedules } from "../../hooks";
import BookingForm from "../../components/booking/BookingForm";
import SeatSelector from "../../components/booking/SeatSelector";
import PaymentForm from "../../components/booking/PaymentForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks";
import { normalizeBookingResponse } from "../../services/bookingService.js";

const STEPS = {
  SEATS: "seats",
  CONFIRM: "confirm",
  PAYMENT: "payment",
};

function BookTicket() {
  const navigate = useNavigate();
  const createBooking = useCreateBooking();
  const { user } = useAuth();
  const { data: trains = [] } = useTrains();
  const { data: schedules = [] } = useSchedules();

  const [step, setStep] = useState(STEPS.SEATS);
  const [bookingData, setBookingData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalFare, setTotalFare] = useState(0);

  // ─── Seat selection complete ──────────────────────────────
  const handleSeatsSelected = (result) => {
    setSelectedSeats(result.seats);
    setTotalFare(result.totalPrice);
    setStep(STEPS.CONFIRM);
  };

  // ─── BookingForm confirms details ──────────────────────────
  const handleConfirm = (data) => {
    setBookingData(data);
    setStep(STEPS.PAYMENT);
  };

  // ─── Payment complete ──────────────────────────────────────
  const handlePayment = (paymentData) => {
    const selectedTrain = trains.find(
      (train) => String(train.id) === String(bookingData?.trainId),
    );
    const selectedSchedule = schedules.find(
      (schedule) => String(schedule.id) === String(bookingData?.scheduleId),
    );

    const payload = {
      ...bookingData,
      email: user?.email || bookingData.email,
      passengerName: bookingData?.passengerName || user?.name || "",
      trainId: bookingData?.trainId,
      scheduleId: bookingData?.scheduleId,
      trainName: selectedTrain?.name || selectedTrain?.trainName || "",
      fromStation: selectedSchedule?.fromStation || selectedSchedule?.from_station || "",
      toStation: selectedSchedule?.toStation || selectedSchedule?.to_station || "",
      departureTime: selectedSchedule?.departureTime || selectedSchedule?.departure_time || "",
      arrivalTime: selectedSchedule?.arrivalTime || selectedSchedule?.arrival_time || "",
      seatNumbers: selectedSeats.map((s) => s.id),
      fare: totalFare,
      paymentMethod: paymentData.paymentMethod,
      cardLast4: paymentData.cardNumber?.slice(-4) || "",
    };

    createBooking.mutate(payload, {
      onSuccess: (response) => {
        const booking = normalizeBookingResponse(response, payload);
        toast.success("Booking confirmed!");
        navigate("/bookings/confirm", { state: { booking } });
      },
      onError: (err) => {
        const message = err.response?.data?.message || err.message || "Booking failed";
        toast.error(message);
      },
    });
  };

  // ─── Progress indicator ────────────────────────────────────
  const stepOrder = Object.values(STEPS);
  const currentStepIndex = stepOrder.indexOf(step);

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {stepOrder.map((s, index) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s
                  ? "bg-red-600 text-white"
                  : index < currentStepIndex
                  ? "bg-green-600 text-white"
                  : "bg-zinc-700 text-gray-400"
              }`}
            >
              {index + 1}
            </div>
            {index < stepOrder.length - 1 && (
              <div
                className={`w-12 h-0.5 ${
                  index < currentStepIndex ? "bg-green-600" : "bg-zinc-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Seats */}
      {step === STEPS.SEATS && (
        <SeatSelector
          onBookingComplete={handleSeatsSelected}
          bookedSeats={[]} // Fetch from API if needed
        />
      )}

      {/* Step 2: Confirm Details (with auto-filled user info) */}
      {step === STEPS.CONFIRM && (
        <BookingForm
          onAdd={handleConfirm}
          isSubmitting={false}
          preselectedSeats={selectedSeats.map((s) => s.id)}
          preselectedFare={totalFare}
        />
      )}

      {/* Step 3: Payment */}
      {step === STEPS.PAYMENT && (
        <PaymentForm
          onPay={handlePayment}
          fare={totalFare}
          isSubmitting={createBooking.isPending}
        />
      )}
    </div>
  );
}

export default BookTicket;