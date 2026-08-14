import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/common/Button/Button.jsx";
import styles from "./Register.module.css";

const Register = () => {
  const { register, isLoading, error, dismissError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Create your StudentHub account</h1>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <span>{error}</span>
            <Button variant="secondary" size="sm" type="button" onClick={dismissError}>
              Dismiss
            </Button>
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>

        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.switchLink}>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;