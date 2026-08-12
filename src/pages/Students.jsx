import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import StudentTable from "../components/students/StudentTable/StudentTable.jsx";
import StudentModal from "../components/students/StudentModal/StudentModal.jsx";
import StudentForm from "../components/students/StudentForm/StudentForm.jsx";
import Button from "../components/common/Button/Button.jsx";
import styles from "./Students.module.css";

const ALL_COURSES_VALUE = "";

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState(ALL_COURSES_VALUE);

  const uniqueCourses = useMemo(() => {
    const courseSet = new Set(students.map((student) => student.course.trim()));
    return Array.from(courseSet).sort((a, b) => a.localeCompare(b));
  }, [students]);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query);

      const matchesCourse =
        !courseFilter || student.course.trim() === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, courseFilter]);

  const isFilterActive =
    searchTerm.trim().length > 0 || courseFilter !== ALL_COURSES_VALUE;

  const clearFilters = () => {
    setSearchTerm("");
    setCourseFilter(ALL_COURSES_VALUE);
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleSubmit = (formData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      deleteStudent(id);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Students</h2>
          <p className={styles.subtitle}>Manage student records.</p>
        </div>
        <Button variant="primary" onClick={openAddModal}>
          Add Student
        </Button>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.field}>
          <label htmlFor="student-search" className={styles.filterLabel}>
            Search students
          </label>
          <input
            id="student-search"
            type="text"
            className={styles.searchInput}
            placeholder="Search by name, email, or course..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="course-filter" className={styles.filterLabel}>
            Filter by course
          </label>
          <select
            id="course-filter"
            className={styles.courseSelect}
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
          >
            <option value={ALL_COURSES_VALUE}>All Courses</option>
            {uniqueCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {isFilterActive && (
          <Button variant="secondary" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      <StudentTable
        students={filteredStudents}
        onEdit={openEditModal}
        onDelete={handleDelete}
        isFilterActive={isFilterActive}
      />

      {isModalOpen && (
        <StudentModal
          title={editingStudent ? "Edit Student" : "Add Student"}
          onClose={closeModal}
        >
          <StudentForm
            initialValues={editingStudent}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitLabel={editingStudent ? "Update Student" : "Add Student"}
            existingStudents={students}
          />
        </StudentModal>
      )}
    </section>
  );
};

export default Students;