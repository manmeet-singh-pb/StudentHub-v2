import PropTypes from "prop-types";
import styles from "./StudentRow.module.css";

const StudentRow = ({ student, onEdit, onDelete }) => {
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{student.name}</td>
      <td className={styles.cell}>{student.email}</td>
      <td className={styles.cell}>{student.course}</td>
      <td className={styles.cell}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(student)}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

StudentRow.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentRow;