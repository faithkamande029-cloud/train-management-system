import httpClient from "./httpClient";

export const getBookings = () => httpClient.get("/bookings");
export const getBookingById = (id) => httpClient.get(`/bookings/${id}`);
export const createBooking = (data) => httpClient.post("/bookings", data);
export const updateBooking = (id, data) => httpClient.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => httpClient.delete(`/bookings/${id}`);