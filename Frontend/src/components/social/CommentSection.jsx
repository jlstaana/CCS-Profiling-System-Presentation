import React, { useState } from 'react';

const CommentSection = ({ comments = [], onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const styles = {
    container: {
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #e3e6f0'
    },
    header: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2f70',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    count: {
      color: '#858796',
      marginLeft: '4px',
      fontSize: '12px',
      fontWeight: '400'
    },
    commentsList: {
      maxHeight: '300px',
      overflowY: 'auto',
      marginBottom: '16px'
    },
    comment: {
      display: 'flex',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid #f8f9fc'
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      flexShrink: 0
    },
    facultyAvatar: {
      backgroundColor: '#1cc88a'
    },
    commentContent: {
      flex: 1
    },
    authorRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px'
    },
    author: {
      fontWeight: '600',
      color: '#1f2f70',
      fontSize: '14px'
    },
    role: {
      fontSize: '11px',
      color: '#858796',
      textTransform: 'capitalize'
    },
    text: {
      color: '#5a5c69',
      fontSize: '14px',
      lineHeight: '1.4',
      marginBottom: '4px'
    },
    time: {
      fontSize: '11px',
      color: '#858796'
    },
    form: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px'
    },
    input: {
      flex: 1,
      padding: '10px 14px',
      border: '1px solid #d1d3e2',
      borderRadius: '20px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      ':focus': {
        borderColor: '#1cc88a'
      }
    },
    submit: {
      padding: '10px 20px',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#169b6b',
        transform: 'translateY(-1px)'
      },
      ':disabled': {
        backgroundColor: '#a0d0b8',
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    empty: {
      textAlign: 'center',
      padding: '20px',
      color: '#858796',
      fontSize: '14px'
    }
  };

  // Function to determine avatar color based on role
  const getAvatarStyle = (role) => {
    if (role === 'faculty') return styles.facultyAvatar;
    return {};
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        Comments
        <span style={styles.count}>({comments.length})</span>
      </div>
      
      <div style={styles.commentsList}>
        {comments.length === 0 ? (
          <div style={styles.empty}>
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.id || index} style={styles.comment}>
              <div style={{...styles.avatar, ...getAvatarStyle(comment.role)}}>
                {comment.author?.charAt(0) || comment.name?.charAt(0) || '?'}
              </div>
              <div style={styles.commentContent}>
                <div style={styles.authorRow}>
                  <span style={styles.author}>{comment.author || comment.name}</span>
                  {comment.role && (
                    <span style={styles.role}>{comment.role}</span>
                  )}
                </div>
                <div style={styles.text}>{comment.text || comment.content}</div>
                <div style={styles.time}>{comment.time || comment.timestamp || 'Just now'}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={styles.input}
          maxLength={500}
        />
        <button 
          type="submit" 
          disabled={!newComment.trim()} 
          style={styles.submit}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentSection;