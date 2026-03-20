import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SocialContext = createContext(null);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

export const SocialProvider = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load mock data
  useEffect(() => {
    if (user) {
      loadMockData();
    }
  }, [user]);

  const loadMockData = () => {
    // Mock posts
    setPosts([
      {
        id: 1,
        author: {
          id: 2,
          name: 'Dr. Maria Santos',
          role: 'faculty',
          avatar: 'M',
          department: 'CS'
        },
        content: 'Just uploaded new materials for CS 301 Database Systems. Check them out! 📚',
        timestamp: '2 hours ago',
        likes: 15,
        comments: [
          {
            id: 101,
            author: { id: 3, name: 'John Doe', role: 'student', avatar: 'J' },
            content: 'Thank you Dr. Santos! Very helpful.',
            timestamp: '1 hour ago'
          },
          {
            id: 102,
            author: { id: 4, name: 'Alice Johnson', role: 'student', avatar: 'A' },
            content: 'The new slides are great!',
            timestamp: '45 minutes ago'
          }
        ],
        liked: false,
        type: 'announcement'
      },
      {
        id: 2,
        author: {
          id: 5,
          name: 'CS Student Council',
          role: 'organization',
          avatar: 'S',
          department: 'CS'
        },
        content: '🎉 CS Week Hackathon is coming! Join us on March 15-16 for 24 hours of coding, fun, and prizes! Sign up now!',
        timestamp: '5 hours ago',
        likes: 42,
        comments: [
          {
            id: 103,
            author: { id: 6, name: 'Bob Williams', role: 'student', avatar: 'B' },
            content: 'Can freshmen join?',
            timestamp: '4 hours ago'
          }
        ],
        liked: true,
        type: 'event'
      },
      {
        id: 3,
        author: {
          id: 7,
          name: 'Prof. Michael Brown',
          role: 'faculty',
          avatar: 'M',
          department: 'IT'
        },
        content: 'Looking for research assistants for my AI project. If interested, please send me a message! 🤖',
        timestamp: '1 day ago',
        likes: 28,
        comments: [],
        liked: false,
        type: 'opportunity'
      }
    ]);

    // Mock notifications
    setNotifications([
      {
        id: 1,
        type: 'like',
        content: 'Dr. Maria Santos liked your post',
        timestamp: '5 minutes ago',
        read: false,
        link: '/social'
      },
      {
        id: 2,
        type: 'comment',
        content: 'Alice Johnson commented on your post',
        timestamp: '1 hour ago',
        read: false,
        link: '/social'
      },
      {
        id: 3,
        type: 'study_group',
        content: 'New message in Database Systems Study Group',
        timestamp: '2 hours ago',
        read: true,
        link: '/study-groups'
      },
      {
        id: 4,
        type: 'friend_request',
        content: 'John Smith sent you a friend request',
        timestamp: '1 day ago',
        read: true,
        link: '/social'
      }
    ]);

    // Mock study groups
    setStudyGroups([
      {
        id: 1,
        name: 'Database Systems Study Group',
        course: 'CS 301',
        members: 12,
        description: 'Weekly study sessions for Database Systems. We meet every Wednesday at 3 PM.',
        createdBy: 'Dr. Maria Santos',
        upcomingSession: 'Tomorrow, 3:00 PM',
        messages: 156
      },
      {
        id: 2,
        name: 'Web Development Project Team',
        course: 'CS 302',
        members: 8,
        description: 'Working on the final project together. Frontend and backend collaboration.',
        createdBy: 'Prof. Johnson',
        upcomingSession: 'Friday, 2:00 PM',
        messages: 89
      },
      {
        id: 3,
        name: 'Algorithm Practice Group',
        course: 'CS 303',
        members: 15,
        description: 'Preparing for coding interviews and exams. We solve LeetCode problems together.',
        createdBy: 'Dr. Williams',
        upcomingSession: 'Monday, 4:00 PM',
        messages: 234
      }
    ]);
  };

  // Post functions
  const createPost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      author: {
        id: user.id,
        name: user.name,
        role: user.role,
        avatar: user.name.charAt(0),
        department: user.department || 'CS'
      },
      ...postData,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      liked: false
    };
    setPosts([newPost, ...posts]);
    
    // Create notification for followers (mock)
    addNotification({
      type: 'post',
      content: `${user.name} created a new post`,
      link: '/social'
    });
    
    return newPost;
  };

  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));

    // Add notification for post author (mock)
    const post = posts.find(p => p.id === postId);
    if (post && post.author.id !== user.id) {
      addNotification({
        type: 'like',
        content: `${user.name} liked your post`,
        link: '/social'
      });
    }
  };

  const addComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: {
        id: user.id,
        name: user.name,
        role: user.role,
        avatar: user.name.charAt(0)
      },
      content: commentText,
      timestamp: 'Just now'
    };
    
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    // Add notification for post author (mock)
    const post = posts.find(p => p.id === postId);
    if (post && post.author.id !== user.id) {
      addNotification({
        type: 'comment',
        content: `${user.name} commented on your post`,
        link: '/social'
      });
    }
  };

  // Notification functions
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: 'Just now',
      read: false,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Study group functions
  const joinStudyGroup = (groupId) => {
    setStudyGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, members: group.members + 1 }
          : group
      )
    );

    // Add notification
    const group = studyGroups.find(g => g.id === groupId);
    if (group) {
      addNotification({
        type: 'study_group',
        content: `You joined ${group.name}`,
        link: '/study-groups'
      });
    }
  };

  const leaveStudyGroup = (groupId) => {
    setStudyGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, members: Math.max(0, group.members - 1) }
          : group
      )
    );
  };

  const createStudyGroup = (groupData) => {
    const newGroup = {
      id: Date.now(),
      ...groupData,
      members: 1,
      messages: 0,
      createdBy: user.name,
      upcomingSession: groupData.schedule || 'TBD'
    };
    setStudyGroups(prev => [newGroup, ...prev]);

    addNotification({
      type: 'study_group',
      content: `You created ${groupData.name}`,
      link: `/study-groups/${newGroup.id}`
    });

    return newGroup;
  };

  // Get unread notifications count
  const getUnreadNotificationsCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const value = {
    posts,
    notifications,
    studyGroups,
    loading,
    createPost,
    likePost,
    addComment,
    joinStudyGroup,
    leaveStudyGroup,
    createStudyGroup,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    getUnreadNotificationsCount
  };

  return (
    <SocialContext.Provider value={value}>
      {children}
    </SocialContext.Provider>
  );
};