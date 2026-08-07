import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validateCourse } from "../../../utils/validateCourse.js";
import styles from "./CourseForm.module.css";

const EMPTY_FORM = Object.freeze({
  name: "",
  department: "",
});

const CourseForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  existingCourses,
}) => {
  const [formData, setFormData] = useState(initialValues || EMPTY_FORM);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setFormData(initialValues || EMPTY_FORM);
    setTouched({});
  }, [initialValues]);

  const currentCourseId = initialValues ? initialValues.id : null;
  const errors = validateCourse(formData, existingCourses, currentCourseId);
  const hasErrors = Object.keys(errors).length > 0;
  const hasBeenTouched = Object.keys(touched).length > 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, department: true });

    if (!hasErrors) {
      onSubmit({
        name: formData.name.trim(),
        department: formData.department.trim(),
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Course Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className={styles.errorText}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="department" className={styles.label}>
          Department
        </label>
        <input
          id="department"
          name="department"
          type="text"
          autoComplete="off"
          value={formData.department}
          onChange={handleChange}
          className={styles.input}
          aria-invalid={Boolean(touched.department && errors.department)}
          aria-describedby={errors.department ? "department-error" : undefined}
        />
        {touched.department && errors.department && (
          <p id="department-error" className={styles.errorText}>
            {errors.department}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={hasBeenTouched && hasErrors}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

CourseForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  existingCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseForm;