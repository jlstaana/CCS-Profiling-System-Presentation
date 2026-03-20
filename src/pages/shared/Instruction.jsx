import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Instruction = () => {
  const { user } = useAuth();
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { 
      id: 1,
      code: 'CS 301',
      title: 'Database Systems',
      instructor: 'Dr. Smith',
      materials: 8,
      syllabus: true,
      lessons: 12,
      resources: 15
    },
    { 
      id: 2,
      code: 'CS 302',
      title: 'Web Development',
      instructor: 'Prof. Johnson',
      materials: 6,
      syllabus: true,
      lessons: 10,
      resources: 8
    },
    { 
      id: 3,
      code: 'CS 303',
      title: 'Algorithms',
      instructor: 'Dr. Williams',
      materials: 10,
      syllabus: true,
      lessons: 15,
      resources: 12
    },
    { 
      id: 4,
      code: 'CS 304',
      title: 'Software Engineering',
      instructor: 'Prof. Brown',
      materials: 7,
      syllabus: true,
      lessons: 8,
      resources: 10
    }
  ];

  const recentMaterials = [
    { title: 'CS 301 - Week 8 Lecture Slides', type: 'slides', course: 'Database Systems', uploadedBy: 'Dr. Smith', date: '2 days ago' },
    { title: 'CS 302 - Assignment 3', type: 'assignment', course: 'Web Development', uploadedBy: 'Prof. Johnson', date: '3 days ago' },
    { title: 'CS 303 - Midterm Review', type: 'review', course: 'Algorithms', uploadedBy: 'Dr. Williams', date: '5 days ago' }
  ];

  const MaterialModal = ({ course, onClose }) => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3>Upload Material for {course?.code}</h3>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Material Title</label>
            <input type="text" style={styles.input} placeholder="Enter material title" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Material Type</label>
            <select style={styles.select}>
              <option>Syllabus</option>
              <option>Lesson Plan</option>
                            <option>Lecture Slides</option>
              <option>Assignment</option>
              <option>Reference Material</option>
              <option>Video Recording</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea style={styles.textarea} rows="4" placeholder="Enter description"></textarea>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>File Upload</label>
            <div style={styles.fileUpload}>
              <input type="file" style={styles.fileInput} />
              <span>Drag and drop or click to browse</span>
            </div>
          </div>
        </div>
        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
          <button style={styles.uploadButton}>Upload Material</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Instruction & Course Materials</h1>
        {user?.role !== 'student' && (
          <button 
            style={styles.addButton}
            onClick={() => {
              setSelectedCourse(courses[0]);
              setShowMaterialModal(true);
            }}
          >
            + Add New Material
          </button>
        )}
      </div>

      <div style={styles.coursesGrid}>
        {courses.map((course) => (
          <div key={course.id} style={styles.courseCard}>
            <div style={styles.courseHeader}>
              <h3 style={styles.courseCode}>{course.code}</h3>
              <span style={styles.courseBadge}>{course.materials} materials</span>
            </div>
            <h4 style={styles.courseTitle}>{course.title}</h4>
            <p style={styles.courseInstructor}>{course.instructor}</p>
            
            <div style={styles.materialStats}>
              <div style={styles.statItem}>
                <span style={styles.statIcon}>📄</span>
                <span>{course.syllabus ? 'Syllabus' : 'No Syllabus'}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statIcon}>📚</span>
                <span>{course.lessons} Lessons</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statIcon}>📎</span>
                <span>{course.resources} Resources</span>
              </div>
            </div>

            <div style={styles.courseActions}>
              <button style={styles.viewButton}>View Materials</button>
              {user?.role !== 'student' && (
                <button 
                  style={styles.uploadSmallButton}
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowMaterialModal(true);
                  }}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.recentSection}>
        <h2 style={styles.sectionTitle}>Recently Added Materials</h2>
        <div style={styles.materialsList}>
          {recentMaterials.map((material, index) => (
            <div key={index} style={styles.materialItem}>
              <div style={styles.materialIcon}>
                {material.type === 'slides' ? '📊' : material.type === 'assignment' ? '📝' : '📋'}
              </div>
              <div style={styles.materialContent}>
                <div style={styles.materialTitle}>{material.title}</div>
                <div style={styles.materialMeta}>
                  <span>{material.course}</span>
                  <span>•</span>
                  <span>{material.uploadedBy}</span>
                  <span>•</span>
                  <span>{material.date}</span>
                </div>
              </div>
              <button style={styles.downloadButton}>Download</button>
            </div>
          ))}
        </div>
      </div>

      {showMaterialModal && (
        <MaterialModal 
          course={selectedCourse} 
          onClose={() => setShowMaterialModal(false)} 
        />
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2f70'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#1cc88a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#169b6b',
      transform: 'translateY(-2px)'
    }
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  courseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  courseCode: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2f70'
  },
  courseBadge: {
    padding: '4px 8px',
    backgroundColor: '#f8f9fc',
    color: '#1cc88a',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  courseTitle: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  courseInstructor: {
    fontSize: '14px',
    color: '#858796',
    marginBottom: '16px'
  },
  materialStats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    padding: '12px 0',
    borderTop: '1px solid #f8f9fc',
    borderBottom: '1px solid #f8f9fc'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#5a5c69'
  },
  statIcon: {
    fontSize: '14px'
  },
  courseActions: {
    display: 'flex',
    gap: '10px'
  },
  viewButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#1f2f70',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#2a3a8c'
    }
  },
  uploadSmallButton: {
    padding: '8px 16px',
    backgroundColor: '#1cc88a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#169b6b'
    }
  },
  recentSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '20px'
  },
  materialsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  materialItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    backgroundColor: '#f8f9fc',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#eaecf4'
    }
  },
  materialIcon: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  materialContent: {
    flex: 1
  },
  materialTitle: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px'
  },
  materialMeta: {
    fontSize: '12px',
    color: '#858796',
    display: 'flex',
    gap: '8px'
  },
  downloadButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#1f2f70',
    border: '1px solid #1f2f70',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#1f2f70',
      color: 'white'
    }
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e3e6f0'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#858796'
  },
  modalBody: {
    padding: '20px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    padding: '20px',
    borderTop: '1px solid #e3e6f0'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5a5c69'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d3e2',
    borderRadius: '6px',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d3e2',
    borderRadius: '6px',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d3e2',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical'
  },
  fileUpload: {
    border: '2px dashed #d1d3e2',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    color: '#858796',
    cursor: 'pointer'
  },
  fileInput: {
    display: 'none'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f8f9fc',
    color: '#5a5c69',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#1cc88a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#169b6b'
    }
  }
};

export default Instruction;