import { Menu, Bell } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle/ThemeToggle.jsx";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuButton} aria-label="Toggle menu" type="button">
          <Menu size={22} />
        </button>
        <h1 className={styles.logo}>StudentHub</h1>
      </div>

      <div className={styles.right}>
        <ThemeToggle />
        <div className={styles.notificationIcon} aria-hidden="true">
          <Bell size={20} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.avatar} aria-hidden="true" />
          <span className={styles.username}>Guest User</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;