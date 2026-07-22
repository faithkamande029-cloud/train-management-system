import httpClient from "./httpClient";

export const getSchedules = () => httpClient.get("/schedules");
export const getScheduleById = (id) => httpClient.get(`/schedules/${id}`);
export const addSchedule = (data) => httpClient.post("/schedules", data);
export const updateSchedule = (id, data) => httpClient.put(`/schedules/${id}`, data);
export const deleteSchedule = (id) => httpClient.delete(`/schedules/${id}`);
export const assignPlatform = (id, data) => httpClient.patch(`/schedules/${id}`, data);