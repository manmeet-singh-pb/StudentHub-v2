const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || "Something went wrong.");
    error.status = response.status;
    throw error;
  }

  return data;
};

export const getStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/students`);
  const data = await handleResponse(response);
  return data.students;
};

export const getStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`);
  return handleResponse(response);
};

export const createStudent = async (student) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return handleResponse(response);
};

export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return handleResponse(response);
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};