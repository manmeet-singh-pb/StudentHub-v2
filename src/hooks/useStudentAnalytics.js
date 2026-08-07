import { useMemo } from "react";
import {
  getTotalStudents,
  getTotalCourses,
  getMostPopularCourse,
  getLatestStudent,
} from "../utils/studentAnalytics.js";

export const useStudentAnalytics = (students) => {
  return useMemo(
    () => ({
      totalStudents: getTotalStudents(students),
      totalCourses: getTotalCourses(students),
      mostPopularCourse: getMostPopularCourse(students),
      latestStudent: getLatestStudent(students),
    }),
    [students]
  );
};