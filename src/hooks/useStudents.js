import { useState, useEffect } from "react";
import { initialStudents } from "../constants/initialStudents.js";
import { generateStudentId } from "../utils/generateStudentId.js";
import { loadStudents, saveStudents } from "../utils/studentStorage.js";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResetNotice, setShowResetNotice] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadStudents()
      .then(({ students: loaded, wasCorrupted, hadStorageError }) => {
        if (!isMounted) return;

        let nextStudents;
        if (wasCorrupted) {
          nextStudents = [];
          setShowResetNotice(true);
        } else if (hadStorageError || loaded === null) {
          nextStudents = initialStudents;
        } else {
          nextStudents = loaded;
        }

        setStudents(nextStudents);
        // Self-heal: persist the cleaned/seeded result so any corrupted
        // or dropped entries don't linger in storage.
        saveStudents(nextStudents);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load student data. Starting with default students.");
        setStudents(initialStudents);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const persist = (nextStudents) => {
    return saveStudents(nextStudents).then((success) => {
      setError(success ? null : "Your last change couldn't be saved.");
      return success;
    });
  };

  const addStudent = async (studentData) => {
    const newStudent = {
      id: generateStudentId(),
      ...studentData,
    };
    const nextStudents = [...students, newStudent];
    setStudents(nextStudents);
    await persist(nextStudents);
  };

  const updateStudent = async (id, updatedData) => {
    const nextStudents = students.map((student) =>
      student.id === id ? { ...student, ...updatedData } : student
    );
    setStudents(nextStudents);
    await persist(nextStudents);
  };

  const deleteStudent = async (id) => {
    const nextStudents = students.filter((student) => student.id !== id);
    setStudents(nextStudents);
    await persist(nextStudents);
  };

  const dismissNotice = () => setShowResetNotice(false);
  const dismissError = () => setError(null);

  return {
    students,
    isLoading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    showResetNotice,
    dismissNotice,
    dismissError,
  };
};