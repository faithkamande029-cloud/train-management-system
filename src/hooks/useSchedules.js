import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  assignPlatform,
} from "../services/scheduleService.js";
import { unwrapApiData } from "../services/httpClient.js";
import { useTrains } from "./useTrains.js";
import { useStations } from "./useStations.js";

export const SCHEDULES_QUERY_KEY = ["schedules"];

export function normalizeSchedule(schedule, trains = [], stations = []) {
  const train =
    trains.find(
      (item) =>
        String(item.id) === String(schedule.train_id ?? schedule.trainId),
    ) || null;
  const fromStation =
    stations.find(
      (item) =>
        String(item.id) ===
        String(schedule.from_station_id ?? schedule.fromStationId),
    ) || null;
  const toStation =
    stations.find(
      (item) =>
        String(item.id) ===
        String(schedule.to_station_id ?? schedule.toStationId),
    ) || null;

  return {
    ...schedule,
    trainId: schedule.trainId ?? schedule.train_id,
    trainName: train?.name || schedule.trainName || schedule.train || "",
    fromStation:
      fromStation?.name || schedule.fromStation || schedule.from_station || "",
    toStation:
      toStation?.name || schedule.toStation || schedule.to_station || "",
    departureTime:
      schedule.departureTime ??
      schedule.departure_time?.slice(0, 5) ??
      schedule.departure_time ??
      "",
    arrivalTime:
      schedule.arrivalTime ??
      schedule.arrival_time?.slice(0, 5) ??
      schedule.arrival_time ??
      "",
    platform: schedule.platform ?? schedule.platform_number ?? "",
    status: schedule.status || "scheduled",
  };
}

export function useSchedules() {
  const trainsQuery = useTrains();
  const stationsQuery = useStations();

  return useQuery({
    queryKey: SCHEDULES_QUERY_KEY,
    queryFn: getSchedules,
    select: (response) => {
      const schedules = unwrapApiData(response);
      const trains = trainsQuery.data || [];
      const stations = stationsQuery.data || [];
      return Array.isArray(schedules)
        ? schedules.map((schedule) =>
            normalizeSchedule(schedule, trains, stations),
          )
        : [];
    },
    enabled: true,
  });
}

export function useSchedule(id) {
  const trainsQuery = useTrains();
  const stationsQuery = useStations();

  return useQuery({
    queryKey: [...SCHEDULES_QUERY_KEY, id],
    queryFn: () => getScheduleById(id),
    select: (response) => {
      const schedule = unwrapApiData(response);
      return normalizeSchedule(
        schedule,
        trainsQuery.data || [],
        stationsQuery.data || [],
      );
    },
    enabled: !!id,
  });
}

export function useAddSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addSchedule,
    onSuccess: () => qc.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY }),
  });
}

export function useUpdateSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSchedule(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY }),
  });
}

export function useDeleteSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => qc.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY }),
  });
}

export function useAssignPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => assignPlatform(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY }),
  });
}
