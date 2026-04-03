import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const COLORS = {
  '#4e73df': 'Blue',
  '#1cc88a': 'Green',
  '#36b9cc': 'Cyan',
  '#f6c23e': 'Yellow',
  '#e74a3b': 'Red',
};

const timeSlots = ['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const BLANK = { course_id: '', day: 'Monday', time_start: '7:00 AM', time_end: '8:00 AM', room: '', color: '#4e73df' };

const Scheduling = () => {
  const { user } = useAuth();
  const canEdit = user?.role === 'admin';

  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Course creation (admin only)
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({ code: '', title: '' });
  const [courseError, setCourseError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schedRes, courseRes] = await Promise.all([
        axios.get('/schedules'),
        axios.get('/courses'),
      ]);
      setSchedules(schedRes.data);
      setCourses(courseRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const getSlot = (day, time) => schedules.find(s => s.day === day && s.time_start === time);
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const openNew = (day, time) => {
    if (!canEdit) return;
    setEditId(null);
    setForm({ ...BLANK, day, time_start: time });
    setError('');
    setShowModal(true);
  };

  const openEdit = (s) => {
    if (!canEdit) return;
    setEditId(s.id);
    setForm({ course_id: s.course_id, day: s.day, time_start: s.time_start, time_end: s.time_end, room: s.room, color: s.color || '#4e73df' });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.course_id) { setError('Please select a course.'); return; }
    if (!form.room.trim()) { setError('Room is required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (editId) {
        // update via delete + recreate (simple approach)
        await axios.delete(`/schedules/${editId}`);
      }
      await axios.post(`/courses/${form.course_id}/schedules`, {
        day: form.day, time_start: form.time_start, time_end: form.time_end, room: form.room,
      });
      setShowModal(false);
      fetchData();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save schedule.');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!editId) return;
    if (!window.confirm('Delete this schedule?')) return;
    try {
      await axios.delete(`/schedules/${editId}`);
      setShowModal(false);
      fetchData();
    } catch (e) { setError('Failed to delete.'); }
  };

  const handleCreateCourse = async () => {
    if (!courseForm.code.trim() || !courseForm.title.trim()) { setCourseError('Code and title are required.'); return; }
    try {
      await axios.post('/courses', courseForm);
      setCourseForm({ code: '', title: '' });
      setShowCourseModal(false);
      fetchData();
    } catch (e) { setCourseError(e.response?.data?.message || 'Failed to create course.'); }
  };

  return (
    <div>
      <div style={S.header}>
        <h1 style={S.pageTitle}>Class Scheduling</h1>
        {canEdit && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={S.btn2} onClick={() => { setCourseError(''); setShowCourseModal(true); }}>+ New Course</button>
            <button style={S.btn} onClick={() => openNew('Monday', '7:00 AM')}>+ Add Schedule</button>
          </div>
        )}
      </div>

      {loading ? (
        <div style={S.empty}>Loading schedule…</div>
      ) : (
        <div style={S.wrapper}>
          <div style={S.timesCol}>
            <div style={S.corner} />
            {timeSlots.map(t => <div key={t} style={S.timeCell}>{t}</div>)}
          </div>
          {days.map(day => (
            <div key={day} style={S.dayCol}>
              <div style={S.dayHeader}>{day}</div>
              {timeSlots.map(time => {
                const slot = getSlot(day, time);
                const course = slot ? courses.find(c => c.id === slot.course_id) : null;
                return (
                  <div
                    key={`${day}-${time}`}
                    style={{ ...S.slotCell, backgroundColor: slot ? (slot.color || '#4e73df') : 'transparent', cursor: canEdit ? 'pointer' : 'default' }}
                    onClick={() => slot ? openEdit(slot) : openNew(day, time)}
                  >
                    {slot && (
                      <div style={S.slotContent}>
                        <div style={S.slotCourse}>{course?.code || 'Course'}</div>
                        <div style={S.slotRoom}>{slot.room}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Schedule Modal */}
      {showModal && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalHead}>
              <h3 style={{ margin: 0 }}>{editId ? 'Edit Schedule' : 'Add Schedule'}</h3>
              <button onClick={() => setShowModal(false)} style={S.close}>×</button>
            </div>
            <div style={S.modalBody}>
              {error && <div style={S.errBox}>{error}</div>}
              <div style={S.fg}>
                <label style={S.label}>Course *</label>
                <select style={S.sel} value={form.course_id} onChange={set('course_id')}>
                  <option value="">Select course…</option>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={S.fg}>
                  <label style={S.label}>Day</label>
                  <select style={S.sel} value={form.day} onChange={set('day')}>
                    {days.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div style={S.fg}>
                  <label style={S.label}>Room *</label>
                  <input style={S.inp} value={form.room} onChange={set('room')} placeholder="e.g. Room 301" />
                </div>
                <div style={S.fg}>
                  <label style={S.label}>Start Time</label>
                  <select style={S.sel} value={form.time_start} onChange={set('time_start')}>
                    {timeSlots.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={S.fg}>
                  <label style={S.label}>End Time</label>
                  <select style={S.sel} value={form.time_end} onChange={set('time_end')}>
                    {timeSlots.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div style={S.modalFoot}>
              {editId && <button onClick={handleDelete} style={S.delBtn}>🗑 Delete</button>}
              <button onClick={() => setShowModal(false)} style={S.cancelBtn}>Cancel</button>
              <button onClick={handleSave} style={S.saveBtn} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Course Creation Modal */}
      {showCourseModal && (
        <div style={S.overlay}>
          <div style={{ ...S.modal, maxWidth: 420 }}>
            <div style={S.modalHead}>
              <h3 style={{ margin: 0 }}>Create Course</h3>
              <button onClick={() => setShowCourseModal(false)} style={S.close}>×</button>
            </div>
            <div style={S.modalBody}>
              {courseError && <div style={S.errBox}>{courseError}</div>}
              <div style={S.fg}>
                <label style={S.label}>Course Code *</label>
                <input style={S.inp} value={courseForm.code} onChange={e => setCourseForm(p => ({ ...p, code: e.target.value }))} placeholder="e.g. CS 301" />
              </div>
              <div style={S.fg}>
                <label style={S.label}>Course Title *</label>
                <input style={S.inp} value={courseForm.title} onChange={e => setCourseForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Database Systems" />
              </div>
            </div>
            <div style={S.modalFoot}>
              <button onClick={() => setShowCourseModal(false)} style={S.cancelBtn}>Cancel</button>
              <button onClick={handleCreateCourse} style={S.saveBtn}>Create Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const S = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  pageTitle: { fontSize: 24, fontWeight: 600, color: '#1f2f70', margin: 0 },
  btn: { padding: '9px 18px', backgroundColor: '#1cc88a', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  btn2: { padding: '9px 18px', backgroundColor: '#1f2f70', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  empty: { padding: 60, textAlign: 'center', color: '#858796' },
  wrapper: { display: 'flex', backgroundColor: 'white', borderRadius: 12, overflow: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  timesCol: { width: 90, flexShrink: 0, borderRight: '1px solid #e3e6f0' },
  corner: { height: 50, borderBottom: '1px solid #e3e6f0', backgroundColor: '#f8f9fc' },
  timeCell: { height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e3e6f0', fontSize: 12, fontWeight: 500, color: '#5a5c69' },
  dayCol: { flex: 1, borderRight: '1px solid #e3e6f0', minWidth: 110 },
  dayHeader: { height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e3e6f0', backgroundColor: '#f8f9fc', fontWeight: 600, color: '#1f2f70', fontSize: 13 },
  slotCell: { height: 72, borderBottom: '1px solid #e3e6f0', padding: 6, transition: 'opacity .2s' },
  slotContent: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  slotCourse: { fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 2 },
  slotRoom: { fontSize: 10, color: 'rgba(255,255,255,0.85)' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', borderRadius: 14, width: '90%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto' },
  modalHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #e3e6f0' },
  close: { background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', color: '#858796', lineHeight: 1 },
  modalBody: { padding: '18px 24px' },
  modalFoot: { display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 24px', borderTop: '1px solid #e3e6f0' },
  fg: { marginBottom: 14 },
  label: { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 500, color: '#5a5c69' },
  inp: { width: '100%', padding: '9px 12px', border: '1px solid #d1d3e2', borderRadius: 7, fontSize: 14, boxSizing: 'border-box' },
  sel: { width: '100%', padding: '9px 12px', border: '1px solid #d1d3e2', borderRadius: 7, fontSize: 14 },
  errBox: { backgroundColor: '#fdecea', border: '1px solid #f5c6cb', color: '#842029', padding: '9px 12px', borderRadius: 7, marginBottom: 12, fontSize: 13 },
  saveBtn: { padding: '9px 20px', backgroundColor: '#1cc88a', color: 'white', border: 'none', borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  cancelBtn: { padding: '9px 18px', backgroundColor: '#f8f9fc', color: '#5a5c69', border: '1px solid #d1d3e2', borderRadius: 7, fontSize: 14, cursor: 'pointer' },
  delBtn: { padding: '9px 16px', backgroundColor: '#e74a3b', color: 'white', border: 'none', borderRadius: 7, fontSize: 14, cursor: 'pointer', marginRight: 'auto' },
};

export default Scheduling;