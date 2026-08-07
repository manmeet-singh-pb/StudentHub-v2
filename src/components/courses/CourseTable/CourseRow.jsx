import PropTypes from "prop-types";
import styles from "./CourseRow.module.css";

const CourseRow = ({ course, onEdit, onDelete }) => {
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{course.name}</td>
      <td className={styles.cell}>{course.department}</td>
      <td className={styles.cell}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(course)}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(course.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

CourseRow.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CourseRow;