import React, { useState, useEffect } from 'react';
import styles from './HistoryPage.module.css';
import { FaBars, FaSearch, FaRegCommentDots } from 'react-icons/fa';
import { getSummaries } from '../api';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [summaries, setSummaries] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      const token = localStorage.getItem('token');
      const res = await getSummaries(token);
      setSummaries(Array.isArray(res) ? res : []);
    };
    fetchSummaries();
  }, []);

  const filtered = summaries.filter(s =>
    s.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenu = () => navigate('/menu');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>Historique</span>
      </div>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.searchBar}>
            <FaBars className={styles.menuIcon} />
            <input
              className={styles.searchInput}
              placeholder="Recherche"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <div className={styles.docList}>
            {filtered.map((doc, idx) => (
              <div
                key={doc._id}
                className={idx === selectedIdx ? styles.docItemSelected : styles.docItem}
                onClick={() => setSelectedIdx(idx)}
              >
                <span className={styles.docName}>Résumé {filtered.length - idx}</span>
                <span className={styles.docDate}>{new Date(doc.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Main content */}
        <div className={styles.main}>
          <div className={styles.header}>
            <button className={styles.button} onClick={handleMenu}>Menu</button>
            <button className={styles.button} onClick={handleLogout}>Se déconnecter</button>
          </div>
          <div className={styles.centerContent}>
            <div className={styles.iconTitleRow}>
              <FaRegCommentDots className={styles.commentIcon} />
            </div>
            <h2 className={styles.title}>
              Résumé sauvegardé <span className={styles.highlight}>n°{filtered.length - selectedIdx}</span>
            </h2>
            <div className={styles.summaryCard}>
              <div className={styles.scrollableSummary}>
                <p className={styles.text}>
                  {filtered[selectedIdx]?.content || "Aucun résumé sélectionné."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}