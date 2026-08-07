import { Outlet, NavLink } from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.logo}>StudentHub</h1>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Students
          </NavLink>
        </nav>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;