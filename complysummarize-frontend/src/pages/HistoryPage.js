import React, { useState, useEffect } from 'react';
import styles from './HistoryPage.module.css';
import { FaBars, FaSearch, FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [summaries, setSummaries] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/summaries', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSummaries(res.data);
      } catch (err) {
        setError("Erreur lors de la récupération des résumés.");
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, []);

 
  const filteredSummaries = summaries.filter(s =>
    s.filename && s.filename.toLowerCase().includes(search.toLowerCase())
  );

  const selectedSummary = filteredSummaries[selectedIdx] || null;

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.searchBar}>
            <FaBars className={styles.menuIcon} />
            <input
              className={styles.searchInput}
              placeholder="Recherche de document"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <div className={styles.docList}>
            {loading ? (
              <div className={styles.docItem}>Chargement...</div>
            ) : error ? (
              <div className={styles.docItem}>{error}</div>
            ) : filteredSummaries.length === 0 ? (
              <div className={styles.docItem}>Aucun résumé trouvé</div>
            ) : (
              filteredSummaries.map((doc, idx) => (
                <div
                  key={doc._id || idx}
                  className={idx === selectedIdx ? styles.docItemSelected : styles.docItem}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <span className={styles.docName}>{doc.filename || 'Document'}</span>
                  <span className={styles.docDate}>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : ''}</span>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Main content */}
        <div className={styles.main}>
          <div className={styles.header}>
            <button className={styles.button} onClick={() => navigate('/menu')}>Menu</button>
            <button className={styles.button} onClick={handleLogout}>Se déconnecter</button>
          </div>
          <div className={styles.centerContent}>
            <div className={styles.iconTitleRow}>
              <FaRegCommentDots className={styles.commentIcon} />
            </div>
            {selectedSummary ? (
              <>
                <h2 className={styles.title}>
                  Rendu du document <span className={styles.highlight}>{selectedSummary.filename}</span>
                </h2>
                <div className={styles.summaryCard}>
                  <div className={styles.scrollableSummary}>
                    <p className={styles.text}>
                      {selectedSummary.content || 'Aucun résumé disponible.'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.title}>Aucun résumé sélectionné</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 