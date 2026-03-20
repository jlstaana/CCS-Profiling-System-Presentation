import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../../styles/Dashboard.module.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Students', value: '1,284', icon: '👥', change: '+12%', color: '#4e73df' },
    { label: 'Faculty Members', value: '48', icon: '👨‍🏫', change: '+2', color: '#1cc88a' },
    { label: 'Active Courses', value: '156', icon: '📚', change: '+8%', color: '#36b9cc' },
    { label: 'Pending Requests', value: '23', icon: '⏳', change: '-5', color: '#f6c23e' }
  ];

  const quickActions = [
    { label: 'Add New User', icon: '➕', path: '/admin-dashboard/users' },
    { label: 'Manage Courses', icon: '📚', path: '/admin-dashboard/instruction' },
    { label: 'Manage Schedules', icon: '📅', path: '/admin-dashboard/scheduling' },
    { label: 'Post Announcement', icon: '📢', path: '/admin-dashboard/events' }
  ];

  const recentUsers = [
    { name: 'John Doe', role: 'student', department: 'CS', date: '2 hours ago' },
    { name: 'Dr. Jane Smith', role: 'faculty', department: 'CS', date: 'Yesterday' },
    { name: 'Alice Johnson', role: 'student', department: 'IT', date: 'Yesterday' },
    { name: 'Prof. Michael Brown', role: 'faculty', department: 'CS', date: '2 days ago' }
  ];

  const systemStatus = [
    { label: 'Database', status: 'Healthy', color: '#1cc88a' },
    { label: 'API Server', status: 'Operational', color: '#1cc88a' },
    { label: 'Storage', status: '78% Used', color: '#f6c23e' },
    { label: 'Last Backup', status: '2 hours ago', color: '#858796' }
  ];

  return (
    <>
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome back, {user?.name}! 👑
        </h1>
        <p className={styles.welcomeSubtitle}>
          Here's your system overview for today.
        </p>
      </section>

      <section className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <article key={index} className={styles.statCard} style={{ '--stat-color': stat.color }}>
            <div className={styles.statIcon} style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statChange} style={{ 
                color: stat.change.startsWith('+') ? 'var(--success)' : 'var(--danger)'
              }}>
                {stat.change} from last month
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.quickActionsGrid}>
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className={styles.actionButton}
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <span className={styles.actionIcon}>{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </section>

      <section className={styles.mainGrid}>
        <article className={`${styles.chartCard} ${styles.card}`} style={{ gridColumn: 'span 2' }}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>📊 Enrollment Trends</h2>
            <select className={styles.chartSelect}>
              <option>This Year</option>
              <option>Last Year</option>
              <option>Last 6 Months</option>
            </select>
          </header>
          <div className={styles.chartPlaceholder}>
            {[120, 180, 140, 200, 160, 130].map((height, index) => (
              <div 
                key={index} 
                className={styles.chartBar} 
                data-height={height}
              />
            ))}
          </div>
        </article>

        <article className={`${styles.card} ${styles.recentCard}`}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>👥 Recent Users</h2>
            <Link to="/admin-dashboard/users" className={styles.viewAllLink}>
              View All →
            </Link>
          </header>
          <div className={styles.userList}>
            {recentUsers.map((userItem, index) => (
              <div key={index} className={styles.userItem}>
                <div className={styles.userAvatar}>
                  {userItem.name.charAt(0)}
                </div>
                <div className={styles.userContent}>
                  <div className={styles.userName}>{userItem.name}</div>
                  <div className={styles.userMeta}>
                    <span className={styles.roleBadge} style={{
                      backgroundColor: userItem.role === 'student' ? '#4e73df' : '#1cc88a'
                    }}>
                      {userItem.role}
                    </span>
                    <span>{userItem.department}</span> • <span>{userItem.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.card} ${styles.systemCard}`}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>⚙️ System Status</h2>
          </header>
          <div className={styles.statusList}>
            {systemStatus.map((status, index) => (
              <div key={index} className={styles.statusItem}>
                <span>{status.label}</span>
                <span className={styles.statusBadge} style={{ backgroundColor: status.color }}>
                  {status.status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
};

export default AdminDashboard;
