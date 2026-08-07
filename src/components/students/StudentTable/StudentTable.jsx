import PropTypes from "prop-types";
import StudentRow from "./StudentRow.jsx";
import styles from "./StudentTable.module.css";

const StudentTable = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return <p className={styles.emptyMessage}>No students found.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.headerCell}>Name</th>
          <th className={styles.headerCell}>Email</th>
          <th className={styles.headerCell}>Course</th>
          <th className={styles.headerCell}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

StudentTable.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentTable;