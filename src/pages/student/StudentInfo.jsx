import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentInfo = () => {
  const { user } = useAuth();

  const personalInfo = {
    fullName: user?.name || 'John Doe',
    studentId: user?.id || '2021-12345',
    email: user?.email || 'john.doe@ccs.edu',
    contact: '+63 912 345 6789',
    address: '123 University Ave, City',
    birthDate: 'January 15, 2000',
    nationality: 'Filipino'
  };

  const academicInfo = {
    program: user?.course || 'BS Computer Science',
    yearLevel: user?.year || '3rd Year',
    status: 'Regular',
    enrollmentDate: 'August 2021',
    expectedGraduation: 'May 2025',
    advisor: 'Dr. Maria Santos',
    gpa: '3.75'
  };

  const courses = [
    { code: 'CS 301', title: 'Database Systems', units: 3, grade: '1.5' },
    { code: 'CS 302', title: 'Web Development', units: 3, grade: '1.25' },
    { code: 'CS 303', title: 'Algorithms', units: 3, grade: '1.75' },
    { code: 'CS 304', title: 'Software Engineering', units: 3, grade: '1.5' },
    { code: 'CS 305', title: 'Computer Networks', units: 3, grade: '2.0' }
  ];

  return (
    <div>
      <h1 style={styles.pageTitle}>Student Information</h1>

      <div style={styles.profileHeader}>
        <div style={styles.profileAvatar}>
          {personalInfo.fullName.charAt(0)}
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>{personalInfo.fullName}</h2>
          <p style={styles.profileId}>Student ID: {personalInfo.studentId}</p>
          <span style={styles.statusBadge}>Active</span>
        </div>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>📋 Personal Information</h3>
          <div style={styles.infoList}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email:</span>
              <span>{personalInfo.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Contact:</span>
              <span>{personalInfo.contact}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Address:</span>
              <span>{personalInfo.address}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Birth Date:</span>
              <span>{personalInfo.birthDate}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Nationality:</span>
              <span>{personalInfo.nationality}</span>
            </div>
          </div>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>🎓 Academic Information</h3>
          <div style={styles.infoList}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Program:</span>
              <span>{academicInfo.program}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Year Level:</span>
              <span>{academicInfo.yearLevel}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Status:</span>
              <span>{academicInfo.status}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Enrollment Date:</span>
              <span>{academicInfo.enrollmentDate}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Expected Graduation:</span>
              <span>{academicInfo.expectedGraduation}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Advisor:</span>
              <span>{academicInfo.advisor}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Current GPA:</span>
              <span style={styles.gpaValue}>{academicInfo.gpa}</span>
            </div>
          </div>
        </div>

        <div style={styles.coursesCard}>
          <h3 style={styles.cardTitle}>📚 Current Courses</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Course Code</th>
                  <th style={styles.th}>Course Title</th>
                  <th style={styles.th}>Units</th>
                  <th style={styles.th}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{course.code}</td>
                    <td style={styles.td}>{course.title}</td>
                    <td style={styles.td}>{course.units}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.gradeBadge,
                        backgroundColor: parseFloat(course.grade) <= 1.5 ? '#1cc88a' : '#f6c23e'
                      }}>
                        {course.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2f70',
    marginBottom: '24px',
    letterSpacing: '-0.5px'
  },

  /* ===== PROFILE HEADER ===== */
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: 'linear-gradient(135deg, #ffffff, #f9fbff)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.04)'
  },

  profileAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4e73df, #224abe)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '700',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)'
  },

  profileInfo: {
    flex: 1
  },

  profileName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2f70'
  },

  profileId: {
    fontSize: '13px',
    color: '#858796',
    marginBottom: '10px'
  },

  statusBadge: {
    display: 'inline-block',
    padding: '5px 14px',
    background: 'linear-gradient(135deg, #1cc88a, #17a673)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.3px'
  },

  /* ===== GRID ===== */
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },

  /* ===== CARDS ===== */
  infoCard: {
    background: 'linear-gradient(145deg, #ffffff, #f9fbff)',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.03)',
    transition: '0.25s ease'
  },

  coursesCard: {
    gridColumn: 'span 2',
    background: 'linear-gradient(145deg, #ffffff, #f9fbff)',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.03)'
  },

  cardTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f1f3f9'
  },

  /* ===== INFO LIST ===== */
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f1f3f9'
  },

  infoLabel: {
    color: '#858796',
    fontSize: '13px',
    fontWeight: '500'
  },

  gpaValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1cc88a'
  },

  /* ===== TABLE ===== */
  tableContainer: {
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px'
  },

  th: {
    textAlign: 'left',
    padding: '12px',
    color: '#5a5c69',
    fontSize: '13px',
    fontWeight: '600'
  },

  td: {
    padding: '12px',
    fontSize: '13px',
    backgroundColor: '#f9fbff'
  },

  /* ===== GRADE BADGE ===== */
  gradeBadge: {
    display: 'inline-block',
    padding: '5px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '45px',
    textAlign: 'center'
  }
};

export default StudentInfo;