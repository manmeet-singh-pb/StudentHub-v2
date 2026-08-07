import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import StudentTable from "../components/students/StudentTable/StudentTable.jsx";
import StudentModal from "../components/students/StudentModal/StudentModal.jsx";
import StudentForm from "../components/students/StudentForm/StudentForm.jsx";
import styles from "./Students.module.css";

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return students;

    return students.filter((student) => {
      return (
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query)
      );
    });
  }, [students, searchTerm]);

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
        <button
          type="button"
          className={styles.addButton}
          onClick={openAddModal}
        >
          Add Student
        </button>
      </div>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by name, email, or course..."
        aria-label="Search students"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <StudentTable
        students={filteredStudents}
        onEdit={openEditModal}
        onDelete={handleDelete}
        isSearchActive={searchTerm.trim().length > 0}
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
          />
        </StudentModal>
      )}
    </section>
  );
};

export default Students;