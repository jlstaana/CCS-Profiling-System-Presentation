import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProfileRequests } from '../../context/ProfileRequestContext';
import { Link } from 'react-router-dom';
import styles from '../../styles/Dashboard.module.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState([]);
  
  const quickActions = [
    { label: 'Add New User', icon: '➕', path: '/admin-dashboard/users' },
    { label: 'Manage Courses', icon: '📚', path: '/admin-dashboard/instruction' },
    { label: 'Manage Schedules', icon: '📅', path: '/admin-dashboard/scheduling' },
    { label: 'Post Announcement', icon: '📢', path: '/admin-dashboard/events' }
  ];

  const [recentUsers, setRecentUsers] = useState([]);
  const { requests, approveRequest, rejectRequest } = useProfileRequests();

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
                <div className={styles.userAvatar} style={{ overflow: 'hidden' }}>
                  {userItem.profilePic ? (
                    <img src={userItem.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    userItem.name.charAt(0)
                  )}
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
            <h2 className={styles.cardTitle}>🔔 Pending Approvals</h2>
          </header>
          <div className={styles.statusList} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requests.length === 0 ? (
              <div style={{ color: '#858796', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
                No pending profile changes.
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} style={{ padding: '12px', backgroundColor: '#f8f9fc', borderRadius: '8px', fontSize: '13px' }}>
                  <div style={{ fontWeight: '600', color: '#1f2f70', marginBottom: '8px' }}>
                    {req.userName} ({req.currentRole})
                  </div>
                  <div style={{ marginBottom: '12px', color: '#5a5c69' }}>
                    {Object.entries(req.changes).map(([key, val]) => (
                      <div key={key}><strong>{key}:</strong> {val}</div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => approveRequest(req.id)}
                      style={{ padding: '6px 12px', backgroundColor: 'var(--success)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => rejectRequest(req.id)}
                      style={{ padding: '6px 12px', backgroundColor: 'var(--danger)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </>
  );
};

export default AdminDashboard;
