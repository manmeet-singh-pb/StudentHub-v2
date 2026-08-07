import PropTypes from "prop-types";
import CourseRow from "./CourseRow.jsx";
import styles from "./CourseTable.module.css";

const CourseTable = ({ courses, onEdit, onDelete, isSearchActive = false }) => {
  if (courses.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          {isSearchActive ? "No matching courses found." : "No courses found."}
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
              Department
            </th>
            <th scope="col" className={styles.headerCell}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

CourseTable.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool,
};

export default CourseTable;