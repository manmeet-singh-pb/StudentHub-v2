import { useAuth } from "../context/AuthContext.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import TeacherDashboard from "./TeacherDashboard.jsx";

const RoleDashboard = () => {
  const { user } = useAuth();

  if (user?.role === "teacher") {
    return <TeacherDashboard />;
  }

  return <StudentDashboard />;
};

export default RoleDashboard;