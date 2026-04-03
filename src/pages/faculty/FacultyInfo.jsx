import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const FacultyInfo = () => {
  const { user, updateProfile } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name,
    facultyId: user?.id,
    email: user?.email,
    contact: '',
    address: '',
    birthDate: '',
    nationality: ''
  });

  const [employmentInfo, setEmploymentInfo] = useState({
    department: user?.department,
    position: '',
    specialization: user?.specialization,
    employmentStatus: '',
    dateHired: '',
    yearsOfService: '',
    advisorOf: ''
  });

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ ...styles.pageTitle, marginBottom: 0 }}>Faculty Information</h1>
        <button 
          style={styles.editButton} 
          onClick={() => {
            setEditForm({
              fullName: personalInfo.fullName || '',
              facultyId: personalInfo.facultyId || '',
              email: personalInfo.email || '',
              contact: personalInfo.contact || '',
              address: personalInfo.address || '',
              department: employmentInfo.department || '',
              specialization: employmentInfo.specialization || '',
              profilePic: profilePic
            });
            setShowEditModal(true);
          }}
        >
          ✏️ Edit Profile
        </button>
      </div>

      <div style={styles.profileHeader}>
        <div style={styles.profileAvatar}>
          {profilePic ? (
            <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            personalInfo.fullName?.charAt(0) || 'F'
          )}
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>{personalInfo.fullName}</h2>
          <p style={styles.profileId}>Faculty ID: {personalInfo.facultyId}</p>
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

      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} style={styles.closeButton}>×</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.warningBox}>
                <span style={{fontSize: '20px'}}>⚠️</span>
                <p><strong>Note:</strong> Changes to Name, Email, ID, Department, and Specialization require administration approval. Contact, Address, and Profile Picture will update instantly.</p>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Profile Picture (Instant Update)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ ...styles.profileAvatar, width: '60px', height: '60px', fontSize: '24px' }}>
                    {editForm.profilePic ? (
                      <img src={editForm.profilePic} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      personalInfo.fullName?.charAt(0) || 'F'
                    )}
                  </div>
                  <label style={styles.uploadBtn}>
                    {editForm.profilePic ? 'Change Picture' : 'Upload Picture'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name (Requires Approval)</label>
                  <input style={styles.input} value={editForm.fullName} onChange={e => setEditForm({...editForm, fullName: e.target.value})} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Faculty ID (Requires Approval)</label>
                  <input style={styles.input} value={editForm.facultyId} onChange={e => setEditForm({...editForm, facultyId: e.target.value})} />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address (Requires Approval)</label>
                  <input style={styles.input} type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Department (Requires Approval)</label>
                  <input style={styles.input} value={editForm.department} onChange={e => setEditForm({...editForm, department: e.target.value})} />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Specialization (Requires Approval)</label>
                <input style={styles.input} value={editForm.specialization} onChange={e => setEditForm({...editForm, specialization: e.target.value})} />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contact Number (Instant Update)</label>
                  <input style={styles.input} value={editForm.contact} onChange={e => setEditForm({...editForm, contact: e.target.value})} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Home Address (Instant Update)</label>
                  <input style={styles.input} value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowEditModal(false)} style={styles.cancelButton}>Cancel</button>
              <button 
                style={styles.saveButton}
                onClick={async () => {
                  let minorChanges = {};
                  let majorChanges = {};

                  // Minor (instant) — profile picture
                  if (editForm.profilePic && editForm.profilePic !== user?.profile_pic_base64) {
                    minorChanges.profile_pic_base64 = editForm.profilePic;
                  }

                  // Major (require approval)
                  if (editForm.fullName !== user?.name) majorChanges.name = editForm.fullName;
                  if (editForm.email !== user?.email) majorChanges.email = editForm.email;
                  if (editForm.department !== user?.department) majorChanges.department = editForm.department;

                  const result = await updateProfile(minorChanges, majorChanges);
                  if (result.success) {
                    alert(result.message);
                    setShowEditModal(false);
                  } else {
                    alert('Error: ' + result.error);
                  }
                }}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
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
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px', borderBottom: '1px solid #e3e6f0'
  },
  closeButton: {
    background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#858796'
  },
  modalBody: {
    padding: '20px'
  },
  modalFooter: {
    display: 'flex', justifyContent: 'flex-end', gap: '10px',
    padding: '20px', borderTop: '1px solid #e3e6f0'
  },
  formRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#5a5c69'
  },
  input: {
    width: '100%', padding: '10px', border: '1px solid #d1d3e2', borderRadius: '6px', fontSize: '14px'
  },
  cancelButton: {
    padding: '10px 20px', backgroundColor: '#f8f9fc', color: '#5a5c69', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
  },
  saveButton: {
    padding: '10px 20px', backgroundColor: 'var(--success)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
  },
  warningBox: {
    display: 'flex', gap: '12px', padding: '12px',
    backgroundColor: '#fff3cd', color: '#856404', borderRadius: '8px',
    marginBottom: '20px', alignItems: 'center', fontSize: '13px'
  },
  uploadBtn: {
    padding: '8px 16px',
    backgroundColor: '#f8f9fc',
    color: '#1f2f70',
    border: '1px solid #1f2f70',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  }
};

export default FacultyInfo;