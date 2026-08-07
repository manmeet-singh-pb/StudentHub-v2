import { useState } from "react";
import { initialStudents } from "../constants/initialStudents.js";
import { generateStudentId } from "../utils/generateStudentId.js";

export const useStudents = () => {
  const [students, setStudents] = useState(initialStudents);

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

  return { students, addStudent, updateStudent, deleteStudent };
};