const STORAGE_KEY = "studenthub-students";

const isValidStudent = (value) => {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    value.id.trim() !== "" &&
    typeof value.name === "string" &&
    value.name.trim() !== "" &&
    typeof value.email === "string" &&
    value.email.trim() !== "" &&
    typeof value.course === "string" &&
    value.course.trim() !== ""
  );
};

const readFromStorage = () => {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { students: null, wasCorrupted: false, hadStorageError: true };
  }

  if (raw === null) {
    return { students: null, wasCorrupted: false, hadStorageError: false };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { students: null, wasCorrupted: true, hadStorageError: false };
  }

  if (!Array.isArray(parsed)) {
    return { students: null, wasCorrupted: true, hadStorageError: false };
  }

  const validStudents = parsed.filter(isValidStudent);
  return { students: validStudents, wasCorrupted: false, hadStorageError: false };
};

export const loadStudents = () => Promise.resolve(readFromStorage());

export const saveStudents = (students) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return Promise.resolve(true);
  } catch {
    return Promise.resolve(false);
  }
};