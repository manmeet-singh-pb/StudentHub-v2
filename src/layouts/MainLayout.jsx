import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import { useStudents } from "../hooks/useStudents.js";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const studentsData = useStudents();

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet context={studentsData} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;