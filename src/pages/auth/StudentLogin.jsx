import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Auth.module.css';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Automatically convert generic student ID to email for demo purposes
    const email = studentId.includes('@') ? studentId : `${studentId}@ccs.edu`;
    
    const res = await login(email, password);
    
    if (res.success) {
      if (res.user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        setError('Unauthorized: Not a student account.');
      }
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>🎓</div>
          <h1 className={styles.title}>CCS Profiling System</h1>
          <p className={styles.subtitle}>Student Login Portal</p>
        </div>

        {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '15px'}}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Student ID / Username</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={styles.input}
              placeholder="Enter your student ID"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Logging in...' : 'Login as Student'}
          </button>
        </form>

        <div className={styles.footer}>
          <Link to="/faculty" className={styles.link}>Faculty Login</Link>
          <span className={styles.separator}>•</span>
          <Link to="/admin" className={styles.link}>Admin Login</Link>
        </div>

        <div className={styles.demo}>
          <p>Demo Credentials:</p>
          <small>ID: student123 / Password: any</small>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
