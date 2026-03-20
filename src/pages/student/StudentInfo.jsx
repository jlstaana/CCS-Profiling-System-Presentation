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
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '24px'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  profileAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1f2f70',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: '600'
  },
  profileInfo: {
    flex: 1
  },
  profileName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '4px'
  },
  profileId: {
    fontSize: '14px',
    color: '#858796',
    marginBottom: '8px'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#1cc88a',
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  coursesCard: {
    gridColumn: 'span 2',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #f8f9fc'
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f8f9fc',
    ':last-child': {
      borderBottom: 'none'
    }
  },
  infoLabel: {
    color: '#858796',
    fontSize: '14px',
    fontWeight: '500'
  },
  gpaValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2f70'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#f8f9fc',
    color: '#5a5c69',
    fontSize: '14px',
    fontWeight: '600',
    borderBottom: '2px solid #e3e6f0'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e3e6f0',
    fontSize: '14px'
  },
  gradeBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600'
  }
};

export default StudentInfo;