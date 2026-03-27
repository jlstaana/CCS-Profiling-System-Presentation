import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      login({
        id: 'admin001',
        name: 'Dr. Michael Chen',
        role: 'admin',
        email: 'michael.chen@ccs.edu',
        position: 'Department Chair'
      });
      navigate('/admin-dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>👑</div>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Department Chair Portal</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your admin email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>Student Login</Link>
          <span style={styles.separator}>•</span>
          <Link to="/faculty" style={styles.link}>Faculty Login</Link>
        </div>

        <div style={styles.warning}>
          <small>⚠️ Restricted access - Authorized personnel only</small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  /* ===== CONTAINER ===== */
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1f2f70, #4e73df)',
    padding: '20px'
  },

  /* ===== CARD ===== */
  card: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '18px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.2)',
    textAlign: 'center'
  },

  /* ===== HEADER ===== */
  header: {
    marginBottom: '30px'
  },

  logo: {
    fontSize: '50px',
    marginBottom: '10px'
  },

  title: {
    color: '#1f2f70',
    fontSize: '26px',
    fontWeight: '700'
  },

  subtitle: {
    color: '#858796',
    fontSize: '13px'
  },

  /* ===== FORM ===== */
  form: {
    marginBottom: '20px'
  },

  inputGroup: {
    marginBottom: '18px',
    textAlign: 'left'
  },

  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#5a5c69',
    fontSize: '13px',
    fontWeight: '500'
  },

  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #d1d3e2',
    borderRadius: '10px',
    fontSize: '14px',
    background: '#f8f9fc',
    transition: 'all 0.25s ease'
  },

  /* NOTE: pseudo styles don't work inline, but kept visual consistency */

  /* ===== BUTTON ===== */
  button: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #f6c23e, #d4a11e)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(246,194,62,0.3)'
  },

  /* ===== FOOTER ===== */
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
    fontSize: '13px'
  },

  link: {
    color: '#1f2f70',
    textDecoration: 'none',
    fontWeight: '500'
  },

  separator: {
    color: '#ccc'
  },

  /* ===== WARNING ===== */
  warning: {
    marginTop: '25px',
    padding: '10px',
    background: 'linear-gradient(135deg, #fff3cd, #ffeeba)',
    border: '1px solid #ffeeba',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#856404',
    fontSize: '12px'
  }
};

export default AdminLogin;