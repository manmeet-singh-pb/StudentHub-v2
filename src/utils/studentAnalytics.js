const normalizeCourseName = (course) => course.trim();

export const getTotalStudents = (students) => students.length;

export const getTotalCourses = (students) => {
  const uniqueCourses = new Set(
    students.map((student) => normalizeCourseName(student.course))
  );
  return uniqueCourses.size;
};

export const getMostPopularCourse = (students) => {
  if (students.length === 0) return null;

  const courseCounts = students.reduce((counts, student) => {
    const course = normalizeCourseName(student.course);
    counts[course] = (counts[course] || 0) + 1;
    return counts;
  }, {});

  let topCourse = null;
  let topCount = 0;

  Object.entries(courseCounts).forEach(([course, count]) => {
    if (count > topCount) {
      topCourse = course;
      topCount = count;
    }
  });

  return topCourse;
};

export const getLatestStudent = (students) => {
  if (students.length === 0) return null;
  return students[students.length - 1];
};