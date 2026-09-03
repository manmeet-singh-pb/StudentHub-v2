import { useAuth } from "../context/AuthContext.jsx";
import { CalendarCheck, BookOpen, ClipboardList, Activity } from "lucide-react";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome back, {user?.name || "Student"}.</h2>
        <p className={styles.subtitle}>Here&apos;s a quick look at your academic space.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <CalendarCheck size={18} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Attendance</h3>
          </div>
          <p className={styles.cardEmpty}>Attendance tracking isn&apos;t set up yet.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <BookOpen size={18} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Courses</h3>
          </div>
          <p className={styles.cardEmpty}>You aren&apos;t enrolled in any courses yet.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <ClipboardList size={18} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Upcoming Assessments</h3>
          </div>
          <p className={styles.cardEmpty}>No upcoming assessments.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Activity size={18} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Recent Activity</h3>
          </div>
          <p className={styles.cardEmpty}>Nothing to show yet.</p>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;