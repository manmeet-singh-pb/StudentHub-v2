import styles from "../styles/pagePlaceholder.module.css";

const Dashboard = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.description}>
        This is the Dashboard page placeholder.
      </p>
    </div>
  );
};

export default Dashboard;