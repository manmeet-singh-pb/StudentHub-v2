import { useState } from "react";
import { initialCourses } from "../constants/initialCourses.js";
import { generateCourseId } from "../utils/generateCourseId.js";

export const useCourses = () => {
  const [courses, setCourses] = useState(initialCourses);

  const addCourse = (courseData) => {
    const newCourse = {
      id: generateCourseId(),
      ...courseData,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (id, updatedData) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, ...updatedData } : course
      )
    );
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return { courses, addCourse, updateCourse, deleteCourse };
};