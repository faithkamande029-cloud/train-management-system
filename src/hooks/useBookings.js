import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "../services/bookingService";
import { unwrapApiData } from "../services/httpClient";

export const BOOKINGS_QUERY_KEY = ["bookings"];

export function useBookings() {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: getBookings,
    select: unwrapApiData,
  });
}

export function useBooking(id) {
  return useQuery({
    queryKey: [...BOOKINGS_QUERY_KEY, id],
    queryFn: () => getBookingById(id),
    select: unwrapApiData,
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY }),
  });
}

export function useUpdateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBooking(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY }),
  });
}

export function useDeleteBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY }),
  });
}
