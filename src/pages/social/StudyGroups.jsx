import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import ConnectButton from '../../components/social/ConnectButton';

const StudyGroups = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    description: '',
    schedule: '',
    maxMembers: '10'
  });

  const [studyGroups, setStudyGroups] = useState([
    {
      id: 1,
      name: 'Database Systems Study Group',
      course: 'CS 301',
      members: 12,
      maxMembers: 15,
      description: 'Weekly study sessions for Database Systems. We meet every Wednesday at 3 PM to discuss concepts, practice SQL, and work on projects together.',
      createdBy: 'Dr. Maria Santos',
      createdByAvatar: 'M',
      createdByRole: 'faculty',
      upcomingSession: 'Tomorrow, 3:00 PM',
      messages: 156,
      tags: ['SQL', 'Normalization', 'ER Diagrams'],
      memberAvatars: ['M', 'J', 'A', 'B', 'C']
    },
    {
      id: 2,
      name: 'Web Development Project Team',
      course: 'CS 302',
      members: 8,
      maxMembers: 10,
      description: 'Working on the final project together. Frontend (React) and backend (Node.js) collaboration. Looking for motivated team members!',
      createdBy: 'Prof. Johnson',
      createdByAvatar: 'J',
      createdByRole: 'faculty',
      upcomingSession: 'Friday, 2:00 PM',
      messages: 89,
      tags: ['React', 'Node.js', 'MongoDB'],
      memberAvatars: ['J', 'S', 'M', 'L']
    },
    {
      id: 3,
      name: 'Algorithm Practice Group',
      course: 'CS 303',
      members: 15,
      maxMembers: 20,
      description: 'Preparing for coding interviews and exams. We solve LeetCode problems together every Monday and Thursday.',
      createdBy: 'Dr. Williams',
      createdByAvatar: 'W',
      createdByRole: 'faculty',
      upcomingSession: 'Monday, 4:00 PM',
      messages: 234,
      tags: ['LeetCode', 'Data Structures', 'Algorithms'],
      memberAvatars: ['W', 'K', 'R', 'T', 'P']
    },
    {
      id: 4,
      name: 'Software Engineering Capstone',
      course: 'CS 304',
      members: 6,
      maxMembers: 8,
      description: 'Capstone project team. Building a mobile app for campus navigation.',
      createdBy: 'Alice Johnson',
      createdByAvatar: 'A',
      createdByRole: 'student',
      upcomingSession: 'Wednesday, 1:00 PM',
      messages: 67,
      tags: ['React Native', 'UI/UX', 'Firebase'],
      memberAvatars: ['A', 'B', 'C', 'D']
    }
  ]);

  const [joinedGroups, setJoinedGroups] = useState([1]); // User has joined group 1

  const handleJoinGroup = (groupId) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
      setStudyGroups(studyGroups.map(group => 
        group.id === groupId 
          ? { ...group, members: group.members + 1 }
          : group
      ));
    }
  };

  const handleLeaveGroup = (groupId) => {
    setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    setStudyGroups(studyGroups.map(group => 
      group.id === groupId 
        ? { ...group, members: group.members - 1 }
        : group
    ));
  };

  const handleCreateGroup = () => {
    const newGroup = {
      id: Date.now(),
      ...formData,
      members: 1,
      messages: 0,
      createdBy: user.name,
      createdByAvatar: user.name.charAt(0),
      createdByRole: user.role,
      memberAvatars: [user.name.charAt(0)],
      tags: formData.description.split(' ').slice(0, 3)
    };
    setStudyGroups([newGroup, ...studyGroups]);
    setJoinedGroups([...joinedGroups, newGroup.id]);
    setShowCreateModal(false);
    setFormData({
      name: '',
      course: '',
      description: '',
      schedule: '',
      maxMembers: '10'
    });
  };

  const filteredGroups = filter === 'all' 
    ? studyGroups 
    : studyGroups.filter(g => g.course === filter);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2f70',
      margin: 0
    },
    createButton: {
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
    filterBar: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '8px 20px',
      border: '1px solid #d1d3e2',
      borderRadius: '20px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      color: '#5a5c69'
    },
    activeFilter: {
      backgroundColor: '#1f2f70',
      color: 'white',
      borderColor: '#1f2f70'
    },
    groupsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px'
    },
    groupCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }
    },
    groupHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    groupName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2f70',
      margin: 0,
      flex: 1
    },
    courseBadge: {
      padding: '4px 8px',
      backgroundColor: '#f8f9fc',
      color: '#1cc88a',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    createdBy: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
      fontSize: '13px',
      color: '#858796'
    },
    creatorAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600'
    },
    facultyAvatar: {
      backgroundColor: '#1cc88a'
    },
    description: {
      fontSize: '14px',
      color: '#5a5c69',
      lineHeight: '1.6',
      marginBottom: '16px'
    },
    tags: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '16px'
    },
    tag: {
      padding: '4px 8px',
      backgroundColor: '#f8f9fc',
      color: '#5a5c69',
      borderRadius: '4px',
      fontSize: '11px'
    },
    groupDetails: {
      backgroundColor: '#f8f9fc',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '16px'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '13px',
      ':last-child': {
        marginBottom: 0
      }
    },
    detailLabel: {
      color: '#858796',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    membersList: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    memberAvatar: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      backgroundColor: '#4e73df',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: '600',
      border: '2px solid white'
    },
    moreMembers: {
      fontSize: '11px',
      color: '#858796',
      marginLeft: '4px'
    },
    groupFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #f8f9fc',
      paddingTop: '16px'
    },
    joinButton: {
      padding: '8px 20px',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#169b6b',
        transform: 'translateY(-2px)'
      }
    },
    leaveButton: {
      padding: '8px 20px',
      backgroundColor: '#e74a3b',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#c73a2b',
        transform: 'translateY(-2px)'
      }
    },
    viewButton: {
      padding: '8px 16px',
      backgroundColor: '#1f2f70',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#2a3a8c'
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
      zIndex: 1100
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '500px',
      padding: '24px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2f70',
      margin: 0
    },
    modalClose: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#858796'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '13px',
      fontWeight: '500',
      color: '#5a5c69'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #d1d3e2',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      ':focus': {
        borderColor: '#1cc88a'
      }
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #d1d3e2',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #d1d3e2',
      borderRadius: '6px',
      fontSize: '14px',
      resize: 'vertical',
      minHeight: '80px'
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '20px'
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#f8f9fc',
      color: '#5a5c69',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Study Groups</h1>
        <button 
          style={styles.createButton}
          onClick={() => setShowCreateModal(true)}
        >
          + Create Study Group
        </button>
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <button 
          style={{
            ...styles.filterButton,
            ...(filter === 'all' ? styles.activeFilter : {})
          }}
          onClick={() => setFilter('all')}
        >
          All Groups
        </button>
        <button 
          style={{
            ...styles.filterButton,
            ...(filter === 'CS 301' ? styles.activeFilter : {})
          }}
          onClick={() => setFilter('CS 301')}
        >
          CS 301
        </button>
        <button 
          style={{
            ...styles.filterButton,
            ...(filter === 'CS 302' ? styles.activeFilter : {})
          }}
          onClick={() => setFilter('CS 302')}
        >
          CS 302
        </button>
        <button 
          style={{
            ...styles.filterButton,
            ...(filter === 'CS 303' ? styles.activeFilter : {})
          }}
          onClick={() => setFilter('CS 303')}
        >
          CS 303
        </button>
        <button 
          style={{
            ...styles.filterButton,
            ...(filter === 'CS 304' ? styles.activeFilter : {})
          }}
          onClick={() => setFilter('CS 304')}
        >
          CS 304
        </button>
      </div>

      {/* Groups Grid */}
      <div style={styles.groupsGrid}>
        {filteredGroups.map(group => {
          const isJoined = joinedGroups.includes(group.id);
          const isCreator = group.createdBy === user.name;
          
          return (
            <div key={group.id} style={styles.groupCard}>
              <div style={styles.groupHeader}>
                <h3 style={styles.groupName}>{group.name}</h3>
                <span style={styles.courseBadge}>{group.course}</span>
              </div>
              
              <div style={styles.createdBy}>
                <div style={{
                  ...styles.creatorAvatar,
                  ...(group.createdByRole === 'faculty' ? styles.facultyAvatar : {})
                }}>
                  {group.createdByAvatar}
                </div>
                <span>Created by {group.createdBy}</span>
              </div>

              <p style={styles.description}>{group.description}</p>

              <div style={styles.tags}>
                {group.tags.map((tag, index) => (
                  <span key={index} style={styles.tag}>{tag}</span>
                ))}
              </div>

              <div style={styles.groupDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>👥 Members</span>
                  <span>{group.members}/{group.maxMembers}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>📅 Next Session</span>
                  <span>{group.upcomingSession}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>💬 Messages</span>
                  <span>{group.messages}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Active Members</span>
                  <div style={styles.membersList}>
                    {group.memberAvatars.slice(0, 4).map((avatar, idx) => (
                      <div key={idx} style={styles.memberAvatar}>{avatar}</div>
                    ))}
                    {group.members > 4 && (
                      <span style={styles.moreMembers}>+{group.members - 4}</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.groupFooter}>
                {isCreator ? (
                  <span style={{ color: '#1cc88a', fontSize: '13px' }}>You are the creator</span>
                ) : isJoined ? (
                  <button 
                    style={styles.leaveButton}
                    onClick={() => handleLeaveGroup(group.id)}
                  >
                    Leave Group
                  </button>
                ) : (
                  <button 
                    style={styles.joinButton}
                    onClick={() => handleJoinGroup(group.id)}
                    disabled={group.members >= group.maxMembers}
                  >
                    {group.members >= group.maxMembers ? 'Group Full' : 'Join Group'}
                  </button>
                )}
                <Link to={`/messages?group=${group.id}`} style={styles.viewButton}>
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Create Study Group</h3>
              <button 
                style={styles.modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Group Name</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Database Systems Study Group"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Course</label>
              <select
                style={styles.select}
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              >
                <option value="">Select Course</option>
                <option value="CS 301">CS 301 - Database Systems</option>
                <option value="CS 302">CS 302 - Web Development</option>
                <option value="CS 303">CS 303 - Algorithms</option>
                <option value="CS 304">CS 304 - Software Engineering</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                style={styles.textarea}
                placeholder="Describe your study group's purpose and goals..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Schedule</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Wednesdays at 3 PM"
                value={formData.schedule}
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Maximum Members</label>
              <select
                style={styles.select}
                value={formData.maxMembers}
                onChange={(e) => setFormData({...formData, maxMembers: e.target.value})}
              >
                <option value="5">5 members</option>
                <option value="10">10 members</option>
                <option value="15">15 members</option>
                <option value="20">20 members</option>
                <option value="25">25 members</option>
              </select>
            </div>

            <div style={styles.modalActions}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.submitButton}
                onClick={handleCreateGroup}
                disabled={!formData.name || !formData.course || !formData.description}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;