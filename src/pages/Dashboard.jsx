import StatCard from "../components/StatCard/StatCard.jsx";
import { dashboardStats } from "../constants/dashboardStats.js";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.subtitle}>Welcome to StudentHub.</p>

      <div className={styles.statsGrid}>
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;