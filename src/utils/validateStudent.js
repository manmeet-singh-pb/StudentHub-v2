const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateStudent = (formData, existingStudents = [], currentStudentId = null) => {
  const errors = {};

  const name = formData.name.trim();
  const email = formData.email.trim();
  const course = formData.course.trim();

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  } else {
    const isDuplicate = existingStudents.some(
      (student) =>
        student.id !== currentStudentId &&
        student.email.trim().toLowerCase() === email.toLowerCase()
    );
    if (isDuplicate) {
      errors.email = "A student with this email already exists.";
    }
  }

  if (!course) {
    errors.course = "Course is required.";
  }

  return errors;
};