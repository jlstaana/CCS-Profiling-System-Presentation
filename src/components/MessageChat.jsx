import React, { useState, useEffect, useRef } from 'react';

const MessageChat = ({ contactName = 'Dr. Maria Santos', messages = [], onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const mockMessages = messages.length > 0 ? messages : [
    { id: 1, author: 'Dr. Maria Santos', text: 'Hi! Great job on your project proposal. I like the approach you took with the database design.', time: '2h ago', me: false },
    { id: 2, author: 'You', text: 'Thank you professor! I was inspired by your lecture on normalization.', time: '1h ago', me: true },
    { id: 3, author: 'Dr. Maria Santos', text: "That's wonderful to hear! Keep up the good work. Do you have questions about the ER diagram?", time: '45min ago', me: false }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mockMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timeStr) => {
    const now = new Date();
    const time = new Date(timeStr);
    const diff = now - time;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
    return time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const styles = {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fc'
    },
    header: {
      padding: '20px',
      borderBottom: '1px solid #e3e6f0',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    contactAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#1cc88a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: '600'
    },
    contactInfo: {
      flex: 1
    },
    contactName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2f70',
      marginBottom: '2px'
    },
    contactStatus: {
      fontSize: '13px',
      color: '#1cc88a',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    onlineIndicator: {
      width: '8px',
      height: '8px',
      backgroundColor: '#1cc88a',
      borderRadius: '50%'
    },
    messagesContainer: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    message: {
      maxWidth: '70%',
      padding: '12px 16px',
      borderRadius: '18px',
      fontSize: '14px',
      lineHeight: '1.4',
      position: 'relative'
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#1f2f70',
      color: 'white',
      borderBottomRightRadius: '4px'
    },
    theirMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'white',
      border: '1px solid #e3e6f0',
      borderBottomLeftRadius: '4px'
    },
    messageTime: {
      fontSize: '11px',
      opacity: '0.7',
      marginTop: '4px',
      textAlign: 'right'
    },
    inputContainer: {
      padding: '20px',
      borderTop: '1px solid #e3e6f0',
      backgroundColor: 'white',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-end'
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #d1d3e2',
      borderRadius: '25px',
      fontSize: '14px',
      outline: 'none',
      resize: 'none',
      maxHeight: '120px'
    },
    sendButton: {
      width: '42px',
      height: '42px',
      border: 'none',
      backgroundColor: '#1cc88a',
      borderRadius: '50%',
      color: 'white',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.contactAvatar}>{contactName.charAt(0)}</div>
        <div style={styles.contactInfo}>
          <div style={styles.contactName}>{contactName}</div>
          <div style={styles.contactStatus}>
            <span style={styles.onlineIndicator}></span>
            Online
          </div>
        </div>
      </div>

      <div style={styles.messagesContainer}>
        {mockMessages.map(msg => (
          <div 
            key={msg.id}
            style={{
              ...styles.message,
              ...(msg.me ? styles.myMessage : styles.theirMessage)
            }}
          >
            <div>{msg.text}</div>
            <div style={styles.messageTime}>{formatTime(msg.time)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={styles.inputContainer}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message... (Academic discussions only)"
          style={styles.input}
          rows={1}
          maxLength={1000}
        />
        <button type="submit" disabled={!newMessage.trim()} style={styles.sendButton}>
          ➤
        </button>
      </form>
    </div>
  );
};

export default MessageChat;

