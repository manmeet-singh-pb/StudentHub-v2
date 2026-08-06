import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.welcomeScreen}>
      <div>
        <h1 className={styles.title}>StudentHub v2</h1>
        <p className={styles.subtitle}>React + Vite Foundation Ready</p>
        <p className={styles.status}>Phase 1 Completed Successfully</p>
      </div>
    </div>
  );
};

export default App;