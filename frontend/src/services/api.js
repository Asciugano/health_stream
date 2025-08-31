import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export function createUser(data) {
  return api.post("/users/", data);
}

export function createHealthData(data) {
  return api.post("/health/", data);
}

export function getHealthData(userID) {
  return api.get(`/health/${userID}`);
}
