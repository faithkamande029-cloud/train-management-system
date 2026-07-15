import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStations, getStationById, addStation, updateStation, deleteStation } from "../services/stationService";

export const STATIONS_QUERY_KEY = ["stations"];

export function useStations() {
  return useQuery({
    queryKey: STATIONS_QUERY_KEY,
    queryFn: getStations,
    select: (res) => res.data,
  });
}

export function useStation(id) {
  return useQuery({
    queryKey: [...STATIONS_QUERY_KEY, id],
    queryFn: () => getStationById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useAddStation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addStation,
    onSuccess: () => qc.invalidateQueries({ queryKey: STATIONS_QUERY_KEY }),
  });
}

export function useUpdateStation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateStation(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: STATIONS_QUERY_KEY }),
  });
}

export function useDeleteStation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteStation,
    onSuccess: () => qc.invalidateQueries({ queryKey: STATIONS_QUERY_KEY }),
  });
}