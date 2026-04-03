import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSocial } from '../../context/SocialContext';

const Messages = () => {
  const { user } = useAuth();
  const { allUsers } = useSocial();

  // Conversations from API
  const [conversations, setConversations] = useState([]);
  const [convLoading, setConvLoading] = useState(true);

  // Selected chat
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);

  // Input
  const [messageInput, setMessageInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // New message modal
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMsgSearch, setNewMsgSearch] = useState('');

  // Sidebar search
  const [searchTerm, setSearchTerm] = useState('');

  // ── Fetch conversations on mount ──
  const fetchConversations = async () => {
    setConvLoading(true);
    try {
      const res = await axios.get('/messages/conversations');
      setConversations(res.data);
    } catch (e) { console.error(e); }
    finally { setConvLoading(false); }
  };

  useEffect(() => { fetchConversations(); }, []);

  // ── Fetch messages when a conversation is selected ──
  const openConversation = async (conv) => {
    setSelectedConvId(conv.id);
    setMsgLoading(true);
    try {
      const res = await axios.get(`/messages/conversations/${conv.id}/messages`);
      setMessages(res.data);
      // Mark as read
      axios.post(`/messages/conversations/${conv.id}/read`).catch(() => {});
    } catch (e) { console.error(e); }
    finally { setMsgLoading(false); }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send message ──
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConvId || sending) return;
    setSending(true);
    try {
      const res = await axios.post(`/messages/conversations/${selectedConvId}`, {
        content: messageInput,
      });
      setMessages(prev => [...prev, res.data]);
      setMessageInput('');
      // Update last message preview in sidebar
      setConversations(prev => prev.map(c =>
        c.id === selectedConvId
          ? { ...c, last_message: { content: messageInput, created_at: new Date().toISOString() }, unread_count: 0 }
          : c
      ));
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };

  // ── Start new conversation from modal ──
  const handleStartConversation = async (otherUser) => {
    setShowNewMessage(false);
    // Check if conversation already exists
    const existing = conversations.find(c => c.other_user?.id === otherUser.id);
    if (existing) { openConversation(existing); return; }
    // Open a virtual conversation (first message will create it on the backend)
    const virtual = {
      id: `new-${otherUser.id}`,
      other_user: otherUser,
      last_message: null,
      unread_count: 0,
      _isNew: true,
      _newUserId: otherUser.id,
    };
    setConversations(prev => [virtual, ...prev]);
    setSelectedConvId(virtual.id);
    setMessages([]);
  };

  // If currently in a "new" (virtual) conversation and user sends a message, create it via the API
  const handleSendNewConversation = async () => {
    if (!messageInput.trim() || sending) return;
    const conv = conversations.find(c => c.id === selectedConvId);
    if (!conv?._isNew) return;
    setSending(true);
    try {
      // Send first message — backend creates the conversation
      const res = await axios.post(`/messages/conversations/${conv._newUserId}`, {
        content: messageInput,
      });
      setMessageInput('');
      // Refresh conversations to get the real one
      await fetchConversations();
      setSelectedConvId(res.data?.conversation_id || null);
      if (res.data?.conversation_id) {
        const msgRes = await axios.get(`/messages/conversations/${res.data.conversation_id}/messages`);
        setMessages(msgRes.data);
      }
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  };

  const isNewConv = conversations.find(c => c.id === selectedConvId)?._isNew;

  const filteredConvs = conversations.filter(c =>
    (c.other_user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNewUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(newMsgSearch.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(newMsgSearch.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConvId);

  return (
    <div style={S.container}>
      {/* ── Sidebar ── */}
      <div style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <h2 style={S.sidebarTitle}>Messages</h2>
          <button style={S.newBtn} onClick={() => { setNewMsgSearch(''); setShowNewMessage(true); }}>✉+</button>
        </div>
        <div style={S.searchBox}>
          <input
            style={S.searchInput}
            type="text"
            placeholder="Search conversations…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={S.convList}>
          {convLoading ? (
            <div style={S.hint}>Loading…</div>
          ) : filteredConvs.length === 0 ? (
            <div style={S.hint}>No conversations yet.</div>
          ) : filteredConvs.map(conv => (
            <div
              key={conv.id}
              style={{ ...S.convItem, ...(selectedConvId === conv.id ? S.convActive : {}) }}
              onClick={() => conv._isNew ? setSelectedConvId(conv.id) : openConversation(conv)}
            >
              <div style={{ ...S.avatar, backgroundColor: conv.other_user?.role === 'faculty' ? '#4e73df' : '#1cc88a' }}>
                {(conv.other_user?.name || '?').charAt(0)}
              </div>
              <div style={S.convInfo}>
                <div style={S.convHeader}>
                  <span style={S.convName}>{conv.other_user?.name || 'Unknown'}</span>
                  <span style={S.convTime}>
                    {conv.last_message ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <div style={S.convPreview}>
                  {conv._isNew ? 'New conversation' : (conv.last_message?.content || 'No messages yet')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={S.roleLabel}>{conv.other_user?.role}</span>
                  {conv.unread_count > 0 && <span style={S.badge}>{conv.unread_count}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat Area ── */}
      {selectedConv ? (
        <div style={S.chatArea}>
          {/* Header */}
          <div style={S.chatHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...S.avatar, backgroundColor: selectedConv.other_user?.role === 'faculty' ? '#4e73df' : '#1cc88a', width: 44, height: 44 }}>
                {(selectedConv.other_user?.name || '?').charAt(0)}
              </div>
              <div>
                <div style={S.chatName}>{selectedConv.other_user?.name}</div>
                <div style={S.chatMeta}>{selectedConv.other_user?.role} · {selectedConv.other_user?.department || selectedConv.other_user?.course || ''}</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={S.msgContainer}>
            {msgLoading ? (
              <div style={S.hint}>Loading messages…</div>
            ) : messages.length === 0 ? (
              <div style={S.hint}>No messages yet. Say hello! 👋</div>
            ) : messages.map((msg, i) => {
              const isMe = msg.sender_id === user?.id;
              return (
                <div key={msg.id || i} style={isMe ? S.sentWrapper : S.recvWrapper}>
                  {!isMe && (
                    <div style={{ ...S.msgAvatar, backgroundColor: '#4e73df' }}>
                      {(selectedConv.other_user?.name || '?').charAt(0)}
                    </div>
                  )}
                  <div style={{ ...S.bubble, ...(isMe ? S.sentBubble : S.recvBubble) }}>
                    <div style={S.msgText}>{msg.content || msg.text}</div>
                    <div style={S.msgTime}>
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={S.inputBar}>
            <textarea
              style={S.textInput}
              placeholder="Type a message…"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            <button
              style={{ ...S.sendBtn, opacity: (!messageInput.trim() || sending) ? 0.5 : 1 }}
              onClick={isNewConv ? handleSendNewConversation : handleSendMessage}
              disabled={!messageInput.trim() || sending}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <div style={S.emptyState}>
          <div style={{ fontSize: 64, opacity: 0.4, marginBottom: 20 }}>💬</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1f2f70', marginBottom: 10 }}>Your Messages</h3>
          <p style={{ color: '#858796', marginBottom: 20 }}>Select a conversation or start a new one</p>
          <button style={S.startBtn} onClick={() => { setNewMsgSearch(''); setShowNewMessage(true); }}>
            New Message
          </button>
        </div>
      )}

      {/* ── New Message Modal ── */}
      {showNewMessage && (
        <div style={S.overlay} onClick={() => setShowNewMessage(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHead}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#1f2f70' }}>New Message</h3>
              <button onClick={() => setShowNewMessage(false)} style={S.closeBtn}>×</button>
            </div>
            <div style={{ padding: '12px 20px' }}>
              <input
                style={S.searchInput}
                type="text"
                placeholder="Search people…"
                value={newMsgSearch}
                onChange={e => setNewMsgSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
              {filteredNewUsers.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#858796' }}>
                  {newMsgSearch.length < 1 ? 'Type to search users…' : 'No users found.'}
                </div>
              ) : filteredNewUsers.map(u => (
                <div
                  key={u.id}
                  style={S.userRow}
                  onClick={() => handleStartConversation(u)}
                >
                  <div style={{ ...S.avatar, backgroundColor: u.role === 'faculty' ? '#4e73df' : '#1cc88a' }}>
                    {u.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#1f2f70', fontSize: 14 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: '#858796', textTransform: 'capitalize' }}>
                      {u.role}{u.department ? ` · ${u.department}` : ''}{u.course ? ` · ${u.course}` : ''}
                    </div>
                  </div>
                  <span style={S.msgBtn}>Message →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const S = {
  container: { display: 'flex', height: 'calc(100vh - 120px)', backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  sidebar: { width: 320, borderRight: '1px solid #e3e6f0', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fc', flexShrink: 0 },
  sidebarHeader: { padding: '18px 16px', borderBottom: '1px solid #e3e6f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sidebarTitle: { fontSize: 18, fontWeight: 600, color: '#1f2f70', margin: 0 },
  newBtn: { width: 34, height: 34, borderRadius: '50%', backgroundColor: '#1cc88a', color: 'white', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700 },
  searchBox: { padding: '10px 12px', borderBottom: '1px solid #e3e6f0' },
  searchInput: { width: '100%', padding: '9px 14px', border: '1px solid #d1d3e2', borderRadius: 20, fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  convList: { flex: 1, overflowY: 'auto' },
  convItem: { display: 'flex', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid #e3e6f0', backgroundColor: 'white', transition: 'background .2s' },
  convActive: { backgroundColor: '#f0f9ff', borderLeft: '4px solid #1cc88a' },
  avatar: { width: 42, height: 42, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, flexShrink: 0 },
  convInfo: { flex: 1, minWidth: 0 },
  convHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  convName: { fontSize: 14, fontWeight: 600, color: '#1f2f70' },
  convTime: { fontSize: 11, color: '#858796' },
  convPreview: { fontSize: 13, color: '#5a5c69', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 },
  roleLabel: { fontSize: 11, color: '#858796', textTransform: 'capitalize' },
  badge: { backgroundColor: '#1cc88a', color: 'white', borderRadius: 12, padding: '1px 7px', fontSize: 11, fontWeight: 600 },
  hint: { padding: 30, textAlign: 'center', color: '#858796', fontSize: 14 },
  chatArea: { flex: 1, display: 'flex', flexDirection: 'column' },
  chatHeader: { padding: '16px 20px', borderBottom: '1px solid #e3e6f0', backgroundColor: 'white' },
  chatName: { fontSize: 15, fontWeight: 600, color: '#1f2f70', marginBottom: 2 },
  chatMeta: { fontSize: 12, color: '#858796', textTransform: 'capitalize' },
  msgContainer: { flex: 1, overflowY: 'auto', padding: '20px 16px', backgroundColor: '#f8f9fc', display: 'flex', flexDirection: 'column', gap: 12 },
  sentWrapper: { display: 'flex', justifyContent: 'flex-end', maxWidth: '72%', alignSelf: 'flex-end', width: '100%' },
  recvWrapper: { display: 'flex', gap: 8, maxWidth: '72%', alignSelf: 'flex-start' },
  msgAvatar: { width: 30, height: 30, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0, marginTop: 4 },
  bubble: { padding: '10px 14px', borderRadius: 18, maxWidth: '100%' },
  sentBubble: { backgroundColor: '#1cc88a', color: 'white', borderBottomRightRadius: 4 },
  recvBubble: { backgroundColor: 'white', color: '#1f2f70', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderBottomLeftRadius: 4 },
  msgText: { fontSize: 14, lineHeight: 1.5, marginBottom: 3 },
  msgTime: { fontSize: 10, opacity: 0.65, textAlign: 'right' },
  inputBar: { padding: '16px', borderTop: '1px solid #e3e6f0', display: 'flex', gap: 10, backgroundColor: 'white' },
  textInput: { flex: 1, padding: '10px 16px', border: '1px solid #d1d3e2', borderRadius: 24, fontSize: 14, outline: 'none', resize: 'none', maxHeight: 100, fontFamily: 'inherit' },
  sendBtn: { width: 46, height: 46, borderRadius: '50%', backgroundColor: '#1cc88a', color: 'white', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  emptyState: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, color: '#858796', textAlign: 'center' },
  startBtn: { padding: '11px 24px', backgroundColor: '#1cc88a', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 },
  modal: { backgroundColor: 'white', borderRadius: 14, width: '90%', maxWidth: 480, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  modalHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3e6f0' },
  closeBtn: { background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#858796', lineHeight: 1 },
  userRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', transition: 'background .15s' },
  msgBtn: { fontSize: 12, color: '#1f2f70', fontWeight: 600, flexShrink: 0 },
};

export default Messages;