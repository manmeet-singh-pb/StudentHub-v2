import PropTypes from "prop-types";
import StatCard from "../../StatCard/StatCard.jsx";
import styles from "./DashboardStats.module.css";

const DashboardStats = ({ analytics }) => {
  const stats = [
    { id: "totalStudents", title: "Total Students", value: analytics.totalStudents },
    { id: "totalCourses", title: "Total Courses", value: analytics.totalCourses },
    {
      id: "mostPopularCourse",
      title: "Most Popular Course",
      value: analytics.mostPopularCourse || "—",
    },
    {
      id: "latestStudent",
      title: "Recently Added",
      value: analytics.latestStudent ? analytics.latestStudent.name : "—",
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <StatCard key={stat.id} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

DashboardStats.propTypes = {
  analytics: PropTypes.shape({
    totalStudents: PropTypes.number.isRequired,
    totalCourses: PropTypes.number.isRequired,
    mostPopularCourse: PropTypes.string,
    latestStudent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DashboardStats;