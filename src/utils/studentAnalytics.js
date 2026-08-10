const normalizeCourseName = (course) => course.trim();

export const getTotalStudents = (students) => students.length;

export const getCourseDistribution = (students) => {
  const total = students.length;
  if (total === 0) return [];

  const courseCounts = students.reduce((counts, student) => {
    const course = normalizeCourseName(student.course);
    counts[course] = (counts[course] || 0) + 1;
    return counts;
  }, {});

  return Object.entries(courseCounts)
    .map(([course, count]) => ({
      course,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
};

export const getTotalCourses = (students) => getCourseDistribution(students).length;

export const getMostPopularCourse = (students) => {
  const distribution = getCourseDistribution(students);
  return distribution.length > 0 ? distribution[0].course : null;
};

export const getLatestStudent = (students) => {
  if (students.length === 0) return null;
  return students[students.length - 1];
};

export const getRecentStudents = (students, limit = 5) => {
  return [...students].reverse().slice(0, limit);
};