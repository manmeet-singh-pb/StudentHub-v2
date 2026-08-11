import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("StudentHub encountered an unexpected error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            StudentHub ran into an unexpected error. Reloading the page usually fixes this.
          </p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={this.handleReload}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;