import React from 'react';
import styles from './ResumePage.module.css';
import { useNavigate } from 'react-router-dom';

export default function ResumePage() {
  const navigate = useNavigate();
  const summaryData = JSON.parse(localStorage.getItem('lastSummary') || '{}');

  const handleHistory = () => navigate('/history');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button} onClick={handleHistory}>Historique</button>
        <button className={styles.button} onClick={handleLogout}>Déconnexion</button>
      </div>
      <div className={styles.center}>
        <div className={styles.card}>
          <h2 className={styles.title}>Résumé du document <span className={styles.highlight}>PDF</span></h2>
          <div className={styles.scroll}>
            <p className={styles.text}>
              {summaryData.globalSummary || summaryData.summaries?.join('\n\n') || "Aucun résumé disponible."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}