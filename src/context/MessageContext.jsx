import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MessageContext = createContext(null);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Load mock data
  useEffect(() => {
    if (user) {
      loadMockConversations();
      loadMockOnlineUsers();
    }
  }, [user]);

  const loadMockConversations = () => {
    // Mock conversations data
    const mockConversations = [
      {
        id: 1,
        participants: [
          { id: 2, name: 'Dr. Maria Santos', avatar: 'M', role: 'faculty', department: 'CS' },
          { id: user?.id, name: user?.name, avatar: user?.name?.charAt(0), role: user?.role }
        ],
        lastMessage: {
          content: 'Please check your assignment submission',
          timestamp: '2024-03-19T10:30:00',
          senderId: 2,
          read: false
        },
        messages: [
          {
            id: 101,
            senderId: 2,
            content: 'Hello! How are you doing with the database project?',
            timestamp: '2024-03-19T09:00:00',
            read: true
          },
          {
            id: 102,
            senderId: user?.id,
            content: 'Hi Dr. Santos! I\'m making good progress. Almost done with the ER diagram.',
            timestamp: '2024-03-19T09:05:00',
            read: true
          },
          {
            id: 103,
            senderId: 2,
            content: 'Great! Let me know if you need any help.',
            timestamp: '2024-03-19T09:10:00',
            read: true
          },
          {
            id: 104,
            senderId: 2,
            content: 'Please check your assignment submission',
            timestamp: '2024-03-19T10:30:00',
            read: false
          }
        ],
        unreadCount: 1,
        updatedAt: '2024-03-19T10:30:00'
      },
      {
        id: 2,
        participants: [
          { id: 3, name: 'John Smith', avatar: 'J', role: 'student', course: 'CS 301' },
          { id: user?.id, name: user?.name, avatar: user?.name?.charAt(0), role: user?.role }
        ],
        lastMessage: {
          content: 'Want to study together for the algorithms exam?',
          timestamp: '2024-03-18T15:20:00',
          senderId: 3,
          read: true
        },
        messages: [
          {
            id: 201,
            senderId: 3,
            content: 'Hey! Are you free this weekend?',
            timestamp: '2024-03-18T14:00:00',
            read: true
          },
          {
            id: 202,
            senderId: user?.id,
            content: 'Yeah, I should be free. What\'s up?',
            timestamp: '2024-03-18T14:30:00',
            read: true
          },
          {
            id: 203,
            senderId: 3,
            content: 'Want to study together for the algorithms exam?',
            timestamp: '2024-03-18T15:20:00',
            read: true
          }
        ],
        unreadCount: 0,
        updatedAt: '2024-03-18T15:20:00'
      },
      {
        id: 3,
        participants: [
          { id: 4, name: 'CS Student Council', avatar: 'S', role: 'organization' },
          { id: user?.id, name: user?.name, avatar: user?.name?.charAt(0), role: user?.role }
        ],
        lastMessage: {
          content: 'Hackathon registration closes tomorrow!',
          timestamp: '2024-03-19T08:15:00',
          senderId: 4,
          read: false
        },
        messages: [
          {
            id: 301,
            senderId: 4,
            content: 'Join us for the annual CS Hackathon!',
            timestamp: '2024-03-18T10:00:00',
            read: true
          },
          {
            id: 302,
            senderId: 4,
            content: 'Prizes: ₱10,000 for the winning team',
            timestamp: '2024-03-18T10:05:00',
            read: true
          },
          {
            id: 303,
            senderId: 4,
            content: 'Hackathon registration closes tomorrow!',
            timestamp: '2024-03-19T08:15:00',
            read: false
          }
        ],
        unreadCount: 1,
        updatedAt: '2024-03-19T08:15:00'
      }
    ];

    setConversations(mockConversations);
  };

  const loadMockOnlineUsers = () => {
    setOnlineUsers([
      { id: 2, name: 'Dr. Maria Santos', avatar: 'M', role: 'faculty', status: 'online' },
      { id: 3, name: 'John Smith', avatar: 'J', role: 'student', status: 'online' },
      { id: 4, name: 'CS Student Council', avatar: 'S', role: 'organization', status: 'online' },
      { id: 5, name: 'Alice Johnson', avatar: 'A', role: 'student', status: 'away' },
      { id: 6, name: 'Bob Williams', avatar: 'B', role: 'student', status: 'offline' }
    ]);
  };

  const sendMessage = (conversationId, content) => {
    const newMessage = {
      id: Date.now(),
      senderId: user.id,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };

    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: {
              content,
              timestamp: 'Just now',
              senderId: user.id
            },
            unreadCount: 0, // Reset unread count when user sends message
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      })
    );

    // Update active conversation if it's the one being messaged
    if (activeConversation?.id === conversationId) {
      setActiveConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: {
          content,
          timestamp: 'Just now',
          senderId: user.id
        }
      }));
    }
  };

  const startNewConversation = (participant) => {
    // Check if conversation already exists
    const existingConv = conversations.find(conv => 
      conv.participants.some(p => p.id === participant.id) &&
      conv.participants.some(p => p.id === user.id)
    );

    if (existingConv) {
      setActiveConversation(existingConv);
      return existingConv.id;
    }

    // Create new conversation
    const newConversation = {
      id: Date.now(),
      participants: [
        { id: user.id, name: user.name, avatar: user.name.charAt(0), role: user.role },
        { id: participant.id, name: participant.name, avatar: participant.avatar, role: participant.role }
      ],
      messages: [],
      lastMessage: null,
      unreadCount: 0,
      updatedAt: new Date().toISOString()
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    return newConversation.id;
  };

  const markAsRead = (conversationId) => {
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(msg => ({
              ...msg,
              read: true
            }))
          };
        }
        return conv;
      })
    );

    if (activeConversation?.id === conversationId) {
      setActiveConversation(prev => ({
        ...prev,
        unreadCount: 0,
        messages: prev.messages.map(msg => ({ ...msg, read: true }))
      }));
    }
  };

  const deleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (activeConversation?.id === conversationId) {
      setActiveConversation(null);
    }
  };

  const searchUsers = (query) => {
    // Mock user search - in real app, this would call an API
    const mockUsers = [
      { id: 2, name: 'Dr. Maria Santos', avatar: 'M', role: 'faculty', department: 'CS' },
      { id: 3, name: 'John Smith', avatar: 'J', role: 'student', course: 'CS 301' },
      { id: 4, name: 'CS Student Council', avatar: 'S', role: 'organization' },
      { id: 5, name: 'Prof. Michael Brown', avatar: 'M', role: 'faculty', department: 'IT' },
      { id: 6, name: 'Alice Johnson', avatar: 'A', role: 'student', course: 'CS 302' },
      { id: 7, name: 'Bob Williams', avatar: 'B', role: 'student', course: 'CS 303' },
      { id: 8, name: 'Dr. Emily Davis', avatar: 'E', role: 'faculty', department: 'CS' },
      { id: 9, name: 'Carlos Rodriguez', avatar: 'C', role: 'student', course: 'CS 301' }
    ];

    if (!query || query.length < 2) return [];
    return mockUsers.filter(u => 
      u.name.toLowerCase().includes(query.toLowerCase()) &&
      u.id !== user?.id // Don't include current user
    );
  };

  const getUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const value = {
    conversations,
    activeConversation,
    onlineUsers,
    loading,
    setActiveConversation,
    sendMessage,
    startNewConversation,
    markAsRead,
    deleteConversation,
    searchUsers,
    getUnreadCount
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};