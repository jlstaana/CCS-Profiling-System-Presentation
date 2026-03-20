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
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fc',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '14px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    borderTop: '4px solid #f6c23e'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  logo: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  title: {
    color: '#f6c23e',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '5px'
  },
  subtitle: {
    color: '#858796',
    fontSize: '14px'
  },
  form: {
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#5a5c69',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d3e2',
    borderRadius: '8px',
    fontSize: '14px',
    ':focus': {
      outline: 'none',
      borderColor: '#f6c23e'
    }
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #f6c23e 0%, #d4a11e 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(246, 194, 62, 0.3)'
    },
    ':disabled': {
      opacity: 0.7,
      transform: 'none',
      cursor: 'not-allowed'
    }
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  link: {
    color: '#1f2f70',
    textDecoration: 'none',
    fontSize: '14px',
    ':hover': {
      textDecoration: 'underline',
      color: '#f6c23e'
    }
  },
  separator: {
    color: '#d1d3e2'
  },
  warning: {
    marginTop: '30px',
    padding: '10px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeeba',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#856404',
    fontSize: '12px'
  }
};

export default AdminLogin;