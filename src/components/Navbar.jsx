import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = ({ toggleMobileMenu, showMenuButton }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);

  // Mock notifications data
  const notifications = [
    { id: 1, text: 'Dr. Maria Santos liked your post', time: '5 min ago', read: false, link: '/social' },
    { id: 2, text: 'New comment on your study group', time: '1 hour ago', read: false, link: '/study-groups' },
    { id: 3, text: 'Assignment deadline tomorrow', time: '3 hours ago', read: true, link: '/instruction' },
    { id: 4, text: 'Event reminder: CS Hackathon', time: '1 day ago', read: true, link: '/events' }
  ];

  // Mock messages data
  const messages = [
    { id: 1, sender: 'Dr. Maria Santos', avatar: 'M', preview: 'Please check your assignment...', time: '10 min ago', unread: true, link: '/messages' },
    { id: 2, sender: 'John Doe', avatar: 'J', preview: 'Can we meet to discuss?', time: '2 hours ago', unread: false, link: '/messages' },
    { id: 3, sender: 'Alice Johnson', avatar: 'A', preview: 'Thanks for the feedback!', time: '1 day ago', unread: false, link: '/messages' }
  ];

  // Calculate unread counts
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => m.unread).length;

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
    switch(role) {
      case 'admin': return '#e74a3b';
      case 'faculty': return '#1cc88a';
      case 'student': return '#4e73df';
      default: return '#858796';
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would call an API
    console.log('Mark all as read');
    setShowNotifications(false);
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
        {/* Notifications Dropdown */}
        <div className={styles.dropdownContainer} ref={notificationRef}>
          <button 
            className={`${styles.iconButton} ${unreadNotifications > 0 ? styles.hasBadge : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
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
                  <button onClick={markAllAsRead} className={styles.markAllRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className={styles.dropdownList}>
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map(notif => (
                    <Link 
                      key={notif.id} 
                      to={`/${user?.role}-dashboard${notif.link}`}
                      className={`${styles.dropdownItem} ${!notif.read ? styles.unread : ''}`}
                      onClick={() => setShowNotifications(false)}
                    >
                      <div className={styles.dropdownItemContent}>
                        <p className={styles.dropdownItemText}>{notif.text}</p>
                        <span className={styles.dropdownItemTime}>{notif.time}</span>
                      </div>
                      {!notif.read && <span className={styles.unreadDot}></span>}
                    </Link>
                  ))
                ) : (
                  <div className={styles.dropdownEmpty}>
                    No notifications
                  </div>
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

        {/* Messages Dropdown */}
        <div className={styles.dropdownContainer} ref={messagesRef}>
          <button 
            className={`${styles.iconButton} ${unreadMessages > 0 ? styles.hasBadge : ''}`}
            onClick={() => setShowMessages(!showMessages)}
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
                {messages.length > 0 ? (
                  messages.slice(0, 5).map(msg => (
                    <Link 
                      key={msg.id} 
                      to={`/${user?.role}-dashboard${msg.link}`}
                      className={`${styles.dropdownItem} ${styles.messageItem} ${msg.unread ? styles.unread : ''}`}
                      onClick={() => setShowMessages(false)}
                    >
                      <div className={styles.messageAvatar}>
                        {msg.avatar}
                      </div>
                      <div className={styles.messageContent}>
                        <div className={styles.messageHeader}>
                          <span className={styles.messageSender}>{msg.sender}</span>
                          <span className={styles.messageTime}>{msg.time}</span>
                        </div>
                        <p className={styles.messagePreview}>{msg.preview}</p>
                      </div>
                      {msg.unread && <span className={styles.unreadDot}></span>}
                    </Link>
                  ))
                ) : (
                  <div className={styles.dropdownEmpty}>
                    No messages
                  </div>
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

        <span className={styles.roleBadge} style={{ backgroundColor: getRoleBadgeColor(user?.role) }}>
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </span>
        
        <div className={styles.userAvatar}>
          {user?.name?.charAt(0) || 'U'}
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