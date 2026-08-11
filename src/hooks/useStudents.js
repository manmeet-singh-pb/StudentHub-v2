import { useState, useEffect } from "react";
import { initialStudents } from "../constants/initialStudents.js";
import { generateStudentId } from "../utils/generateStudentId.js";
import { loadStudents, saveStudents } from "../utils/studentStorage.js";

export const useStudents = () => {
  const [students, setStudents] = useState(() => {
    const { students: loaded, wasCorrupted, hadStorageError } = loadStudents();

    if (wasCorrupted) return [];
    if (hadStorageError || loaded === null) return initialStudents;
    return loaded;
  });

  const [showResetNotice, setShowResetNotice] = useState(() => {
    const { wasCorrupted } = loadStudents();
    return wasCorrupted;
  });

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const addStudent = (studentData) => {
    const newStudent = {
      id: generateStudentId(),
      ...studentData,
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const dismissNotice = () => setShowResetNotice(false);

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    showResetNotice,
    dismissNotice,
  };
};