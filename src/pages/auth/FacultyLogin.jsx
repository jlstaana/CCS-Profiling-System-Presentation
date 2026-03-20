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
    borderTop: '4px solid #1cc88a'
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
    color: '#1cc88a',
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
      borderColor: '#1cc88a'
    }
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #1cc88a 0%, #169b6b 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)'
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
      color: '#1cc88a'
    }
  },
  separator: {
    color: '#d1d3e2'
  }
};

export default FacultyLogin;