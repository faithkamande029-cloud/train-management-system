import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTrains, addTrain, updateTrain, deleteTrain } from "../services/trainService";

export const TRAINS_QUERY_KEY = ["trains"];

export function useTrains() {
  return useQuery({
    queryKey: TRAINS_QUERY_KEY,
    queryFn: getTrains,
    select: (res) => res.data,
  });
}

export function useTrain(id) {
  return useQuery({
    queryKey: [...TRAINS_QUERY_KEY, id],
    queryFn: () => getTrainById(id),
    select: (res) => res.data,
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