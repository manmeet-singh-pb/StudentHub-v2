import { useState } from "react";
import { useStudents } from "../hooks/useStudents.js";
import StudentTable from "../components/students/StudentTable/StudentTable.jsx";
import StudentModal from "../components/students/StudentModal/StudentModal.jsx";
import StudentForm from "../components/students/StudentForm/StudentForm.jsx";
import styles from "./Students.module.css";

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

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

      <StudentTable
        students={students}
        onEdit={openEditModal}
        onDelete={handleDelete}
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
          />
        </StudentModal>
      )}
    </section>
  );
};

export default Students;