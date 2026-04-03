import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocial } from '../../context/SocialContext';
import CommentSection from '../../components/social/CommentSection';

const SocialFeed = () => {
  const { user } = useAuth();
  const { posts, loading, createPost, likePost, addComment } = useSocial();

  const [newPost, setNewPost] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [posting, setPosting] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    setPosting(true);
    await createPost({ content: newPost });
    setNewPost('');
    setShowPostModal(false);
    setPosting(false);
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div style={S.container}>
      {/* Header */}
      <div style={S.header}>
        <h1 style={S.title}>Social Feed</h1>
        <button style={S.createButton} onClick={() => setShowPostModal(true)}>
          + Create Post
        </button>
      </div>

      {/* Quick-post card */}
      <div style={S.createPostCard} onClick={() => setShowPostModal(true)}>
        <div style={S.createPostPlaceholder}>
          <div style={S.userAvatar}>{user?.name?.charAt(0) || 'U'}</div>
          <span style={S.placeholderText}>What's on your mind, {user?.name?.split(' ')[0]}?</span>
        </div>
      </div>

      {/* Feed */}
      {loading ? (
        <div style={S.emptyState}>Loading posts…</div>
      ) : posts.length === 0 ? (
        <div style={S.emptyState}>No posts yet. Be the first to share something! 🎉</div>
      ) : (
        <div style={S.postsList}>
          {posts.map(post => (
            <div key={post.id} style={S.postCard}>
              {/* Author row */}
              <div style={S.postHeader}>
                <div style={S.postAuthor}>
                  <div style={{ ...S.authorAvatar, backgroundColor: post.author?.role === 'faculty' ? '#4e73df' : '#1cc88a' }}>
                    {post.author?.avatar || '?'}
                  </div>
                  <div style={S.authorInfo}>
                    <div style={S.authorName}>{post.author?.name}</div>
                    <div style={S.authorMeta}>
                      <span>{post.author?.role}</span>
                      <span>•</span>
                      <span>{post.author?.department}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={S.postContent}>{post.content}</div>

              {/* Stats */}
              <div style={S.postStats}>
                <span>❤️ {post.likes} likes</span>
                <span>💬 {post.comments?.length ?? 0} comments</span>
              </div>

              {/* Actions */}
              <div style={S.postActions}>
                <button
                  style={{ ...S.actionButton, ...(post.liked ? S.likedButton : {}) }}
                  onClick={() => likePost(post.id)}
                >
                  👍 {post.liked ? 'Liked' : 'Like'}
                </button>
                <button style={S.actionButton} onClick={() => toggleComments(post.id)}>
                  💬 Comment
                </button>
              </div>

              {/* Comments */}
              {expandedComments[post.id] && (
                <CommentSection
                  comments={post.comments || []}
                  onAddComment={(text) => addComment(post.id, text)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Post Modal */}
      {showPostModal && (
        <div style={S.modalOverlay} onClick={() => setShowPostModal(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <h3 style={S.modalTitle}>Create Post</h3>
              <button style={S.modalClose} onClick={() => setShowPostModal(false)}>×</button>
            </div>
            <textarea
              style={S.modalTextarea}
              placeholder="What's on your mind?"
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              autoFocus
            />
            <div style={S.modalActions}>
              <button style={S.modalCancel} onClick={() => setShowPostModal(false)}>Cancel</button>
              <button
                style={{ ...S.modalPost, opacity: (!newPost.trim() || posting) ? 0.5 : 1 }}
                onClick={handleCreatePost}
                disabled={!newPost.trim() || posting}
              >
                {posting ? 'Posting…' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const S = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '24px', fontWeight: '600', color: '#1f2f70', margin: 0 },
  createButton: { padding: '10px 20px', backgroundColor: '#1cc88a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  createPostCard: { backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', cursor: 'pointer' },
  createPostPlaceholder: { display: 'flex', alignItems: 'center', gap: '12px' },
  userAvatar: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#1f2f70', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '600', flexShrink: 0 },
  placeholderText: { color: '#858796', fontSize: '16px' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: '#858796', fontSize: '15px' },
  postsList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  postCard: { backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  postHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  postAuthor: { display: 'flex', gap: '12px' },
  authorAvatar: { width: '48px', height: '48px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '600', flexShrink: 0 },
  authorInfo: { flex: 1 },
  authorName: { fontSize: '16px', fontWeight: '600', color: '#1f2f70', marginBottom: '4px' },
  authorMeta: { fontSize: '12px', color: '#858796', display: 'flex', gap: '8px' },
  postContent: { fontSize: '15px', lineHeight: '1.6', color: '#5a5c69', marginBottom: '16px' },
  postStats: { display: 'flex', gap: '20px', padding: '12px 0', borderTop: '1px solid #f8f9fc', borderBottom: '1px solid #f8f9fc', fontSize: '13px', color: '#858796' },
  postActions: { display: 'flex', gap: '16px', paddingTop: '12px' },
  actionButton: { flex: 1, padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '6px', fontSize: '14px', color: '#858796', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  likedButton: { color: '#1cc88a', fontWeight: '600' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 },
  modal: { backgroundColor: 'white', borderRadius: '12px', width: '90%', maxWidth: '600px', padding: '24px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  modalTitle: { fontSize: '20px', fontWeight: '600', color: '#1f2f70', margin: 0 },
  modalClose: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#858796' },
  modalTextarea: { width: '100%', padding: '16px', border: '1px solid #d1d3e2', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', resize: 'vertical', minHeight: '120px', outline: 'none', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  modalCancel: { padding: '10px 20px', backgroundColor: '#f8f9fc', color: '#5a5c69', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  modalPost: { padding: '10px 20px', backgroundColor: '#1cc88a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
};

export default SocialFeed;