import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  normalizeBookingResponse,
} from "../services/bookingService.js";
import { unwrapApiData } from "../services/httpClient.js";

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
    onSuccess: (response, variables) => {
      const createdBooking = normalizeBookingResponse(response, variables);
      qc.setQueryData(BOOKINGS_QUERY_KEY, (currentBookings = []) => {
        const nextBookings = Array.isArray(currentBookings)
          ? [...currentBookings]
          : [];
        if (
          !nextBookings.some(
            (booking) => String(booking.id) === String(createdBooking.id),
          )
        ) {
          nextBookings.unshift(createdBooking);
        }
        return nextBookings;
      });
      qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
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
