import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/authApi.js";
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "../constants/auth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem(AUTH_TOKEN_KEY)
  );
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!storedToken) {
      setIsInitializing(false);
      return;
    }

    getCurrentUser(storedToken)
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, []);

  const persistSession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token: newToken, user: newUser } =
        await loginUser(credentials);

      persistSession(newToken, newUser);
      return true;
    } catch (err) {
      setError(err.message || "Login failed.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (details) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token: newToken, user: newUser } =
        await registerUser(details);

      persistSession(newToken, newUser);
      return true;
    } catch (err) {
      setError(err.message || "Registration failed.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const dismissError = () => setError(null);

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    isInitializing,
    isLoading,
    error,
    login,
    register,
    logout,
    dismissError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};