import { useState, useEffect } from "react";
import {
  getStudents,
  createStudent,
  updateStudent as updateStudentApi,
  deleteStudent as deleteStudentApi,
} from "../services/studentApi.js";
import { useAuth } from "../context/AuthContext.jsx";

export const useStudents = () => {
  const { logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAuthError = (err) => {
    if (err.status === 401) {
      logout();
      return true;
    }
    return false;
  };

  useEffect(() => {
    let isMounted = true;

    getStudents()
      .then((data) => {
        if (isMounted) setStudents(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        if (!handleAuthError(err)) {
          setError("Unable to load students. Please make sure the backend is running.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addStudent = async (studentData) => {
    try {
      const newStudent = await createStudent(studentData);
      setStudents((prev) => [newStudent, ...prev]);
      setError(null);
      return true;
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.message || "Unable to add student.");
      }
      return false;
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      const updated = await updateStudentApi(id, updatedData);
      setStudents((prev) => prev.map((student) => (student.id === id ? updated : student)));
      setError(null);
      return true;
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.message || "Unable to update student.");
      }
      return false;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteStudentApi(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
      setError(null);
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.message || "Unable to delete student.");
      }
    }
  };

  const dismissError = () => setError(null);

  return {
    students,
    isLoading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    dismissError,
  };
};