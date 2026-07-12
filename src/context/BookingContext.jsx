// src/context/BookingContext.jsx

import { createContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking]           = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const startBooking = (bookingData) => {
    setBooking(bookingData);
  };

  const clearBooking = () => {
    setBooking(null);
    setSelectedSeat(null);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        selectedSeat,
        setSelectedSeat,
        startBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export { BookingContext };
