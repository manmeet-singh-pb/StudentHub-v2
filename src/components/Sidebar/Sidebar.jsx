import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation.js";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;