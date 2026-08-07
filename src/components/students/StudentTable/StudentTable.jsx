import PropTypes from "prop-types";
import StudentRow from "./StudentRow.jsx";
import styles from "./StudentTable.module.css";

const StudentTable = ({ students, onEdit, onDelete, isSearchActive = false }) => {
  if (students.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          {isSearchActive ? "No matching students found." : "No students found."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.headerCell}>
              Name
            </th>
            <th scope="col" className={styles.headerCell}>
              Email
            </th>
            <th scope="col" className={styles.headerCell}>
              Course
            </th>
            <th scope="col" className={styles.headerCell}>
              Actions
            </th>
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
    </div>
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
  isSearchActive: PropTypes.bool,
};

export default StudentTable;