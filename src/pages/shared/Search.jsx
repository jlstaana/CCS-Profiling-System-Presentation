import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const categories = [
    { id: 'all', label: 'All Results', icon: '🔍' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { id: 'schedules', label: 'Schedules', icon: '📅' },
    { id: 'materials', label: 'Materials', icon: '📎' }
  ];

  const mockResults = [
    {
      id: 1,
      type: 'course',
      title: 'CS 301 - Database Systems',
      subtitle: 'Dr. Smith • 32 students • MWF 9:00 AM',
      description: 'Introduction to database management systems, SQL, and database design.',
      tags: ['Computer Science', '3rd Year', 'Core'],
      icon: '📚',
      color: '#4e73df'
    },
    {
      id: 2,
      type: 'course',
      title: 'CS 302 - Web Development',
      subtitle: 'Prof. Johnson • 28 students • TTH 11:00 AM',
      description: 'Modern web development using React, Node.js, and database integration.',
      tags: ['Computer Science', '3rd Year', 'Elective'],
      icon: '🌐',
      color: '#1cc88a'
    },
    {
      id: 3,
      type: 'student',
      title: 'John Doe',
      subtitle: 'Student ID: 2021-12345 • 3rd Year CS',
      description: 'GPA: 3.75 • Enrolled in 6 courses',
      tags: ['Student', 'CS Department'],
      icon: '👤',
      color: '#36b9cc'
    },
    {
      id: 4,
      type: 'faculty',
      title: 'Dr. Maria Santos',
      subtitle: 'Professor • PhD Computer Science',
      description: 'Specialization: Database Systems, Data Mining • 15 years experience',
      tags: ['Faculty', 'Department Chair'],
      icon: '👩‍🏫',
      color: '#f6c23e'
    },
    {
      id: 5,
      type: 'schedule',
      title: 'CS 301 Class Schedule',
      subtitle: 'Monday, Wednesday, Friday • 9:00-10:30 AM',
      description: 'Room 201 • Instructor: Dr. Smith',
      tags: ['Schedule', 'CS 301'],
      icon: '📅',
      color: '#e74a3b'
    },
    {
      id: 6,
      type: 'material',
      title: 'Database Systems - Week 8 Slides',
      subtitle: 'Uploaded by Dr. Smith • 2 days ago',
      description: 'Lecture slides covering normalization and advanced SQL queries.',
      tags: ['Material', 'Slides', 'CS 301'],
      icon: '📎',
      color: '#1f2f70'
    }
  ];

  const filteredResults = mockResults.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    // Default relevance - keep original order
    return 0;
  });

  const CardView = () => (
    <div style={styles.resultsGrid}>
      {sortedResults.map(result => (
        <div key={result.id} style={styles.resultCard}>
          <div style={{...styles.cardIcon, backgroundColor: result.color + '20', color: result.color}}>
            {result.icon}
          </div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>{result.title}</h3>
            <p style={styles.cardSubtitle}>{result.subtitle}</p>
            <p style={styles.cardDescription}>{result.description}</p>
            <div style={styles.cardTags}>
              {result.tags.map((tag, index) => (
                <span key={index} style={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Details</th>
            <th style={styles.th}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map(result => (
            <tr key={result.id} style={styles.tr}>
              <td style={styles.td}>
                <span style={{...styles.typeIcon, backgroundColor: result.color + '20', color: result.color}}>
                  {result.icon}
                </span>
              </td>
              <td style={styles.td}>
                <div style={styles.tableTitle}>{result.title}</div>
                <div style={styles.tableSubtitle}>{result.subtitle}</div>
              </td>
              <td style={styles.td}>{result.description}</td>
              <td style={styles.td}>
                <div style={styles.tableTags}>
                  {result.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1 style={styles.pageTitle}>Search</h1>

      <div style={styles.searchSection}>
        <div style={styles.searchBar}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search for courses, students, faculty, schedules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filtersBar}>
          <div style={styles.categories}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryButton,
                  backgroundColor: selectedCategory === category.id ? '#1f2f70' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#5a5c69'
                }}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          <div style={styles.sortSection}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="name">Sort by: Name</option>
            </select>

            <div style={styles.viewToggle}>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  ...styles.viewButton,
                  backgroundColor: viewMode === 'cards' ? '#1f2f70' : 'transparent',
                  color: viewMode === 'cards' ? 'white' : '#5a5c69'
                }}
              >
                📇 Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  ...styles.viewButton,
                  backgroundColor: viewMode === 'table' ? '#1f2f70' : 'transparent',
                  color: viewMode === 'table' ? 'white' : '#5a5c69'
                }}
              >
                📊 Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {searchTerm ? (
        <>
          <div style={styles.resultsHeader}>
            <p>Found {filteredResults.length} results for "{searchTerm}"</p>
          </div>
          {viewMode === 'cards' ? <CardView /> : <TableView />}
        </>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyStateIcon}>🔍</div>
          <h3 style={styles.emptyStateTitle}>Start Searching</h3>
          <p style={styles.emptyStateText}>
            Enter a search term to find courses, students, faculty, and more.
          </p>
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
  searchSection: {
    marginBottom: '24px'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '4px 20px',
    marginBottom: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  searchIcon: {
    fontSize: '20px',
    color: '#858796',
    marginRight: '12px'
  },
  searchInput: {
    flex: 1,
    padding: '16px 0',
    border: 'none',
    fontSize: '16px',
    outline: 'none'
  },
  filtersBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  categories: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: '1px solid #d1d3e2',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#f8f9fc'
    }
  },
  sortSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  sortSelect: {
    padding: '8px 16px',
    border: '1px solid #d1d3e2',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  viewToggle: {
    display: 'flex',
    gap: '4px',
    backgroundColor: '#f8f9fc',
    padding: '4px',
    borderRadius: '8px'
  },
  viewButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  resultsHeader: {
    marginBottom: '16px',
    color: '#5a5c69',
    fontSize: '14px'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  resultCard: {
    display: 'flex',
    gap: '16px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  cardIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '4px'
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#858796',
    marginBottom: '8px'
  },
  cardDescription: {
    fontSize: '13px',
    color: '#5a5c69',
    marginBottom: '12px',
    lineHeight: '1.5'
  },
  cardTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '4px 8px',
    backgroundColor: '#f8f9fc',
    color: '#5a5c69',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '500'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'auto',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '16px',
    backgroundColor: '#f8f9fc',
    color: '#5a5c69',
    fontSize: '14px',
    fontWeight: '600',
    borderBottom: '2px solid #e3e6f0'
  },
  tr: {
    ':hover': {
      backgroundColor: '#f8f9fc'
    }
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #e3e6f0',
    fontSize: '14px',
    verticalAlign: 'top'
  },
  typeIcon: {
    display: 'inline-block',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },
  tableTitle: {
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '4px'
  },
  tableSubtitle: {
    fontSize: '12px',
    color: '#858796'
  },
  tableTags: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  emptyStateTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2f70',
    marginBottom: '8px'
  },
  emptyStateText: {
    fontSize: '14px',
    color: '#858796'
  }
};

export default Search;