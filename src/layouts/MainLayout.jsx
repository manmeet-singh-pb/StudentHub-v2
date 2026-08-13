import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import { useStudents } from "../hooks/useStudents.js";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const studentsData = useStudents();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className={styles.body}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main id="main-content" className={styles.content}>
          <Outlet context={studentsData} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;