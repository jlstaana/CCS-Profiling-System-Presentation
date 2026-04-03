import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentInfo = () => {
  const { user, updateProfile } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeSection, setActiveSection] = useState('personal'); // personal, academic, social, disciplinary
  const [editForm, setEditForm] = useState(null);

  // Sync edit form with user data when modal opens
  useEffect(() => {
    if (user) {
      const sp = user.student_profile || {};
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        id: user.id || '',
        course: user.course || '',
        year: user.year || '',
        profile_pic_base64: user.profile_pic_base64 || '',
        
        // Student Profile details
        phone: sp.phone || '',
        address: sp.address || '',
        birth_date: sp.birth_date ? new Date(sp.birth_date).toISOString().split('T')[0] : '',
        nationality: sp.nationality || '',
        academic_history: sp.academic_history || [],
        non_academic_activities: sp.non_academic_activities || [],
        skills: sp.skills || [],
        affiliations: sp.affiliations || []
      });
    }
  }, [user, showEditModal]);

  if (!user) return <div style={S.loading}>Loading profile...</div>;

  const sp = user.student_profile || {};

  const handleSave = async () => {
    const minorChanges = {};
    const majorChanges = {};
    const studentProfile = {
      phone: editForm.phone,
      address: editForm.address,
      birth_date: editForm.birth_date,
      nationality: editForm.nationality,
      academic_history: editForm.academic_history,
      non_academic_activities: editForm.non_academic_activities,
      skills: editForm.skills,
      affiliations: editForm.affiliations
    };

    // Minor (instant) changes
    if (editForm.profile_pic_base64 !== user.profile_pic_base64) {
      minorChanges.profile_pic_base64 = editForm.profile_pic_base64;
    }

    // Major changes (approval required)
    if (editForm.name !== user.name) majorChanges.name = editForm.name;
    if (editForm.email !== user.email) majorChanges.email = editForm.email;
    if (editForm.course !== user.course) majorChanges.course = editForm.course;
    if (editForm.year !== user.year) majorChanges.year = editForm.year;

    const res = await updateProfile(minorChanges, majorChanges, studentProfile);
    if (res.success) {
      alert(res.message);
      setShowEditModal(false);
    } else {
      alert(res.error);
    }
  };

  const handleAddListItem = (field, value) => {
    if (!value) return;
    setEditForm({ ...editForm, [field]: [...editForm[field], value] });
  };

  const handleRemoveListItem = (field, index) => {
    const newList = [...editForm[field]];
    newList.splice(index, 1);
    setEditForm({ ...editForm, [field]: newList });
  };

  return (
    <div style={S.container}>
      {/* ── PROFILE HEADER ── */}
      <div style={S.profileHeader}>
        <div style={S.profileCover}></div>
        <div style={S.headerContent}>
          <div style={S.avatarWrapper}>
            {user.profile_pic_base64 ? (
              <img src={user.profile_pic_base64} alt="Profile" style={S.headerAvatar} />
            ) : (
              <div style={S.headerAvatarPlaceholder}>{user.name?.charAt(0)}</div>
            )}
          </div>
          <div style={S.headerText}>
            <h1 style={S.userName}>{user.name}</h1>
            <p style={S.userMeta}>{user.course} • {user.year}</p>
            <div style={S.badgeRow}>
              <span style={S.statusBadge}>ACTIVE STUDENT</span>
              {sp.skills?.slice(0, 3).map((skill, i) => (
                <span key={i} style={S.skillBadge}>{skill}</span>
              ))}
            </div>
          </div>
          <button style={S.editBtn} onClick={() => setShowEditModal(true)}>
            ✏️ Edit Profile
          </button>
        </div>
      </div>

      <div style={S.mainGrid}>
        {/* ── LEFT COLUMN: INFO CARDS ── */}
        <div style={S.leftCol}>
          
          {/* Personal Info */}
          <section style={S.infoCard}>
            <h3 style={S.cardTitle}>👤 Personal Information</h3>
            <div style={S.infoList}>
              <InfoItem label="Student ID" value={user.id} />
              <InfoItem label="Email" value={user.email} />
              <InfoItem label="Phone" value={sp.phone || 'Not set'} />
              <InfoItem label="Address" value={sp.address || 'Not set'} />
              <InfoItem label="Birth Date" value={sp.birth_date ? new Date(sp.birth_date).toLocaleDateString() : 'Not set'} />
              <InfoItem label="Nationality" value={sp.nationality || 'Not set'} />
            </div>
          </section>

          {/* Academic History */}
          <section style={S.infoCard}>
            <h3 style={S.cardTitle}>🎓 Academic History</h3>
            {sp.academic_history?.length > 0 ? (
              <div style={S.historyList}>
                {sp.academic_history.map((h, i) => (
                  <div key={i} style={S.historyItem}>
                    <div style={S.historyDot}></div>
                    <div>
                      <div style={S.historySchool}>{h.school}</div>
                      <div style={S.historyDegree}>{h.degree} ({h.year})</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={S.emptyText}>No academic history recorded.</p>
            )}
          </section>

          {/* Affiliations */}
          <section style={S.infoCard}>
            <h3 style={S.cardTitle}>🏫 Affiliations & Organizations</h3>
            {sp.affiliations?.length > 0 ? (
              <div style={S.tagCloud}>
                {sp.affiliations.map((org, i) => (
                  <span key={i} style={S.orgBadge}>🏛️ {org}</span>
                ))}
              </div>
            ) : (
              <p style={S.emptyText}>No affiliations listed.</p>
            )}
          </section>
        </div>

        {/* ── RIGHT COLUMN: ACTIVITIES & VIOLATIONS ── */}
        <div style={S.rightCol}>
          
          {/* Skills */}
          <section style={S.infoCard}>
            <h3 style={S.cardTitle}>⚡ Skills & Competencies</h3>
            <div style={S.tagCloud}>
              {sp.skills?.length > 0 ? (
                sp.skills.map((skill, i) => (
                  <span key={i} style={S.skillItem}>{skill}</span>
                ))
              ) : (
                <p style={S.emptyText}>No skills added yet.</p>
              )}
            </div>
          </section>

          {/* Non-Academic Activities */}
          <section style={S.infoCard}>
            <h3 style={S.cardTitle}>🏅 Non-Academic Activities</h3>
            {sp.non_academic_activities?.length > 0 ? (
              <div style={S.activityList}>
                {sp.non_academic_activities.map((act, i) => (
                  <div key={i} style={S.activityItem}>
                    <span style={S.activityIcon}>🌟</span> {act}
                  </div>
                ))}
              </div>
            ) : (
              <p style={S.emptyText}>No activities recorded.</p>
            )}
          </section>

          {/* Violations Summary */}
          <section style={{ ...S.infoCard, borderTop: '4px solid #e74a3b' }}>
            <h3 style={{ ...S.cardTitle, color: '#e74a3b' }}>⚠️ Disciplinary Record</h3>
            {user.violations?.length > 0 ? (
              <div>
                <div style={S.violationStats}>
                  <div style={S.vStatItem}>
                    <div style={S.vStatValue}>{user.violations.length}</div>
                    <div style={S.vStatLabel}>Total Offenses</div>
                  </div>
                  <div style={S.vStatItem}>
                    <div style={S.vStatValue}>{user.violations.filter(v => v.status === 'pending').length}</div>
                    <div style={S.vStatLabel}>Pending</div>
                  </div>
                </div>
                <div style={S.miniViolationList}>
                  {user.violations.slice(0, 3).map((v, i) => (
                    <div key={i} style={S.miniViolation}>
                      <div style={S.miniVType}>{v.type}</div>
                      <div style={S.miniVDate}>{new Date(v.date_occurred).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={S.cleanRecord}>
                <span style={{ fontSize: '32px' }}>🛡️</span>
                <p style={{ margin: '8px 0 0 0', fontWeight: '600', color: '#1cc88a' }}>Clean Record</p>
                <p style={S.emptyText}>Excellent standing with the department.</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ── EDIT MODAL ── */}
      {showEditModal && editForm && (
        <div style={S.modalOverlay}>
          <div style={S.modal}>
            <div style={S.modalHeader}>
              <h2>Update Student Profile</h2>
              <button onClick={() => setShowEditModal(false)} style={S.closeBtn}>×</button>
            </div>
            
            <div style={S.modalNav}>
              {['personal', 'academic', 'competencies'].map(sec => (
                <button 
                  key={sec}
                  style={{ ...S.modalNavBtn, ...(activeSection === sec ? S.modalNavBtnActive : {}) }}
                  onClick={() => setActiveSection(sec)}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>

            <div style={S.modalBody}>
              {activeSection === 'personal' && (
                <div>
                  <div style={S.formRow}>
                    <FormGroup label="Full Name (Requires Approval)">
                      <input style={S.input} value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                    </FormGroup>
                    <FormGroup label="Email (Requires Approval)">
                      <input style={S.input} value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                    </FormGroup>
                  </div>
                  <div style={S.formRow}>
                    <FormGroup label="Phone">
                      <input style={S.input} value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                    </FormGroup>
                    <FormGroup label="Birth Date">
                      <input type="date" style={S.input} value={editForm.birth_date} onChange={e => setEditForm({...editForm, birth_date: e.target.value})} />
                    </FormGroup>
                  </div>
                  <FormGroup label="Address">
                    <input style={S.input} value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
                  </FormGroup>
                </div>
              )}

              {activeSection === 'academic' && (
                <div>
                  <div style={S.formRow}>
                    <FormGroup label="Course (Requires Approval)">
                      <input style={S.input} value={editForm.course} onChange={e => setEditForm({...editForm, course: e.target.value})} />
                    </FormGroup>
                    <FormGroup label="Year Level (Requires Approval)">
                      <select style={S.input} value={editForm.year} onChange={e => setEditForm({...editForm, year: e.target.value})}>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </FormGroup>
                  </div>
                  <ListEditor 
                    label="Academic History" 
                    items={editForm.academic_history} 
                    onRemove={i => handleRemoveListItem('academic_history', i)}
                    onAdd={() => {
                      const school = prompt('School Name:');
                      const degree = prompt('Degree/Grade:');
                      const year = prompt('Year:');
                      if (school && degree) handleAddListItem('academic_history', { school, degree, year });
                    }}
                    renderItem={h => `${h.school} - ${h.degree} (${h.year})`}
                  />
                  <ListEditor 
                    label="Affiliations (Orgs/Clubs)" 
                    items={editForm.affiliations} 
                    onRemove={i => handleRemoveListItem('affiliations', i)}
                    onAdd={() => {
                      const org = prompt('Organization name:');
                      if (org) handleAddListItem('affiliations', org);
                    }}
                  />
                </div>
              )}

              {activeSection === 'competencies' && (
                <div>
                   <ListEditor 
                    label="Skills" 
                    items={editForm.skills} 
                    onRemove={i => handleRemoveListItem('skills', i)}
                    onAdd={() => {
                      const skill = prompt('Add skill (e.g. React, Java, Design):');
                      if (skill) handleAddListItem('skills', skill);
                    }}
                  />
                  <ListEditor 
                    label="Non-Academic Activities" 
                    items={editForm.non_academic_activities} 
                    onRemove={i => handleRemoveListItem('non_academic_activities', i)}
                    onAdd={() => {
                      const act = prompt('Add activity/seminar:');
                      if (act) handleAddListItem('non_academic_activities', act);
                    }}
                  />
                </div>
              )}
            </div>

            <div style={S.modalFooter}>
              <button style={S.cancelBtn} onClick={() => setShowEditModal(false)}>Cancel</button>
              <button style={S.saveBtn} onClick={handleSave}>Request Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── SUB-COMPONENTS ──
const InfoItem = ({ label, value }) => (
  <div style={S.infoItem}>
    <span style={S.infoLabel}>{label}</span>
    <span style={S.infoValue}>{value}</span>
  </div>
);

const FormGroup = ({ label, children }) => (
  <div style={S.formGroup}>
    <label style={S.label}>{label}</label>
    {children}
  </div>
);

const ListEditor = ({ label, items, onAdd, onRemove, renderItem = (i) => i }) => (
  <div style={S.listEditor}>
    <div style={S.listHeader}>
      <label style={S.label}>{label}</label>
      <button style={S.addListBtn} onClick={onAdd}>+ Add</button>
    </div>
    <div style={S.listItems}>
      {items?.map((item, index) => (
        <div key={index} style={S.listItem}>
          <span>{renderItem(item)}</span>
          <button style={S.removeBtn} onClick={() => onRemove(index)}>×</button>
        </div>
      ))}
      {(!items || items.length === 0) && <p style={S.emptyText}>No items added.</p>}
    </div>
  </div>
);

// ── STYLES ──
const S = {
  container: { padding: '24px', maxWidth: '1200px', margin: '0 auto' },
  loading: { padding: '40px', textAlign: 'center', fontSize: '18px', color: '#858796' },
  
  profileHeader: {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 25px rgba(0,0,0,0.05)',
    marginBottom: '32px',
    position: 'relative'
  },
  profileCover: {
    height: '140px',
    background: 'linear-gradient(135deg, #1f2f70 0%, #4e73df 100%)'
  },
  headerContent: {
    padding: '0 32px 32px 32px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '24px',
    marginTop: '-60px'
  },
  avatarWrapper: {
    width: '120px',
    height: '120px',
    borderRadius: '25px',
    backgroundColor: 'white',
    padding: '6px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  headerAvatar: { width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' },
  headerAvatarPlaceholder: { width: '100%', height: '100%', borderRadius: '20px', backgroundColor: '#f8f9fc', color: '#1f2f70', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '700' },
  headerText: { flex: 1, paddingBottom: '8px' },
  userName: { fontSize: '32px', fontWeight: '800', color: '#1f2f70', margin: '0 0 4px 0' },
  userMeta: { fontSize: '16px', color: '#858796', fontWeight: '500', margin: 0 },
  badgeRow: { display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' },
  statusBadge: { padding: '6px 14px', backgroundColor: '#1cc88a', color: 'white', borderRadius: '30px', fontSize: '12px', fontWeight: '700' },
  skillBadge: { padding: '6px 14px', backgroundColor: '#f8f9fc', color: '#4e73df', borderRadius: '30px', fontSize: '12px', fontWeight: '600', border: '1px solid #eaecf4' },
  editBtn: { padding: '12px 24px', backgroundColor: 'transparent', border: '2px solid #eaecf4', borderRadius: '12px', color: '#1f2f70', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '8px' },

  mainGrid: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '32px' },
  leftCol: { display: 'flex', flexDirection: 'column', gap: '32px' },
  rightCol: { display: 'flex', flexDirection: 'column', gap: '32px' },
  
  infoCard: { backgroundColor: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' },
  cardTitle: { fontSize: '20px', fontWeight: '700', color: '#1f2f70', margin: '0 0 20px 0', display: 'flex', alignItems: 'center' },
  
  infoList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  infoItem: { display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #f8f9fc' },
  infoLabel: { color: '#858796', fontSize: '14px', fontWeight: '500' },
  infoValue: { color: '#1f2f70', fontSize: '14px', fontWeight: '600', textAlign: 'right' },
  
  historyList: { display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '16px' },
  historyItem: { position: 'relative', paddingLeft: '24px' },
  historyDot: { position: 'absolute', left: '-4.5px', top: '8px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4e73df' },
  historySchool: { fontSize: '15px', fontWeight: '700', color: '#1f2f70' },
  historyDegree: { fontSize: '13px', color: '#858796' },
  
  tagCloud: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  skillItem: { padding: '8px 16px', backgroundColor: '#f0f4ff', color: '#2e59d9', borderRadius: '10px', fontSize: '14px', fontWeight: '600' },
  orgBadge: { padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #eaecf4', color: '#5a5c69', borderRadius: '10px', fontSize: '14px', fontWeight: '500' },
  
  activityList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  activityItem: { padding: '12px', backgroundColor: '#f8f9fc', borderRadius: '12px', fontSize: '14px', color: '#5a5c69' },
  
  violationStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  vStatItem: { padding: '16px', backgroundColor: '#fff5f5', borderRadius: '15px', textAlign: 'center' },
  vStatValue: { fontSize: '24px', fontWeight: '800', color: '#e74a3b' },
  vStatLabel: { fontSize: '12px', color: '#c0392b', fontWeight: '600', textTransform: 'uppercase' },
  miniViolationList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  miniViolation: { display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid #ffebea', borderRadius: '10px' },
  miniVType: { fontSize: '14px', fontWeight: '600', color: '#e74a3b' },
  miniVDate: { fontSize: '12px', color: '#858796' },
  cleanRecord: { textAlign: 'center', padding: '20px' },
  emptyText: { color: '#b7b9cc', fontSize: '14px', margin: '4px 0 0 0' },

  // Modal styles
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 },
  modal: { backgroundColor: 'white', borderRadius: '24px', width: '90%', maxWidth: '700px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  modalHeader: { padding: '24px 32px', borderBottom: '1px solid #eaecf4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', fontSize: '28px', color: '#858796', cursor: 'pointer' },
  modalNav: { display: 'flex', padding: '0 32px', borderBottom: '1px solid #eaecf4', gap: '24px' },
  modalNavBtn: { padding: '16px 0', background: 'none', border: 'none', borderBottom: '3px solid transparent', color: '#858796', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  modalNavBtnActive: { color: '#4e73df', borderBottomColor: '#4e73df' },
  modalBody: { padding: '32px', overflowY: 'auto', flex: 1 },
  modalFooter: { padding: '24px 32px', borderTop: '1px solid #eaecf4', display: 'flex', justifyContent: 'flex-end', gap: '16px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: '#1f2f70' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d3e2', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' },
  cancelBtn: { padding: '12px 24px', backgroundColor: '#f8f9fc', color: '#5a5c69', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' },
  saveBtn: { padding: '12px 24px', backgroundColor: '#4e73df', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' },
  
  listEditor: { marginBottom: '24px' },
  listHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  addListBtn: { padding: '4px 12px', backgroundColor: '#f0f4ff', color: '#2e59d9', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  listItems: { display: 'flex', flexDirection: 'column', gap: '8px' },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: '#f8f9fc', borderRadius: '10px', fontSize: '14px' },
  removeBtn: { background: 'none', border: 'none', color: '#e74a3b', fontSize: '20px', cursor: 'pointer', padding: '0 4px' }
};

export default StudentInfo;