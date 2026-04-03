import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocial } from '../context/SocialContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Navbar.module.css';

const TYPE_ICONS = {
  connection_request:  '🤝',
  connection_accepted: '✅',
  post_like:           '❤️',
  post_comment:        '💬',
  new_message:         '✉️',
  new_post:            '📢',
  group_join:          '👥',
  profile_approved:    '✅',
  profile_rejected:    '❌',
};

const Navbar = ({ toggleMobileMenu, showMenuButton }) => {
  const { user, logout } = useAuth();
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotificationsCount,
  } = useSocial();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);

  const unreadNotifications = getUnreadNotificationsCount();

  // Fetch recent conversations for messages dropdown
  const fetchRecentMessages = async () => {
    if (!user || !axios.defaults.headers.common['Authorization']) return;
    try {
      const res = await axios.get('/messages/conversations');
      setRecentMessages(res.data.slice(0, 5));
    } catch (e) { /* silent */ }
  };

  useEffect(() => {
    fetchRecentMessages();
    const interval = setInterval(fetchRecentMessages, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const unreadMessages = recentMessages.reduce((sum, c) => sum + (c.unread_count || 0), 0);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':   return '#e74a3b';
      case 'faculty': return '#1cc88a';
      case 'student': return '#4e73df';
      default:        return '#858796';
    }
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead();
    setShowNotifications(false);
  };

  const handleNotifClick = async (notif) => {
    if (!notif.read) await markNotificationAsRead(notif.id);
    setShowNotifications(false);
  };

  const getNotifLink = (notif) => {
    const base = `/${user?.role}-dashboard`;
    const link = notif.link || '/';
    // Already absolute-ish paths from the API
    if (link.startsWith('/social') || link.startsWith('/messages') || link.startsWith('/profile')) {
      return `${base}${link}`;
    }
    return `${base}${link}`;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        {showMenuButton && (
          <button onClick={toggleMobileMenu} className={styles.menuButton} aria-label="Toggle menu">
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>
        )}
        <div className={styles.welcomeText}>
          Welcome back, <strong>{user?.name?.split(' ')[0] || 'User'}</strong>
        </div>
      </div>

      <div className={styles.userInfo}>

        {/* ── Notifications Dropdown ── */}
        <div className={styles.dropdownContainer} ref={notificationRef}>
          <button
            className={`${styles.iconButton} ${unreadNotifications > 0 ? styles.hasBadge : ''}`}
            onClick={() => { setShowNotifications(v => !v); setShowMessages(false); }}
            aria-label="Notifications"
          >
            <span className={styles.icon}>🔔</span>
            {unreadNotifications > 0 && (
              <span className={styles.badge}>{unreadNotifications}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h3 className={styles.dropdownTitle}>Notifications</h3>
                {unreadNotifications > 0 && (
                  <button onClick={handleMarkAllRead} className={styles.markAllRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className={styles.dropdownList}>
                {notifications.length > 0 ? (
                  notifications.slice(0, 6).map(notif => (
                    <Link
                      key={notif.id}
                      to={getNotifLink(notif)}
                      className={`${styles.dropdownItem} ${!notif.read ? styles.unread : ''}`}
                      onClick={() => handleNotifClick(notif)}
                    >
                      <span style={{ fontSize: 18, marginRight: 8, flexShrink: 0 }}>
                        {TYPE_ICONS[notif.type] || '🔔'}
                      </span>
                      <div className={styles.dropdownItemContent}>
                        <p className={styles.dropdownItemText}>{notif.message}</p>
                        <span className={styles.dropdownItemTime}>{notif.time}</span>
                      </div>
                      {!notif.read && <span className={styles.unreadDot}></span>}
                    </Link>
                  ))
                ) : (
                  <div className={styles.dropdownEmpty}>No notifications</div>
                )}
              </div>
              <div className={styles.dropdownFooter}>
                <Link
                  to={`/${user?.role}-dashboard/notifications`}
                  className={styles.viewAllLink}
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Messages Dropdown ── */}
        <div className={styles.dropdownContainer} ref={messagesRef}>
          <button
            className={`${styles.iconButton} ${unreadMessages > 0 ? styles.hasBadge : ''}`}
            onClick={() => { setShowMessages(v => !v); setShowNotifications(false); }}
            aria-label="Messages"
          >
            <span className={styles.icon}>💬</span>
            {unreadMessages > 0 && (
              <span className={styles.badge}>{unreadMessages}</span>
            )}
          </button>

          {showMessages && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h3 className={styles.dropdownTitle}>Messages</h3>
                <Link
                  to={`/${user?.role}-dashboard/messages`}
                  className={styles.newMessageLink}
                  onClick={() => setShowMessages(false)}
                >
                  + New
                </Link>
              </div>
              <div className={styles.dropdownList}>
                {recentMessages.length > 0 ? (
                  recentMessages.map(conv => (
                    <Link
                      key={conv.id}
                      to={`/${user?.role}-dashboard/messages`}
                      className={`${styles.dropdownItem} ${styles.messageItem} ${conv.unread_count > 0 ? styles.unread : ''}`}
                      onClick={() => setShowMessages(false)}
                    >
                      <div className={styles.messageAvatar}>
                        {(conv.other_user?.name || '?').charAt(0)}
                      </div>
                      <div className={styles.messageContent}>
                        <div className={styles.messageHeader}>
                          <span className={styles.messageSender}>{conv.other_user?.name}</span>
                          <span className={styles.messageTime}>
                            {conv.last_message?.created_at
                              ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : ''}
                          </span>
                        </div>
                        <p className={styles.messagePreview}>{conv.last_message?.content || 'No messages yet'}</p>
                      </div>
                      {conv.unread_count > 0 && <span className={styles.unreadDot}></span>}
                    </Link>
                  ))
                ) : (
                  <div className={styles.dropdownEmpty}>No messages</div>
                )}
              </div>
              <div className={styles.dropdownFooter}>
                <Link
                  to={`/${user?.role}-dashboard/messages`}
                  className={styles.viewAllLink}
                  onClick={() => setShowMessages(false)}
                >
                  View all messages
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Role badge + avatar + logout */}
        <span className={styles.roleBadge} style={{ backgroundColor: getRoleBadgeColor(user?.role) }}>
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </span>

        <div className={styles.userAvatar} style={{ overflow: 'hidden' }}>
          {user?.profile_pic_base64 ? (
            <img src={user.profile_pic_base64} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            user?.name?.charAt(0) || 'U'
          )}
        </div>

        <button onClick={logout} className={styles.logoutButton} aria-label="Logout">
          <span className={styles.logoutIcon}>↪</span>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;