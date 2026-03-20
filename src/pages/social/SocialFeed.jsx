import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import CommentSection from '../../components/social/CommentSection';
import ConnectButton from '../../components/social/ConnectButton';

const SocialFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
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
          author: 'John Doe',
          role: 'student',
          text: 'Thank you Dr. Santos! Very helpful.',
          time: '1 hour ago'
        },
        {
          id: 102,
          author: 'Alice Johnson',
          role: 'student',
          text: 'The new slides are great!',
          time: '45 minutes ago'
        }
      ],
      liked: false,
      type: 'announcement'
    },
    {
      id: 2,
      author: {
        name: 'CS Student Council',
        role: 'organization',
        avatar: 'S',
        department: 'CS'
      },
      content: '🎉 CS Week Hackathon is coming! Join us on March 15-16 for 24 hours of coding, fun, and prizes! Sign up now at the link below.',
      timestamp: '5 hours ago',
      likes: 42,
      comments: [
        {
          id: 103,
          author: 'Bob Williams',
          role: 'student',
          text: 'Can freshmen join?',
          time: '4 hours ago'
        }
      ],
      liked: true,
      type: 'event'
    },
    {
      id: 3,
      author: {
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

  const [newPost, setNewPost] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: user.name,
          role: user.role,
          text: commentText,
          time: 'Just now'
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        author: {
          name: user.name,
          role: user.role,
          avatar: user.name.charAt(0),
          department: user.department || 'CS'
        },
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: [],
        liked: false,
        type: 'update'
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
      setShowPostModal(false);
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case 'announcement':
        return <span style={styles.badge.announcement}>📢 Announcement</span>;
      case 'event':
        return <span style={styles.badge.event}>🎉 Event</span>;
      case 'opportunity':
        return <span style={styles.badge.opportunity}>💼 Opportunity</span>;
      default:
        return null;
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2f70',
      margin: 0
    },
    createButton: {
      padding: '10px 20px',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#169b6b',
        transform: 'translateY(-2px)'
      }
    },
    createPostCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
      }
    },
    createPostPlaceholder: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#1f2f70',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '600'
    },
    placeholderText: {
      color: '#858796',
      fontSize: '16px'
    },
    postsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    postCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    postHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    postAuthor: {
      display: 'flex',
      gap: '12px'
    },
    authorAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#1cc88a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '600'
    },
    facultyAvatar: {
      backgroundColor: '#4e73df'
    },
    authorInfo: {
      flex: 1
    },
    authorName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2f70',
      marginBottom: '4px'
    },
    authorMeta: {
      fontSize: '12px',
      color: '#858796',
      display: 'flex',
      gap: '8px'
    },
    badge: {
      announcement: {
        padding: '4px 8px',
        backgroundColor: '#f6c23e',
        color: 'white',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600'
      },
      event: {
        padding: '4px 8px',
        backgroundColor: '#1cc88a',
        color: 'white',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600'
      },
      opportunity: {
        padding: '4px 8px',
        backgroundColor: '#4e73df',
        color: 'white',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600'
      }
    },
    postContent: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#5a5c69',
      marginBottom: '16px'
    },
    postStats: {
      display: 'flex',
      gap: '20px',
      padding: '12px 0',
      borderTop: '1px solid #f8f9fc',
      borderBottom: '1px solid #f8f9fc',
      fontSize: '13px',
      color: '#858796'
    },
    postActions: {
      display: 'flex',
      gap: '16px',
      paddingTop: '12px'
    },
    actionButton: {
      flex: 1,
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#858796',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#f8f9fc',
        color: '#1f2f70'
      }
    },
    likedButton: {
      color: '#1cc88a',
      fontWeight: '600'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '600px',
      padding: '24px'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2f70',
      margin: 0
    },
    modalClose: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#858796'
    },
    modalTextarea: {
      width: '100%',
      padding: '16px',
      border: '1px solid #d1d3e2',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '16px',
      resize: 'vertical',
      minHeight: '120px',
      outline: 'none',
      ':focus': {
        borderColor: '#1cc88a'
      }
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    },
    modalCancel: {
      padding: '10px 20px',
      backgroundColor: '#f8f9fc',
      color: '#5a5c69',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    modalPost: {
      padding: '10px 20px',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Social Feed</h1>
        <button 
          style={styles.createButton}
          onClick={() => setShowPostModal(true)}
        >
          + Create Post
        </button>
      </div>

      {/* Create Post Card (Quick access) */}
      <div style={styles.createPostCard} onClick={() => setShowPostModal(true)}>
        <div style={styles.createPostPlaceholder}>
          <div style={styles.userAvatar}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span style={styles.placeholderText}>
            What's on your mind, {user?.name?.split(' ')[0]}?
          </span>
        </div>
      </div>

      {/* Posts Feed */}
      <div style={styles.postsList}>
        {posts.map(post => (
          <div key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <div style={styles.postHeader}>
              <div style={styles.postAuthor}>
                <div style={{
                  ...styles.authorAvatar,
                  ...(post.author.role === 'faculty' ? styles.facultyAvatar : {})
                }}>
                  {post.author.avatar}
                </div>
                <div style={styles.authorInfo}>
                  <div style={styles.authorName}>{post.author.name}</div>
                  <div style={styles.authorMeta}>
                    <span>{post.author.role}</span>
                    <span>•</span>
                    <span>{post.author.department}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              {getTypeBadge(post.type)}
            </div>

            {/* Post Content */}
            <div style={styles.postContent}>
              {post.content}
            </div>

            {/* Post Stats */}
            <div style={styles.postStats}>
              <span>❤️ {post.likes} likes</span>
              <span>💬 {post.comments.length} comments</span>
            </div>

            {/* Post Actions */}
            <div style={styles.postActions}>
              <button 
                style={{
                  ...styles.actionButton,
                  ...(post.liked ? styles.likedButton : {})
                }}
                onClick={() => handleLike(post.id)}
              >
                👍 {post.liked ? 'Liked' : 'Like'}
              </button>
              <button style={styles.actionButton}>
                💬 Comment
              </button>
              <button style={styles.actionButton}>
                🔗 Share
              </button>
            </div>

            {/* Comment Section */}
            <CommentSection 
              comments={post.comments}
              onAddComment={(comment) => handleAddComment(post.id, comment)}
            />
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {showPostModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPostModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Create Post</h3>
              <button 
                style={styles.modalClose}
                onClick={() => setShowPostModal(false)}
              >
                ×
              </button>
            </div>
            <textarea
              style={styles.modalTextarea}
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              autoFocus
            />
            <div style={styles.modalActions}>
              <button 
                style={styles.modalCancel}
                onClick={() => setShowPostModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.modalPost}
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;