import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validateStudent } from "../../../utils/validateStudent.js";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudentForm.module.css";

const EMPTY_FORM = Object.freeze({
  name: "",
  email: "",
  course: "",
});

const StudentForm = ({ initialValues, onSubmit, onCancel, submitLabel, existingStudents }) => {
  const [formData, setFormData] = useState(initialValues || EMPTY_FORM);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setFormData(initialValues || EMPTY_FORM);
    setTouched({});
  }, [initialValues]);

  const currentStudentId = initialValues ? initialValues.id : null;
  const errors = validateStudent(formData, existingStudents, currentStudentId);
  const hasErrors = Object.keys(errors).length > 0;
  const hasBeenTouched = Object.keys(touched).length > 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, course: true });

    if (!hasErrors) {
      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        course: formData.course.trim(),
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
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
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className={styles.errorText}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="course" className={styles.label}>
          Course
        </label>
        <input
          id="course"
          name="course"
          type="text"
          autoComplete="off"
          value={formData.course}
          onChange={handleChange}
          className={styles.input}
          aria-invalid={Boolean(touched.course && errors.course)}
          aria-describedby={errors.course ? "course-error" : undefined}
        />
        {touched.course && errors.course && (
          <p id="course-error" className={styles.errorText}>
            {errors.course}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={hasBeenTouched && hasErrors}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

StudentForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    course: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  existingStudents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentForm;