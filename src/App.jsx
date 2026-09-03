import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Students from "./pages/Students.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import RoleDashboard from "./pages/RoleDashboard.jsx";

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RoleDashboard />} />
          <Route
            path="students"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;