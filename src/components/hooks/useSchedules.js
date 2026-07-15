import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  assignPlatform,
} from "../services/scheduleService";

export const SCHEDULES_QUERY_KEY = ["schedules"];

export function useSchedules() {
  return useQuery({
    queryKey: SCHEDULES_QUERY_KEY,
    queryFn: getSchedules,
    select: (res) => res.data,
  });
}

export function useSchedule(id) {
  return useQuery({
    queryKey: [...SCHEDULES_QUERY_KEY, id],
    queryFn: () => getScheduleById(id),
    select: (res) => res.data,
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