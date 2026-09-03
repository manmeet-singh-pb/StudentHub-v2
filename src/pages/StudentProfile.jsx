import { useEffect, useState } from "react";
import { Mail, Hash, Calendar, ShieldCheck } from "lucide-react";
import { getStudentProfile } from "../services/studentProfileApi.js";
import styles from "./StudentProfile.module.css";

const formatDate = (isoString) => {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getStudentProfile()
      .then((data) => {
        if (isMounted) setProfile(data);
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load your profile. Please try again shortly.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.skeletonCard} aria-hidden="true">
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonLine} style={{ width: "60%" }} />
          <div className={styles.skeletonLine} style={{ width: "40%" }} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <div className={styles.errorState} role="alert">
          {error}
        </div>
      </section>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const completionItems = [
    { label: "Name", complete: Boolean(profile.name) },
    { label: "Email", complete: Boolean(profile.email) },
    { label: "Roll Number", complete: Boolean(profile.rollNumber) },
  ];
  const completedCount = completionItems.filter((item) => item.complete).length;
  const completionPercent = Math.round((completedCount / completionItems.length) * 100);

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>My Profile</h2>
      <p className={styles.subtitle}>Your academic identity on StudentHub.</p>

      <div className={styles.grid}>
        <div className={styles.identityCard}>
          <div className={styles.avatar}>{initials}</div>
          <h3 className={styles.name}>{profile.name}</h3>
          <span className={styles.roleBadge}>
            <ShieldCheck size={13} />
            Student
          </span>

          <dl className={styles.details}>
            <div className={styles.detailRow}>
              <dt>
                <Mail size={15} />
                <span>Email</span>
              </dt>
              <dd>{profile.email}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>
                <Hash size={15} />
                <span>Roll Number</span>
              </dt>
              <dd>{profile.rollNumber || "Not set"}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>
                <Calendar size={15} />
                <span>Member Since</span>
              </dt>
              <dd>{formatDate(profile.createdAt)}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.completionCard}>
          <h3 className={styles.completionTitle}>Profile Completeness</h3>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${completionPercent}%` }} />
          </div>
          <span className={styles.progressLabel}>{completionPercent}% complete</span>

          <ul className={styles.checklist}>
            {completionItems.map((item) => (
              <li key={item.label} className={styles.checklistItem}>
                <span
                  className={`${styles.checkDot} ${item.complete ? styles.checkDotDone : ""}`}
                  aria-hidden="true"
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;