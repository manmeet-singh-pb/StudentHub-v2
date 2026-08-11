import PropTypes from "prop-types";
import { Menu, Bell } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle/ThemeToggle.jsx";
import styles from "./Navbar.module.css";

const Navbar = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
          onClick={onToggleSidebar}
        >
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

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;