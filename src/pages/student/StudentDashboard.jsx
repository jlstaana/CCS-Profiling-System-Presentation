import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../../styles/Dashboard.module.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [events, setEvents] = useState([]);

  return (
    <>
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p className={styles.welcomeSubtitle}>
          Here's what's happening with your academic journey today.
        </p>
      </section>

      <section className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <article key={index} className={styles.statCard} style={{ '--stat-color': stat.color }}>
            <div className={styles.statIcon} style={{ color: stat.color, backgroundColor: stat.color + '20' }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.mainGrid}>
        <article className={`${styles.card} ${styles.scheduleCard}`}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>📅 Today's Schedule</h2>
            <Link to="/student-dashboard/scheduling" className={styles.viewAllLink}>
              View Full Schedule →
            </Link>
          </header>
          <div className={styles.scheduleList}>
            {upcomingClasses.map((classItem, index) => (
              <div key={index} className={styles.scheduleItem}>
                <div className={styles.scheduleTime}>{classItem.time}</div>
                <div className={styles.scheduleContent}>
                  <div className={styles.scheduleCourse}>{classItem.course}</div>
                  <div className={styles.scheduleMeta}>
                    <span>{classItem.room}</span> • <span>{classItem.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.card} ${styles.eventsCard}`}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>🎉 Upcoming Events</h2>
            <Link to="/student-dashboard/events" className={styles.viewAllLink}>
              View All Events →
            </Link>
          </header>
          <div className={styles.eventsList}>
            {events.map((event, index) => (
              <div key={index} className={styles.eventItem}>
                <div className={styles.eventDate}>
                  <div className={styles.eventDay}>{event.date.split(' ')[1]}</div>
                  <div className={styles.eventMonth}>{event.date.split(' ')[0]}</div>
                </div>
                <div className={styles.eventContent}>
                  <div className={styles.eventTitle}>{event.title}</div>
                  <div className={styles.eventMeta}>
                    <span>{event.time}</span> • <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.card} ${styles.announcementsCard}`} style={{ gridColumn: '1 / -1' }}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>📢 Recent Announcements</h2>
          </header>
          <div className={styles.announcementsList}>
            <div className={styles.announcement}>
              <div className={styles.announcementBadge}>NEW</div>
              <div className={styles.announcementTitle}>
                Registration for Summer Classes
              </div>
              <div className={styles.announcementMeta}>
                Posted by Admin • 2 hours ago
              </div>
            </div>
            <div className={styles.announcement}>
              <div className={styles.announcementTitle}>
                Library Extended Hours During Finals
              </div>
              <div className={styles.announcementMeta}>
                Posted by Library • Yesterday
              </div>
            </div>
            <div className={styles.announcement}>
              <div className={styles.announcementTitle}>
                Scholarship Applications Now Open
              </div>
              <div className={styles.announcementMeta}>
                Posted by Financial Aid • 2 days ago
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default StudentDashboard;
