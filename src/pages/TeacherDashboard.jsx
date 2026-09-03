import { useAuth } from "../context/AuthContext.jsx";
import styles from "./TeacherDashboard.module.css";

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Welcome, {user?.name || "Teacher"}.</h2>
      <p className={styles.subtitle}>
        Your teacher dashboard is on its way. Subjects, attendance, and marks
        management will appear here soon.
      </p>
    </section>
  );
};

export default TeacherDashboard;