import PropTypes from "prop-types";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard.jsx";
import styles from "./RecentStudents.module.css";

const RecentStudents = ({ students }) => {
  return (
    <AnalyticsCard title="Recently Added Students">
      {students.length === 0 ? (
        <p className={styles.emptyMessage}>No student data available yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.headerCell}>
                Name
              </th>
              <th scope="col" className={styles.headerCell}>
                Course
              </th>
              <th scope="col" className={styles.headerCell}>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className={styles.row}>
                <td className={styles.cell}>{student.name}</td>
                <td className={styles.cell}>{student.course}</td>
                <td className={styles.cell}>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AnalyticsCard>
  );
};

RecentStudents.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentStudents;