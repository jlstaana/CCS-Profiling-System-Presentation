import React from 'react';
import { useAuth } from '../../context/AuthContext';

const FacultyInfo = () => {
  const { user } = useAuth();

  const personalInfo = {
    fullName: user?.name || 'Prof. Jane Smith',
    facultyId: user?.id || 'FAC-2020-001',
    email: user?.email || 'jane.smith@ccs.edu',
    contact: '+63 917 234 5678',
    address: '456 Teacher Lane, City',
    birthDate: 'March 20, 1985',
    nationality: 'Filipino'
  };

  const employmentInfo = {
    department: user?.department || 'Computer Science',
    position: 'Associate Professor',
    specialization: user?.specialization || 'Database Systems',
    employmentStatus: 'Regular',
    dateHired: 'June 2015',
    yearsOfService: '9',
    advisorOf: 'BS CS Year 3'
  };

  const currentCourses = [
    { code: 'CS 301', title: 'Database Systems', schedule: 'MWF 9:00-10:30', students: 32 },
    { code: 'CS 302', title: 'Web Development', schedule: 'TTH 11:00-12:30', students: 28 },
    { code: 'CS 303', title: 'Algorithms', schedule: 'MWF 2:00-3:30', students: 35 },
    { code: 'CS 401', title: 'Advanced DB Topics', schedule: 'TTH 3:00-4:30', students: 18 }
  ];

  const qualifications = [
    'PhD in Computer Science - University of the Philippines (2015)',
    'MS Computer Science - Ateneo de Manila University (2010)',
    'BS Computer Science - University of Santo Tomas (2007)',
    'Certified Database Administrator (Oracle)',
    'AWS Certified Cloud Practitioner'
  ];

  return (
    <div>
      <h1 style={styles.pageTitle}>Faculty Information</h1>

      <div style={styles.profileHeader}>
        <div style={styles.profileAvatar}>
          {personalInfo.fullName.charAt(0)}
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>{personalInfo.fullName}</h2>
          <p style={styles.profileId}>Faculty ID: {personalInfo.facultyId}</p>
          <span style={styles.statusBadge}>Active</span>
        </div>
        <button style={styles.editButton}>Edit Profile</button>
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
          <h3 style={styles.cardTitle}>💼 Employment Details</h3>
          <div style={styles.infoList}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Department:</span>
              <span>{employmentInfo.department}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Position:</span>
              <span>{employmentInfo.position}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Specialization:</span>
              <span>{employmentInfo.specialization}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Status:</span>
              <span>{employmentInfo.employmentStatus}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Date Hired:</span>
              <span>{employmentInfo.dateHired}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Years of Service:</span>
              <span>{employmentInfo.yearsOfService} years</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Advisor of:</span>
              <span>{employmentInfo.advisorOf}</span>
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
                  <th style={styles.th}>Schedule</th>
                  <th style={styles.th}>Students</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{course.code}</td>
                    <td style={styles.td}>{course.title}</td>
                    <td style={styles.td}>{course.schedule}</td>
                    <td style={styles.td}>{course.students}</td>
                    <td style={styles.td}>
                      <button style={styles.actionButton}>View Class</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.qualificationsCard}>
          <h3 style={styles.cardTitle}>🎓 Qualifications & Education</h3>
          <div style={styles.qualificationsList}>
            {qualifications.map((qual, index) => (
              <div key={index} style={styles.qualificationItem}>
                <span style={styles.qualificationDot}>•</span>
                <span>{qual}</span>
              </div>
            ))}
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
    backgroundColor: '#1cc88a',
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
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#1f2f70',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#2a3a8c'
    }
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
  qualificationsCard: {
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
  actionButton: {
    padding: '4px 12px',
    backgroundColor: '#1cc88a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#169b6b'
    }
  },
  qualificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  qualificationItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#f8f9fc',
    borderRadius: '8px'
  },
  qualificationDot: {
    color: '#1cc88a',
    fontSize: '20px',
    fontWeight: 'bold'
  }
};

export default FacultyInfo;