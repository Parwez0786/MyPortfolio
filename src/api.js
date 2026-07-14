import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

export const getProjects = () => api.get("/api/projects");

export const loginAdmin = (password) =>
  api.post("/api/auth/login", { password });

export const createProject = (formData, token) =>
  api.post("/api/projects", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateProject = (id, formData, token) =>
  api.put(`/api/projects/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteProject = (id, token) =>
  api.delete(`/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getResume = () => api.get("/api/resume");

export const uploadResume = (formData, token) =>
  api.post("/api/resume", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default api;
