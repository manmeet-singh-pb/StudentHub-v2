import PropTypes from "prop-types";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard.jsx";
import styles from "./CourseDistribution.module.css";

const CourseDistribution = ({ distribution }) => {
  return (
    <AnalyticsCard title="Course Distribution">
      {distribution.length === 0 ? (
        <p className={styles.emptyMessage}>No student data available yet.</p>
      ) : (
        <ul className={styles.list}>
          {distribution.map((entry) => (
            <li key={entry.course} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.courseName}>{entry.course}</span>
                <span className={styles.courseCount}>
                  {entry.count} {entry.count === 1 ? "student" : "students"} (
                  {entry.percentage}%)
                </span>
              </div>
              <div
                className={styles.track}
                role="progressbar"
                aria-valuenow={entry.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${entry.course}: ${entry.percentage}%`}
              >
                <div
                  className={styles.fill}
                  style={{ width: `${entry.percentage}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </AnalyticsCard>
  );
};

CourseDistribution.propTypes = {
  distribution: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CourseDistribution;