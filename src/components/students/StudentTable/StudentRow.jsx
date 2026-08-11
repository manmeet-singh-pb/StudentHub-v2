import PropTypes from "prop-types";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudentRow.module.css";

const StudentRow = ({ student, onEdit, onDelete }) => {
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{student.name}</td>
      <td className={styles.cell}>{student.email}</td>
      <td className={styles.cell}>{student.course}</td>
      <td className={styles.cell}>
        <div className={styles.actions}>
          <Button variant="secondary" size="sm" onClick={() => onEdit(student)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(student.id)}>
            Delete
          </Button>
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