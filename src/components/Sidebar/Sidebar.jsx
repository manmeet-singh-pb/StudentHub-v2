import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { navigation } from "../../constants/navigation.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const visibleNavigation = navigation.filter(
    (item) => !item.roles || item.roles.includes(user?.role)
  );

  return (
    <>
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        id="app-sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <nav className={styles.nav} aria-label="Primary navigation">
          {visibleNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;