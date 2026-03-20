import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'CS Week Hackathon',
      date: '2024-03-15',
      time: '9:00 AM - 5:00 PM',
      location: 'CS Building, Main Hall',
      description: 'Annual hackathon event for computer science students. Form teams and build innovative projects!',
      organizer: 'CCS Student Council',
      type: 'academic',
      attendees: 45,
      rsvp: 'yes'
    },
    {
      id: 2,
      title: 'Guest Lecture: AI Ethics',
      date: '2024-03-18',
      time: '2:00 PM - 4:00 PM',
      location: 'Auditorium A',
      description: 'Special guest lecture on ethical considerations in artificial intelligence by industry expert Dr. Sarah Johnson.',
      organizer: 'CS Department',
      type: 'lecture',
      attendees: 120,
      rsvp: 'maybe'
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      date: '2024-03-20',
      time: '10:00 AM - 4:00 PM',
      location: 'Student Center',
      description: 'Meet with top tech companies looking for interns and graduates. Bring your resume!',
      organizer: 'Career Services',
      type: 'career',
      attendees: 300,
      rsvp: 'no'
    },
    {
      id: 4,
      title: 'Research Symposium',
      date: '2024-03-25',
      time: '1:00 PM - 5:00 PM',
      location: 'CS Building, Room 301',
      description: 'Showcase of student research projects and thesis presentations.',
      organizer: 'Research Committee',
      type: 'academic',
      attendees: 80,
      rsvp: null
    },
    {
      id: 5,
      title: 'Code Review Workshop',
      date: '2024-03-28',
      time: '3:00 PM - 5:00 PM',
      location: 'Lab 105',
      description: 'Learn best practices for code review and collaborative development.',
      organizer: 'Programming Club',
      type: 'workshop',
      attendees: 25,
      rsvp: null
    }
  ];

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'academic': return '#4e73df';
      case 'lecture': return '#1cc88a';
      case 'career': return '#f6c23e';
      case 'workshop': return '#36b9cc';
      case 'social': return '#e74a3b';
      default: return '#858796';
    }
  };

  const getRSVPStatus = (status) => {
    switch(status) {
      case 'yes': return { text: 'Going', color: '#1cc88a' };
      case 'maybe': return { text: 'Maybe', color: '#f6c23e' };
      case 'no': return { text: 'Not Going', color: '#e74a3b' };
      default: return { text: 'RSVP', color: '#1f2f70' };
    }
  };

  const EventModal = ({ event, onClose }) => {
    const isNew = !event;
    const rsvpStatus = event ? getRSVPStatus(event.rsvp) : null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3>{isNew ? 'Create New Event' : event.title}</h3>
            <button onClick={onClose} style={styles.closeButton}>×</button>
          </div>
          <div style={styles.modalBody}>
            {isNew ? (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Event Title</label>
                  <input type="text" style={styles.input} placeholder="Enter event title" />
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Date</label>
                    <input type="date" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Time</label>
                    <input type="text" style={styles.input} placeholder="e.g., 9:00 AM - 5:00 PM" />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location</label>
                  <input type="text" style={styles.input} placeholder="Enter location" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea style={styles.textarea} rows="4" placeholder="Enter event description"></textarea>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Event Type</label>
                  <select style={styles.select}>
                    <option value="academic">Academic</option>
                    <option value="lecture">Lecture</option>
                    <option value="career">Career</option>
                    <option value="workshop">Workshop</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div style={styles.eventDetails}>
                  <div style={styles.eventDetailItem}>
                    <span style={styles.detailLabel}>📅 Date:</span>
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div style={styles.eventDetailItem}>
                    <span style={styles.detailLabel}>⏰ Time:</span>
                    <span>{event.time}</span>
                  </div>
                  <div style={styles.eventDetailItem}>
                    <span style={styles.detailLabel}>📍 Location:</span>
                    <span>{event.location}</span>
                  </div>
                  <div style={styles.eventDetailItem}>
                    <span style={styles.detailLabel}>👥 Organizer:</span>
                    <span>{event.organizer}</span>
                  </div>
                  <div style={styles.eventDetailItem}>
                    <span style={styles.detailLabel}>📊 Type:</span>
                    <span style={{...styles.typeBadge, backgroundColor: getEventTypeColor(event.type)}}>
                      {event.type}
                    </span>
                  </div>
                  <div style={styles.eventDetailItem}>
                    <span style={styles.detailLabel}>👤 Attendees:</span>
                    <span>{event.attendees} confirmed</span>
                  </div>
                </div>

                <div style={styles.eventDescription}>
                  <h4 style={styles.descriptionTitle}>Description</h4>
                  <p>{event.description}</p>
                </div>

                {user?.role === 'student' && (
                  <div style={styles.rsvpSection}>
                    <h4 style={styles.rsvpTitle}>RSVP Status</h4>
                    <div style={styles.rsvpButtons}>
                      <button style={{...styles.rsvpButton, backgroundColor: '#1cc88a'}}>Going</button>
                      <button style={{...styles.rsvpButton, backgroundColor: '#f6c23e'}}>Maybe</button>
                      <button style={{...styles.rsvpButton, backgroundColor: '#e74a3b'}}>Not Going</button>
                    </div>
                    {rsvpStatus && (
                      <p style={styles.currentRSVP}>
                        Current: <span style={{color: rsvpStatus.color, fontWeight: '600'}}>{rsvpStatus.text}</span>
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div style={styles.modalFooter}>
            {!isNew && user?.role !== 'student' && (
              <>
                <button style={styles.deleteButton}>Delete Event</button>
                <button style={styles.editButton}>Edit Event</button>
              </>
            )}
            <button onClick={onClose} style={styles.cancelButton}>Close</button>
            {isNew && (
              <button style={styles.createButton}>Create Event</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CalendarView = () => {
    const daysInMonth = 31;
    const firstDayOfMonth = 5; // Friday (0 = Sunday)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const blanks = Array(firstDayOfMonth).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div style={styles.calendar}>
        <div style={styles.calendarHeader}>
          <h3>March 2024</h3>
          <div style={styles.calendarNav}>
            <button style={styles.navButton}>←</button>
            <button style={styles.navButton}>→</button>
          </div>
        </div>
        <div style={styles.weekDays}>
          {days.map(day => (
            <div key={day} style={styles.weekDay}>{day}</div>
          ))}
        </div>
        <div style={styles.calendarGrid}>
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} style={styles.calendarDay}></div>
          ))}
          {daysArray.map(day => {
            const dayEvents = events.filter(e => new Date(e.date).getDate() === day);
            return (
              <div key={day} style={styles.calendarDay}>
                <span style={styles.dayNumber}>{day}</span>
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    style={{
                      ...styles.calendarEvent,
                      backgroundColor: getEventTypeColor(event.type)
                    }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ListView = () => {
    const [filter, setFilter] = useState('all');

    const filteredEvents = filter === 'all' 
      ? events 
      : events.filter(e => e.type === filter);

    return (
      <div>
        <div style={styles.filterBar}>
          <select 
            style={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="academic">Academic</option>
            <option value="lecture">Lectures</option>
            <option value="career">Career</option>
            <option value="workshop">Workshops</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div style={styles.eventsList}>
          {filteredEvents.map(event => {
            const rsvpStatus = getRSVPStatus(event.rsvp);
            return (
              <div
                key={event.id}
                style={styles.listEventItem}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
              >
                <div style={{
                  ...styles.eventTypeIndicator,
                  backgroundColor: getEventTypeColor(event.type)
                }}></div>
                <div style={styles.listEventDate}>
                  <div style={styles.listEventDay}>{new Date(event.date).getDate()}</div>
                  <div style={styles.listEventMonth}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div style={styles.listEventContent}>
                  <h4 style={styles.listEventTitle}>{event.title}</h4>
                  <div style={styles.listEventMeta}>
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                    <span>•</span>
                    <span>{event.organizer}</span>
                  </div>
                </div>
                {user?.role === 'student' && event.rsvp && (
                  <span style={{
                    ...styles.rsvpBadge,
                    backgroundColor: rsvpStatus.color
                  }}>
                    {rsvpStatus.text}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Events</h1>
        <div style={styles.headerActions}>
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewButton,
                backgroundColor: view === 'calendar' ? '#1f2f70' : 'transparent',
                color: view === 'calendar' ? 'white' : '#5a5c69'
              }}
              onClick={() => setView('calendar')}
            >
              Calendar
            </button>
            <button
              style={{
                ...styles.viewButton,
                backgroundColor: view === 'list' ? '#1f2f70' : 'transparent',
                color: view === 'list' ? 'white' : '#5a5c69'
              }}
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>
          {user?.role !== 'student' && (
            <button
              style={styles.addButton}
              onClick={() => {
                setSelectedEvent(null);
                setShowEventModal(true);
              }}
            >
              + Create Event
            </button>
          )}
        </div>
      </div>

      {view === 'calendar' ? <CalendarView /> : <ListView />}

      {showEventModal && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
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
  headerActions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  viewToggle: {
    display: 'flex',
    gap: '4px',
    backgroundColor: '#f8f9fc',
    padding: '4px',
    borderRadius: '8px'
  },
  viewButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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
    ':hover': {
      backgroundColor: '#169b6b',
      transform: 'translateY(-2px)'
    }
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  calendarNav: {
    display: 'flex',
    gap: '8px'
  },
  navButton: {
    padding: '6px 12px',
    border: '1px solid #d1d3e2',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  weekDays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
    marginBottom: '8px'
  },
  weekDay: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#5a5c69',
    fontSize: '14px',
    padding: '8px'
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px'
  },
  calendarDay: {
    minHeight: '100px',
    backgroundColor: '#f8f9fc',
    borderRadius: '8px',
    padding: '8px'
  },
  dayNumber: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#5a5c69',
    marginBottom: '8px'
  },
  calendarEvent: {
    fontSize: '11px',
    padding: '4px',
    borderRadius: '4px',
    color: 'white',
    marginBottom: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  filterBar: {
    marginBottom: '20px'
  },
  filterSelect: {
    padding: '8px 16px',
    border: '1px solid #d1d3e2',
    borderRadius: '8px',
    fontSize: '14px',
    width: '200px'
  },
  eventsList: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  listEventItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    borderBottom: '1px solid #f8f9fc',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    position: 'relative',
    ':hover': {
      backgroundColor: '#f8f9fc'
    }
  },
  eventTypeIndicator: {
    width: '4px',
    height: '40px',
    borderRadius: '2px'
  },
  listEventDate: {
    textAlign: 'center',
    minWidth: '50px'
  },
  listEventDay: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2f70'
  },
  listEventMonth: {
    fontSize: '12px',
    color: '#858796',
    textTransform: 'uppercase'
  },
  listEventContent: {
    flex: 1
  },
  listEventTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#1f2f70'
  },
  listEventMeta: {
    fontSize: '13px',
    color: '#858796',
    display: 'flex',
    gap: '8px'
  },
  rsvpBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '11px',
    fontWeight: '600'
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
    maxWidth: '600px',
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
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
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
  eventDetails: {
    marginBottom: '20px'
  },
  eventDetailItem: {
    display: 'flex',
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#f8f9fc',
    borderRadius: '8px'
  },
  detailLabel: {
    minWidth: '100px',
    fontWeight: '600',
    color: '#5a5c69'
  },
  typeBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    textTransform: 'capitalize'
  },
  eventDescription: {
    marginBottom: '20px'
  },
  descriptionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1f2f70'
  },
  rsvpSection: {
    borderTop: '1px solid #e3e6f0',
    paddingTop: '20px'
  },
  rsvpTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#1f2f70'
  },
  rsvpButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px'
  },
  rsvpButton: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  currentRSVP: {
    fontSize: '14px',
    color: '#5a5c69'
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
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#1cc88a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#1f2f70',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#e74a3b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    marginRight: 'auto'
  }
};

export default Events;