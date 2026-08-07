import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StudentForm.module.css";

const emptyForm = { name: "", email: "", course: "" };

const StudentForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialValues || emptyForm);

  useEffect(() => {
    setFormData(initialValues || emptyForm);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
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
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="course" className={styles.label}>
          Course
        </label>
        <input
          id="course"
          name="course"
          type="text"
          value={formData.course}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </div>
    </form>
  );
};

StudentForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    course: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default StudentForm;