import styles from "../styles/pagePlaceholder.module.css";

const NotFound = () => {
  return (
    <div className={`${styles.page} ${styles.center}`}>
      <h2 className={styles.title}>404 — Page Not Found</h2>
      <p className={styles.description}>
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;