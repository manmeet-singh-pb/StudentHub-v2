import { useOutletContext } from "react-router-dom";
import StatCard from "../components/StatCard/StatCard.jsx";
import { useStudentAnalytics } from "../hooks/useStudentAnalytics.js";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { students } = useOutletContext();
  const { totalStudents, totalCourses, mostPopularCourse, latestStudent } =
    useStudentAnalytics(students);

  const stats = [
    { id: "totalStudents", title: "Total Students", value: totalStudents },
    { id: "totalCourses", title: "Total Courses", value: totalCourses },
    {
      id: "mostPopularCourse",
      title: "Most Popular Course",
      value: mostPopularCourse || "—",
    },
    {
      id: "latestStudent",
      title: "Recently Added",
      value: latestStudent ? latestStudent.name : "—",
    },
  ];

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.subtitle}>Welcome to StudentHub.</p>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;