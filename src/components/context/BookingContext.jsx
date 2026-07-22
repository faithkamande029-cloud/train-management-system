import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const startBooking = useCallback((bookingData) => {
    setBooking(bookingData);
  }, []);

  const clearBooking = useCallback(() => {
    setBooking(null);
    setSelectedSeat(null);
  }, []);

  const value = {
    booking,
    selectedSeat,
    setSelectedSeat,
    startBooking,
    clearBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}