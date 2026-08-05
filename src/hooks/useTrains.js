import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTrains,
  getTrainById,
  addTrain,
  updateTrain,
  deleteTrain,
} from "../services/trainService.js";
import { unwrapApiData } from "../services/httpClient.js";

export const TRAINS_QUERY_KEY = ["trains"];

function normalizeTrain(train) {
  return {
    ...train,
    id: train.id ?? train.train_id,
    name: train.name ?? train.train_name,
    totalSeats: train.totalSeats ?? train.total_seat ?? train.total_seats,
    availableSeats:
      train.availableSeats ?? train.available_seat ?? train.available_seats,
  };
}

function normalizeTrainsResponse(response) {
  const trains = unwrapApiData(response);
  return Array.isArray(trains) ? trains.map(normalizeTrain) : trains;
}

export function useTrains() {
  return useQuery({
    queryKey: TRAINS_QUERY_KEY,
    queryFn: getTrains,
    select: normalizeTrainsResponse,
  });
}

export function useTrain(id) {
  return useQuery({
    queryKey: [...TRAINS_QUERY_KEY, id],
    queryFn: () => getTrainById(id),
    select: (response) => normalizeTrain(unwrapApiData(response)),
    enabled: !!id,
  });
}

export function useAddTrain() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addTrain,
    onSuccess: () => qc.invalidateQueries({ queryKey: TRAINS_QUERY_KEY }),
  });
}

export function useUpdateTrain() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTrain(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: TRAINS_QUERY_KEY }),
  });
}

export function useDeleteTrain() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTrain,
    onSuccess: () => qc.invalidateQueries({ queryKey: TRAINS_QUERY_KEY }),
  });
}
