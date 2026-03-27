import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FacultyLogin = () => {
  const [facultyId, setFacultyId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      login({
        id: facultyId,
        name: 'Prof. Jane Smith',
        role: 'faculty',
        email: 'jane.smith@ccs.edu',
        department: 'Computer Science',
        specialization: 'Database Systems'
      });
      navigate('/faculty-dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>👨‍🏫</div>
          <h1 style={styles.title}>Faculty Login</h1>
          <p style={styles.subtitle}>CCS Faculty Portal</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Faculty ID / Email</label>
            <input
              type="text"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              style={styles.input}
              placeholder="Enter your faculty ID"
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
            {loading ? 'Logging in...' : 'Login as Faculty'}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>Student Login</Link>
          <span style={styles.separator}>•</span>
          <Link to="/admin" style={styles.link}>Admin Login</Link>
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
    background: 'linear-gradient(135deg, #240f9d, #1cc88a)',
    padding: '20px'
  },

  /* ===== CARD ===== */
  card: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '18px',
    boxShadow: '0 20px 45px rgba(0,0,0,0.15)',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.25)',
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
    color: '#0f5132',
    fontSize: '26px',
    fontWeight: '700'
  },

  subtitle: {
    color: '#6c757d',
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
    color: '#495057',
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

  /* ===== BUTTON ===== */
  button: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #1cc88a, #169b6b)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(28,200,138,0.35)',
    transition: 'all 0.3s ease'
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
  }
};

export default FacultyLogin;