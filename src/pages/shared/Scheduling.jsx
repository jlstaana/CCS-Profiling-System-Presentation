import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Scheduling = () => {
  const { user } = useAuth();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const schedules = {
    Monday: [
      { time: '9:00 AM', course: 'CS 301 - Database Systems', room: 'Room 201', instructor: 'Dr. Smith', color: '#4e73df' },
      { time: '11:00 AM', course: 'CS 302 - Web Development', room: 'Lab 105', instructor: 'Prof. Johnson', color: '#1cc88a' },
      { time: '2:00 PM', course: 'CS 303 - Algorithms', room: 'Room 304', instructor: 'Dr. Williams', color: '#36b9cc' }
    ],
    Tuesday: [
      { time: '10:00 AM', course: 'CS 304 - Software Engineering', room: 'Room 201', instructor: 'Prof. Brown', color: '#f6c23e' },
      { time: '1:00 PM', course: 'CS 305 - Computer Networks', room: 'Lab 105', instructor: 'Dr. Davis', color: '#e74a3b' }
    ],
    Wednesday: [
      { time: '9:00 AM', course: 'CS 301 - Database Systems', room: 'Room 201', instructor: 'Dr. Smith', color: '#4e73df' },
      { time: '2:00 PM', course: 'CS 303 - Algorithms', room: 'Room 304', instructor: 'Dr. Williams', color: '#36b9cc' }
    ],
    Thursday: [
      { time: '10:00 AM', course: 'CS 304 - Software Engineering', room: 'Room 201', instructor: 'Prof. Brown', color: '#f6c23e' },
      { time: '3:00 PM', course: 'CS 306 - AI Fundamentals', room: 'Lab 105', instructor: 'Dr. Wilson', color: '#1cc88a' }
    ],
    Friday: [
      { time: '9:00 AM', course: 'CS 301 - Database Systems', room: 'Room 201', instructor: 'Dr. Smith', color: '#4e73df' },
      { time: '11:00 AM', course: 'CS 302 - Web Development', room: 'Lab 105', instructor: 'Prof. Johnson', color: '#1cc88a' }
    ]
  };

  const getScheduleForDayAndTime = (day, time) => {
    return schedules[day]?.find(s => s.time === time);
  };

  const handleTimeSlotClick = (day, time) => {
    if (user?.role !== 'student') {
      setSelectedDay(day);
      setSelectedTime(time);
      setShowScheduleModal(true);
    }
  };

  const ScheduleModal = ({ day, time, onClose }) => {
    const existingSchedule = getScheduleForDayAndTime(day, time);

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3>{existingSchedule ? 'Edit Schedule' : 'Add New Schedule'}</h3>
            <button onClick={onClose} style={styles.closeButton}>×</button>
          </div>
          <div style={styles.modalBody}>
            <div style={styles.modalInfo}>
              <p><strong>Day:</strong> {day}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Course</label>
              <select style={styles.select} defaultValue={existingSchedule?.course || ''}>
                <option value="">Select Course</option>
                <option value="CS 301">CS 301 - Database Systems</option>
                <option value="CS 302">CS 302 - Web Development</option>
                <option value="CS 303">CS 303 - Algorithms</option>
                <option value="CS 304">CS 304 - Software Engineering</option>
                <option value="CS 305">CS 305 - Computer Networks</option>
                <option value="CS 306">CS 306 - AI Fundamentals</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Room</label>
              <input 
                type="text" 
                style={styles.input} 
                placeholder="Enter room number"
                defaultValue={existingSchedule?.room || ''}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Instructor</label>
              <input 
                type="text" 
                style={styles.input} 
                placeholder="Enter instructor name"
                defaultValue={existingSchedule?.instructor || ''}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Color Code</label>
              <select style={styles.select} defaultValue={existingSchedule?.color || '#4e73df'}>
                <option value="#4e73df">Blue</option>
                <option value="#1cc88a">Green</option>
                <option value="#36b9cc">Cyan</option>
                <option value="#f6c23e">Yellow</option>
                <option value="#e74a3b">Red</option>
              </select>
            </div>
          </div>
          <div style={styles.modalFooter}>
            {existingSchedule && (
              <button style={styles.deleteButton}>Delete</button>
            )}
            <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
            <button style={styles.saveButton}>
              {existingSchedule ? 'Update Schedule' : 'Add Schedule'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Class Scheduling</h1>
        {user?.role !== 'student' && (
          <button 
            style={styles.addButton}
            onClick={() => {
              setSelectedDay('Monday');
              setSelectedTime('9:00 AM');
              setShowScheduleModal(true);
            }}
          >
            + Create Schedule
          </button>
        )}
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{...styles.colorDot, backgroundColor: '#4e73df'}}></div>
          <span>Database Systems</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.colorDot, backgroundColor: '#1cc88a'}}></div>
          <span>Web Development</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.colorDot, backgroundColor: '#36b9cc'}}></div>
          <span>Algorithms</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.colorDot, backgroundColor: '#f6c23e'}}></div>
          <span>Software Engineering</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.colorDot, backgroundColor: '#e74a3b'}}></div>
          <span>Other Courses</span>
        </div>
      </div>

      <div style={styles.scheduleContainer}>
        <div style={styles.timesColumn}>
          <div style={styles.cornerCell}></div>
          {timeSlots.map(time => (
            <div key={time} style={styles.timeCell}>{time}</div>
          ))}
        </div>

        {days.map(day => (
          <div key={day} style={styles.dayColumn}>
            <div style={styles.dayHeader}>{day}</div>
            {timeSlots.map(time => {
              const schedule = getScheduleForDayAndTime(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  style={{
                    ...styles.slotCell,
                    backgroundColor: schedule ? schedule.color : 'transparent',
                    color: schedule ? 'white' : 'inherit',
                    cursor: user?.role !== 'student' ? 'pointer' : 'default'
                  }}
                  onClick={() => handleTimeSlotClick(day, time)}
                >
                  {schedule && (
                    <div style={styles.scheduleContent}>
                      <div style={styles.scheduleCourse}>{schedule.course}</div>
                      <div style={styles.scheduleRoom}>{schedule.room}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showScheduleModal && (
        <ScheduleModal
          day={selectedDay}
          time={selectedTime}
          onClose={() => setShowScheduleModal(false)}
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
  legend: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    flexWrap: 'wrap'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px'
  },
  colorDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  scheduleContainer: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  timesColumn: {
    width: '100px',
    borderRight: '1px solid #e3e6f0'
  },
  cornerCell: {
    height: '50px',
    borderBottom: '1px solid #e3e6f0',
    backgroundColor: '#f8f9fc'
  },
  timeCell: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #e3e6f0',
    fontSize: '13px',
    fontWeight: '500',
    color: '#5a5c69'
  },
  dayColumn: {
    flex: 1,
    borderRight: '1px solid #e3e6f0',
    ':last-child': {
      borderRight: 'none'
    }
  },
  dayHeader: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #e3e6f0',
    backgroundColor: '#f8f9fc',
    fontWeight: '600',
    color: '#1f2f70'
  },
  slotCell: {
    height: '80px',
    borderBottom: '1px solid #e3e6f0',
    padding: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      opacity: 0.9
    }
  },
  scheduleContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  scheduleCourse: {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '4px'
  },
  scheduleRoom: {
    fontSize: '11px',
    opacity: 0.9
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
    maxWidth: '500px'
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
  modalInfo: {
    backgroundColor: '#f8f9fc',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px'
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
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f8f9fc',
    color: '#5a5c69',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  saveButton: {
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
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#e74a3b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    marginRight: 'auto',
    ':hover': {
      backgroundColor: '#c73a2b'
    }
  }
};

export default Scheduling;