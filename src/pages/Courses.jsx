import { useState, useMemo } from "react";
import { useCourses } from "../hooks/useCourses.js";
import CourseTable from "../components/courses/CourseTable/CourseTable.jsx";
import StudentModal from "../components/students/StudentModal/StudentModal.jsx";
import CourseForm from "../components/courses/CourseForm/CourseForm.jsx";
import styles from "./Courses.module.css";

const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(query) ||
        course.department.toLowerCase().includes(query)
      );
    });
  }, [courses, searchTerm]);

  const openAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = (formData) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmed) {
      deleteCourse(id);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Courses</h2>
          <p className={styles.subtitle}>Manage available courses.</p>
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={openAddModal}
        >
          Add Course
        </button>
      </div>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by name or department..."
        aria-label="Search courses"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <CourseTable
        courses={filteredCourses}
        onEdit={openEditModal}
        onDelete={handleDelete}
        isSearchActive={searchTerm.trim().length > 0}
      />

      {isModalOpen && (
        <StudentModal
          title={editingCourse ? "Edit Course" : "Add Course"}
          onClose={closeModal}
        >
          <CourseForm
            initialValues={editingCourse}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitLabel={editingCourse ? "Update Course" : "Add Course"}
            existingCourses={courses}
          />
        </StudentModal>
      )}
    </section>
  );
};

export default Courses;