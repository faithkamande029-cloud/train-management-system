import httpClient from "./httpClient";

export const getTrains = () => httpClient.get("/trains");
export const getTrainById = (id) => httpClient.get(`/trains/${id}`);
export const addTrain = (data) => httpClient.post("/trains", data);
export const updateTrain = (id, data) => httpClient.put(`/trains/${id}`, data);
export const deleteTrain = (id) => httpClient.delete(`/trains/${id}`);