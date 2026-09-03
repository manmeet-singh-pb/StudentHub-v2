import { AUTH_TOKEN_KEY } from "../constants/auth.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.message || "Something went wrong.");
    error.status = response.status;
    throw error;
  }
  return data;
};

export const getStudentProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/student/profile`, {
    headers: { ...getAuthHeaders() },
  });
  const data = await handleResponse(response);
  return data.profile;
};