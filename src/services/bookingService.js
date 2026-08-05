import httpClient, { unwrapApiData } from "./httpClient.js";

export const getBookings = () => httpClient.get("/bookings");
export const getBookingById = (id) => httpClient.get(`/bookings/${id}`);
export const createBooking = (data) => httpClient.post("/bookings", data);
export const updateBooking = (id, data) =>
  httpClient.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => httpClient.delete(`/bookings/${id}`);

export function normalizeBooking(payload, fallback = {}) {
  const source = payload?.booking ?? payload?.data ?? payload;
  const booking = source && typeof source === "object" ? source : payload;

  if (!booking || typeof booking !== "object") {
    return {
      ...fallback,
      id: fallback.id ?? null,
      status: fallback.status ?? "pending",
    };
  }

  const seatNumbers = Array.isArray(booking.seatNumbers)
    ? booking.seatNumbers
    : booking.seatNumbers || booking.seatNumber || booking.seat_number
      ? String(
          booking.seatNumbers ||
            booking.seatNumber ||
            booking.seat_number ||
            "",
        )
          .split(",")
          .map((seat) => seat.trim())
          .filter(Boolean)
      : [];

  return {
    ...fallback,
    ...booking,
    id:
      booking.id ??
      booking.booking_id ??
      booking.bookingId ??
      fallback.id ??
      null,
    passengerName:
      booking.passengerName ??
      booking.passenger_name ??
      fallback.passengerName ??
      "",
    email: booking.email ?? fallback.email ?? "",
    phone: booking.phone ?? fallback.phone ?? "",
    trainId: booking.trainId ?? booking.train_id ?? fallback.trainId ?? null,
    trainName:
      booking.trainName ??
      booking.train_name ??
      booking.train?.name ??
      fallback.trainName ??
      "",
    fromStation:
      booking.fromStation ??
      booking.from_station ??
      booking.from_station_name ??
      fallback.fromStation ??
      "",
    toStation:
      booking.toStation ??
      booking.to_station ??
      booking.to_station_name ??
      fallback.toStation ??
      "",
    departureTime:
      booking.departureTime ??
      booking.departure_time ??
      fallback.departureTime ??
      "",
    arrivalTime:
      booking.arrivalTime ?? booking.arrival_time ?? fallback.arrivalTime ?? "",
    fare: booking.fare ?? fallback.fare ?? 0,
    status: booking.status ?? fallback.status ?? "confirmed",
    paymentMethod:
      booking.paymentMethod ??
      booking.payment_method ??
      fallback.paymentMethod ??
      "",
    cardLast4:
      booking.cardLast4 ?? booking.card_last4 ?? fallback.cardLast4 ?? "",
    seatNumbers,
    seatNumber:
      booking.seatNumber ?? booking.seat_number ?? seatNumbers.join(", ") ?? "",
    createdAt:
      booking.createdAt ?? booking.created_at ?? fallback.createdAt ?? "",
    updatedAt:
      booking.updatedAt ?? booking.updated_at ?? fallback.updatedAt ?? "",
  };
}

export function normalizeBookingResponse(response, fallback = {}) {
  return normalizeBooking(unwrapApiData(response), fallback);
}
