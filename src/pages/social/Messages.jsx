import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import ConnectButton from '../../components/social/ConnectButton';

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [conversations, setConversations] = useState([
    {
      id: 1,
      with: {
        name: 'Dr. Maria Santos',
        avatar: 'M',
        role: 'faculty',
        department: 'CS',
        online: true
      },
      lastMessage: {
        text: 'Great job on your project proposal! Let me know if you need any revisions.',
        time: '10:30 AM',
        read: false
      },
      unread: 2,
      messages: [
        { id: 101, sender: 'them', text: 'Hello! I\'ve submitted my project proposal.', time: '9:00 AM' },
        { id: 102, sender: 'them', text: 'Please let me know if you have any feedback.', time: '9:01 AM' },
        { id: 103, sender: 'me', text: 'Hi Dr. Santos, I\'ll check it right away.', time: '9:30 AM' },
        { id: 104, sender: 'them', text: 'Great job on your project proposal! Let me know if you need any revisions.', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      with: {
        name: 'John Smith',
        avatar: 'J',
        role: 'student',
        course: 'CS 301',
        online: false
      },
      lastMessage: {
        text: 'Can we meet to discuss the group project?',
        time: 'Yesterday',
        read: true
      },
      unread: 0,
      messages: [
        { id: 201, sender: 'them', text: 'Hey! Are you free this afternoon?', time: 'Yesterday' },
        { id: 202, sender: 'me', text: 'Sure, what time?', time: 'Yesterday' },
        { id: 203, sender: 'them', text: 'Can we meet to discuss the group project?', time: 'Yesterday' }
      ]
    },
    {
      id: 3,
      with: {
        name: 'CS Student Council',
        avatar: 'S',
        role: 'organization',
        online: true
      },
      lastMessage: {
        text: 'Hackathon registration closes tomorrow! Sign up now!',
        time: '2:30 PM',
        read: false
      },
      unread: 1,
      messages: [
        { id: 301, sender: 'them', text: 'Join us for the annual CS Hackathon!', time: 'Yesterday' },
        { id: 302, sender: 'them', text: 'Hackathon registration closes tomorrow! Sign up now!', time: '2:30 PM' }
      ]
    },
    {
      id: 4,
      with: {
        name: 'Alice Johnson',
        avatar: 'A',
        role: 'student',
        course: 'CS 302',
        online: true
      },
      lastMessage: {
        text: 'Thanks for the study notes! They were really helpful.',
        time: '11:45 AM',
        read: true
      },
      unread: 0,
      messages: [
        { id: 401, sender: 'me', text: 'Here are the notes from today\'s lecture.', time: '10:00 AM' },
        { id: 402, sender: 'them', text: 'Thanks for the study notes! They were really helpful.', time: '11:45 AM' }
      ]
    }
  ]);

  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        text: messageInput,
        time: 'Just now'
      };

      setConversations(conversations.map(conv => {
        if (conv.id === selectedChat.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: {
              text: messageInput,
              time: 'Just now',
              read: false
            }
          };
        }
        return conv;
      }));

      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastMessage: {
          text: messageInput,
          time: 'Just now',
          read: false
        }
      });

      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTimeDisplay = (time) => {
    if (time === 'Just now') return time;
    if (time.includes(':')) return time;
    return time;
  };

  const styles = {
    container: {
      display: 'flex',
      height: 'calc(100vh - 120px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    sidebar: {
      width: '350px',
      borderRight: '1px solid #e3e6f0',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fc'
    },
    sidebarHeader: {
      padding: '20px',
      borderBottom: '1px solid #e3e6f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    sidebarTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2f70',
      margin: 0
    },
    newMessageBtn: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.1)',
        backgroundColor: '#169b6b'
      }
    },
    searchContainer: {
      padding: '16px',
      borderBottom: '1px solid #e3e6f0'
    },
    searchInput: {
      width: '100%',
      padding: '10px 16px',
      border: '1px solid #d1d3e2',
      borderRadius: '20px',
      fontSize: '14px',
      outline: 'none',
      ':focus': {
        borderColor: '#1cc88a'
      }
    },
    conversationsList: {
      flex: 1,
      overflowY: 'auto'
    },
    conversationItem: {
      display: 'flex',
      gap: '12px',
      padding: '16px',
      cursor: 'pointer',
      borderBottom: '1px solid #e3e6f0',
      transition: 'background-color 0.2s ease',
      position: 'relative',
      backgroundColor: 'white',
      ':hover': {
        backgroundColor: '#f0f9ff'
      }
    },
    selectedConversation: {
      backgroundColor: '#f0f9ff',
      borderLeft: '4px solid #1cc88a'
    },
    conversationAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: '600',
      position: 'relative',
      flexShrink: 0
    },
    facultyAvatar: {
      backgroundColor: '#1cc88a'
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: '2px',
      right: '2px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#1cc88a',
      border: '2px solid white'
    },
    conversationInfo: {
      flex: 1,
      minWidth: 0
    },
    conversationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    },
    conversationName: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#1f2f70'
    },
    conversationTime: {
      fontSize: '11px',
      color: '#858796'
    },
    conversationPreview: {
      fontSize: '13px',
      color: '#5a5c69',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginBottom: '4px'
    },
    conversationMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    role: {
      fontSize: '11px',
      color: '#858796',
      textTransform: 'capitalize'
    },
    unreadBadge: {
      backgroundColor: '#1cc88a',
      color: 'white',
      borderRadius: '12px',
      padding: '2px 8px',
      fontSize: '11px',
      fontWeight: '600',
      minWidth: '20px',
      textAlign: 'center'
    },
    chatArea: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    chatHeader: {
      padding: '20px',
      borderBottom: '1px solid #e3e6f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    chatUser: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    chatAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: '600',
      position: 'relative'
    },
    chatInfo: {
      flex: 1
    },
    chatName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2f70',
      marginBottom: '4px'
    },
    chatStatus: {
      fontSize: '12px',
      color: '#858796',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    onlineStatus: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#1cc88a',
      display: 'inline-block'
    },
    chatActions: {
      display: 'flex',
      gap: '8px'
    },
    actionIcon: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#f8f9fc',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#e4e6ef'
      }
    },
    messagesContainer: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      backgroundColor: '#f8f9fc'
    },
    messageWrapper: {
      display: 'flex',
      width: '100%'
    },
    messageReceived: {
      display: 'flex',
      gap: '8px',
      maxWidth: '70%'
    },
    messageSent: {
      display: 'flex',
      justifyContent: 'flex-end',
      maxWidth: '70%',
      marginLeft: 'auto'
    },
    messageAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      flexShrink: 0
    },
    messageBubble: {
      padding: '10px 14px',
      borderRadius: '18px',
      backgroundColor: 'white',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      position: 'relative'
    },
    sentBubble: {
      backgroundColor: '#1cc88a',
      color: 'white'
    },
    messageText: {
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '4px'
    },
    messageTime: {
      fontSize: '10px',
      opacity: 0.7,
      textAlign: 'right'
    },
    messageInputContainer: {
      padding: '20px',
      borderTop: '1px solid #e3e6f0',
      display: 'flex',
      gap: '12px',
      backgroundColor: 'white'
    },
    messageInput: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #d1d3e2',
      borderRadius: '24px',
      fontSize: '14px',
      outline: 'none',
      resize: 'none',
      maxHeight: '100px',
      fontFamily: 'inherit',
      ':focus': {
        borderColor: '#1cc88a'
      }
    },
    sendButton: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#169b6b',
        transform: 'scale(1.05)'
      },
      ':disabled': {
        backgroundColor: '#a0d0b8',
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    emptyState: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: '#858796',
      textAlign: 'center'
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '20px',
      opacity: 0.5
    },
    emptyTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2f70',
      marginBottom: '10px'
    },
    emptyText: {
      fontSize: '14px',
      marginBottom: '20px'
    },
    startChatBtn: {
      padding: '12px 24px',
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
      maxWidth: '500px',
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
    searchResults: {
      maxHeight: '300px',
      overflowY: 'auto',
      marginBottom: '20px'
    },
    resultItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f8f9fc'
      }
    },
    resultAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: '600'
    },
    resultInfo: {
      flex: 1
    },
    resultName: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#1f2f70',
      marginBottom: '2px'
    },
    resultMeta: {
      fontSize: '12px',
      color: '#858796'
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.with.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchUsers = [
    { name: 'Dr. Emily Davis', role: 'faculty', department: 'CS', avatar: 'E' },
    { name: 'Michael Brown', role: 'student', course: 'CS 303', avatar: 'M' },
    { name: 'Prof. Sarah Wilson', role: 'faculty', department: 'IT', avatar: 'S' }
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Messages</h2>
          <button 
            style={styles.newMessageBtn}
            onClick={() => setShowNewMessage(true)}
          >
            +
          </button>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search conversations..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.conversationsList}>
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              style={{
                ...styles.conversationItem,
                ...(selectedChat?.id === conv.id ? styles.selectedConversation : {})
              }}
              onClick={() => setSelectedChat(conv)}
            >
              <div style={{
                ...styles.conversationAvatar,
                ...(conv.with.role === 'faculty' ? styles.facultyAvatar : {})
              }}>
                {conv.with.avatar}
                {conv.with.online && <span style={styles.onlineIndicator}></span>}
              </div>
              <div style={styles.conversationInfo}>
                <div style={styles.conversationHeader}>
                  <span style={styles.conversationName}>{conv.with.name}</span>
                  <span style={styles.conversationTime}>{conv.lastMessage.time}</span>
                </div>
                <div style={styles.conversationPreview}>
                  {conv.lastMessage.text}
                </div>
                <div style={styles.conversationMeta}>
                  <span style={styles.role}>{conv.with.role}</span>
                  {conv.unread > 0 && (
                    <span style={styles.unreadBadge}>{conv.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div style={styles.chatArea}>
          {/* Chat Header */}
          <div style={styles.chatHeader}>
            <div style={styles.chatUser}>
              <div style={{
                ...styles.chatAvatar,
                ...(selectedChat.with.role === 'faculty' ? styles.facultyAvatar : {})
              }}>
                {selectedChat.with.avatar}
                {selectedChat.with.online && <span style={styles.onlineIndicator}></span>}
              </div>
              <div style={styles.chatInfo}>
                <div style={styles.chatName}>{selectedChat.with.name}</div>
                <div style={styles.chatStatus}>
                  {selectedChat.with.online ? (
                    <>
                      <span style={styles.onlineStatus}></span>
                      <span>Online</span>
                    </>
                  ) : (
                    <span>Offline</span>
                  )}
                  <span>•</span>
                  <span>{selectedChat.with.role}</span>
                  <span>•</span>
                  <span>{selectedChat.with.department || selectedChat.with.course}</span>
                </div>
              </div>
            </div>
            <div style={styles.chatActions}>
              <button style={styles.actionIcon}>📞</button>
              <button style={styles.actionIcon}>📹</button>
              <button style={styles.actionIcon}>ℹ️</button>
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messagesContainer}>
            {selectedChat.messages.map((msg, index) => (
              <div
                key={msg.id || index}
                style={msg.sender === 'me' ? styles.messageSent : styles.messageReceived}
              >
                {msg.sender !== 'me' && (
                  <div style={styles.messageAvatar}>
                    {selectedChat.with.avatar}
                  </div>
                )}
                <div style={{
                  ...styles.messageBubble,
                  ...(msg.sender === 'me' ? styles.sentBubble : {})
                }}>
                  <div style={styles.messageText}>{msg.text}</div>
                  <div style={styles.messageTime}>{getTimeDisplay(msg.time)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={styles.messageInputContainer}>
            <textarea
              style={styles.messageInput}
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            <button
              style={styles.sendButton}
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>💬</div>
          <h3 style={styles.emptyTitle}>Your Messages</h3>
          <p style={styles.emptyText}>
            Select a conversation to start chatting
          </p>
          <button
            style={styles.startChatBtn}
            onClick={() => setShowNewMessage(true)}
          >
            New Message
          </button>
        </div>
      )}

      {/* New Message Modal */}
      {showNewMessage && (
        <div style={styles.modalOverlay} onClick={() => setShowNewMessage(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>New Message</h3>
              <button
                style={styles.modalClose}
                onClick={() => setShowNewMessage(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search for people..."
                style={styles.searchInput}
                autoFocus
              />
            </div>

            <div style={styles.searchResults}>
              {searchUsers.map((user, index) => (
                <div key={index} style={styles.resultItem}>
                  <div style={styles.resultAvatar}>{user.avatar}</div>
                  <div style={styles.resultInfo}>
                    <div style={styles.resultName}>{user.name}</div>
                    <div style={styles.resultMeta}>
                      {user.role} • {user.department || user.course}
                    </div>
                  </div>
                  <ConnectButton userName={user.name} variant="compact" size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;