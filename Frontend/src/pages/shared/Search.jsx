import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORIES = [
  { id: 'all',       label: 'All',       icon: '🔍' },
  { id: 'users',     label: 'People',    icon: '👥' },
  { id: 'courses',   label: 'Courses',   icon: '📚' },
  { id: 'materials', label: 'Materials', icon: '📎' },
];

const Search = () => {
  const [query, setQuery]           = useState('');
  const [category, setCategory]     = useState('all');
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const timer = setTimeout(() => runSearch(), 400);
    return () => clearTimeout(timer);
  }, [query, category]);

  const runSearch = async () => {
    setLoading(true);
    const combined = [];

    try {
      if (category === 'all' || category === 'users') {
        const res = await axios.get('/admin/users');
        const filtered = res.data.filter(u =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          (u.email || '').toLowerCase().includes(query.toLowerCase())
        );
        filtered.forEach(u => combined.push({
          id: `user-${u.id}`,
          type: 'users',
          icon: u.role === 'faculty' ? '👨‍🏫' : u.role === 'admin' ? '👑' : '🎓',
          color: u.role === 'faculty' ? '#4e73df' : u.role === 'admin' ? '#e74a3b' : '#1cc88a',
          title: u.name,
          subtitle: `${u.role} · ${u.department || '—'}`,
          description: u.bio || u.email || '',
          tags: [u.role, u.department, u.course].filter(Boolean),
        }));
      }

      if (category === 'all' || category === 'courses') {
        const res = await axios.get('/courses');
        const filtered = res.data.filter(c =>
          c.code.toLowerCase().includes(query.toLowerCase()) ||
          c.title.toLowerCase().includes(query.toLowerCase())
        );
        filtered.forEach(c => combined.push({
          id: `course-${c.id}`,
          type: 'courses',
          icon: '📚',
          color: '#f6c23e',
          title: `${c.code} — ${c.title}`,
          subtitle: `Created by ${c.creator?.name || 'Admin'}`,
          description: `${c.materials?.length ?? 0} materials · ${c.schedules?.length ?? 0} schedule slots`,
          tags: ['course'],
        }));
      }

      if (category === 'all' || category === 'materials') {
        const coursesRes = await axios.get('/courses');
        for (const c of coursesRes.data) {
          const mRes = await axios.get(`/courses/${c.id}/materials`);
          const filtered = mRes.data.filter(m =>
            m.title.toLowerCase().includes(query.toLowerCase())
          );
          filtered.forEach(m => combined.push({
            id: `mat-${m.id}`,
            type: 'materials',
            icon: '📎',
            color: '#36b9cc',
            title: m.title,
            subtitle: `${c.code} · Uploaded by ${m.uploader?.name || '—'}`,
            description: new Date(m.created_at).toLocaleDateString(),
            tags: [c.code, 'material'],
          }));
        }
      }
    } catch (e) {
      console.error('Search error', e);
    }

    setResults(combined);
    setLoading(false);
  };

  return (
    <div>
      <div style={S.header}>
        <h1 style={S.pageTitle}>Search</h1>
      </div>

      {/* Search input */}
      <div style={S.searchBox}>
        <span style={S.searchIcon}>🔍</span>
        <input
          style={S.searchInput}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for people, courses, materials…"
          autoFocus
        />
        {query && (
          <button style={S.clearBtn} onClick={() => { setQuery(''); setResults([]); }}>×</button>
        )}
      </div>

      {/* Category tabs */}
      <div style={S.tabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            style={{ ...S.tab, ...(category === cat.id ? S.tabActive : {}) }}
            onClick={() => setCategory(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div style={S.empty}>Searching…</div>
      ) : query.length < 2 ? (
        <div style={S.empty}>Type at least 2 characters to search.</div>
      ) : results.length === 0 ? (
        <div style={S.empty}>No results found for <strong>"{query}"</strong>.</div>
      ) : (
        <>
          <div style={S.resultCount}>{results.length} result{results.length !== 1 ? 's' : ''}</div>
          <div style={S.resultsGrid}>
            {results.map(r => (
              <div key={r.id} style={S.card}>
                <div style={{ ...S.cardIcon, backgroundColor: r.color + '20', color: r.color }}>
                  {r.icon}
                </div>
                <div style={S.cardContent}>
                  <h3 style={S.cardTitle}>{r.title}</h3>
                  <p style={S.cardSubtitle}>{r.subtitle}</p>
                  {r.description && <p style={S.cardDesc}>{r.description}</p>}
                  <div style={S.tags}>
                    {r.tags.map((tag, i) => <span key={i} style={S.tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const S = {
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 24, fontWeight: 600, color: '#1f2f70', margin: 0 },
  searchBox: { display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: '12px 16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', marginBottom: 16, gap: 10 },
  searchIcon: { fontSize: 20 },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '16px', color: '#1f2f70' },
  clearBtn: { background: 'none', border: 'none', fontSize: 22, color: '#858796', cursor: 'pointer', lineHeight: 1 },
  tabs: { display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' },
  tab: { padding: '8px 16px', border: '1px solid #d1d3e2', borderRadius: 20, fontSize: 14, cursor: 'pointer', backgroundColor: 'transparent', color: '#5a5c69' },
  tabActive: { backgroundColor: '#1f2f70', color: 'white', border: '1px solid #1f2f70' },
  empty: { textAlign: 'center', padding: '60px 20px', color: '#858796', fontSize: 15 },
  resultCount: { fontSize: 13, color: '#858796', marginBottom: 16 },
  resultsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 20, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', gap: 14 },
  cardIcon: { width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 },
  cardContent: { flex: 1, minWidth: 0 },
  cardTitle: { fontSize: 15, fontWeight: 600, color: '#1f2f70', margin: '0 0 4px' },
  cardSubtitle: { fontSize: 13, color: '#858796', margin: '0 0 6px' },
  cardDesc: { fontSize: 13, color: '#5a5c69', margin: '0 0 10px' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  tag: { padding: '3px 10px', backgroundColor: '#f0f2ff', color: '#1f2f70', borderRadius: 20, fontSize: 11, fontWeight: 500 },
};

export default Search;