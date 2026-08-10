import PropTypes from "prop-types";
import styles from "./AnalyticsCard.module.css";

const AnalyticsCard = ({ title, children }) => {
  const titleId = `analytics-card-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.title}>
        {title}
      </h3>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

AnalyticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AnalyticsCard;