import httpClient from "./httpClient";

export const getStations = () => httpClient.get("/stations");
export const getStationById = (id) => httpClient.get(`/stations/${id}`);
export const addStation = (data) => httpClient.post("/stations", data);
export const updateStation = (id, data) => httpClient.put(`/stations/${id}`, data);
export const deleteStation = (id) => httpClient.delete(`/stations/${id}`);