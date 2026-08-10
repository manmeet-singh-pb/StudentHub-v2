import { useOutletContext } from "react-router-dom";
import { useStudentAnalytics } from "../hooks/useStudentAnalytics.js";
import DashboardStats from "../components/dashboard/DashboardStats/DashboardStats.jsx";
import CourseDistribution from "../components/dashboard/CourseDistribution/CourseDistribution.jsx";
import RecentStudents from "../components/dashboard/RecentStudents/RecentStudents.jsx";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { students } = useOutletContext();
  const analytics = useStudentAnalytics(students);

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.subtitle}>Welcome to StudentHub.</p>

      <DashboardStats analytics={analytics} />

      <div className={styles.analyticsGrid}>
        <CourseDistribution distribution={analytics.courseDistribution} />
        <RecentStudents students={analytics.recentStudents} />
      </div>
    </section>
  );
};

export default Dashboard;