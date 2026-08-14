import PropTypes from "prop-types";
import { Menu, Bell, LogOut } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle/ThemeToggle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Navbar.module.css";

const Navbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const { user, logout } = useAuth();

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
          <span className={styles.username}>{user?.name || "User"}</span>
        </div>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={logout}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;