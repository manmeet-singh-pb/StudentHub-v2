export const validateCourse = (formData, existingCourses = [], currentCourseId = null) => {
  const errors = {};

  const name = formData.name.trim();
  const department = formData.department.trim();

  if (!name) {
    errors.name = "Course name is required.";
  } else {
    const isDuplicate = existingCourses.some(
      (course) =>
        course.id !== currentCourseId &&
        course.name.trim().toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      errors.name = "A course with this name already exists.";
    }
  }

  if (!department) {
    errors.department = "Department is required.";
  }

  return errors;
};