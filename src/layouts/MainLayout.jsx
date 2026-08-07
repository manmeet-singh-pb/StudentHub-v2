import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;