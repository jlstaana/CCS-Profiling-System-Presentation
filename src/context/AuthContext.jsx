import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure Axios defaults for Laravel Backend
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('ccs_user');
    const token = localStorage.getItem('ccs_token');
    
    if (storedUser && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch fresh user data with full profile
      axios.get('/profile').then(res => {
        setUser(res.data);
        localStorage.setItem('ccs_user', JSON.stringify(res.data));
      }).catch(() => {
        setUser(JSON.parse(storedUser));
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (userData) => {
    try {
      const res = await axios.post('/register', userData);
      const userRes = await axios.get('/profile', {
        headers: { 'Authorization': `Bearer ${res.data.token}` }
      });
      setUser(userRes.data);
      localStorage.setItem('ccs_user', JSON.stringify(userRes.data));
      localStorage.setItem('ccs_token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return { success: true, user: userRes.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/login', { email, password });
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      const userRes = await axios.get('/profile');
      setUser(userRes.data);
      localStorage.setItem('ccs_user', JSON.stringify(userRes.data));
      localStorage.setItem('ccs_token', res.data.token);
      return { success: true, user: userRes.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      if (localStorage.getItem('ccs_token')) {
        await axios.post('/logout');
      }
    } catch (err) {
      console.error(err);
    } finally {
        setUser(null);
        localStorage.removeItem('ccs_user');
        localStorage.removeItem('ccs_token');
        delete axios.defaults.headers.common['Authorization'];
    }
  };

  const updateUser = (newDetails) => {
    const updatedUser = { ...user, ...newDetails };
    setUser(updatedUser);
    localStorage.setItem('ccs_user', JSON.stringify(updatedUser));
  };

  // Calls the backend and keeps local state in sync
  const updateProfile = async (minorChanges = {}, majorChanges = {}, studentProfile = {}) => {
    try {
      const res = await axios.post('/profile/update', { minorChanges, majorChanges, studentProfile });
      // Re-fetch fresh user data from the server
      const meRes = await axios.get('/profile');
      updateUser(meRes.data);
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Update failed' };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};