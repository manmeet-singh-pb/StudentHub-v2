import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/common/Button/Button.jsx";
import styles from "./Login.module.css";

const Login = () => {
  const { login, isLoading, error, dismissError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.visualPanel}>
        <div className={styles.aurora} aria-hidden="true" />

        <div className={styles.brand}>
          <span className={styles.brandMark}>StudentHub</span>
          <p className={styles.tagline}>Your academic life, organized.</p>
        </div>

        <div className={styles.orbitVisual} aria-hidden="true">
          <div className={styles.shard} />

          <div className={styles.orbitTrack}>
            <span className={styles.orbitDot} />
            <span className={styles.orbitDot} />
            <span className={styles.orbitDot} />
          </div>

          <svg className={styles.ring} viewBox="0 0 240 240">
            <circle className={styles.ringTrack} cx="120" cy="120" r="100" />
            <circle className={styles.ringProgress} cx="120" cy="120" r="100" />
          </svg>

          <div className={styles.ringCenter}>
            <span className={styles.ringValue}>72%</span>
            <span className={styles.ringCaption}>On track</span>
          </div>

          <div className={`${styles.infoTag} ${styles.tagOne}`}>
            <span className={styles.tagDot} />
            Assignments <strong>4 due</strong>
          </div>
          <div className={`${styles.infoTag} ${styles.tagTwo}`}>
            <span className={styles.tagDot} />
            Attendance <strong>92%</strong>
          </div>
        </div>

        <p className={styles.visualMessage}>
          Everything about your semester, in one clear view.
          <span>Classes, tasks, and progress — always in sync.</span>
        </p>
      </div>

      <div className={styles.formPanel}>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <span className={styles.eyebrow}>Welcome back</span>
          <h1 className={styles.heading}>Sign in to StudentHub.</h1>
          <p className={styles.subheading}>
            Continue managing your academic life in one place.
          </p>

          {error && (
            <div className={styles.errorBanner} role="alert">
              <AlertCircle size={16} className={styles.errorIcon} aria-hidden="true" />
              <span>{error}</span>
              <button
                type="button"
                className={styles.errorDismiss}
                onClick={dismissError}
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
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
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <span className={styles.loadingContent}>
                <span className={styles.spinner} aria-hidden="true" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className={styles.switchText}>
            Don&apos;t have an account?{" "}
            <Link to="/register" className={styles.switchLink}>
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;