import React from 'react';
import styles from './ResumePage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function ResumePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { filename, mode, content } = location.state || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Résumé du document : ${filename || 'PDF'}`, 10, 20);
    const lines = doc.splitTextToSize(content || 'Aucun résumé disponible.', 180);
    doc.text(lines, 10, 35);
    doc.save(`${filename ? filename.replace(/\.[^/.]+$/, '') : 'resume'}.pdf`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button} onClick={() => navigate('/menu')}>Menu</button>
        <button className={styles.button} onClick={() => navigate('/history')}>Historique</button>
        <button className={styles.button} onClick={handleLogout}>Déconnexion</button>
        <button className={styles.button} onClick={handleExportPDF}>Exporter en PDF</button>
      </div>
      <div className={styles.center}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            Rendu du document <span className={styles.highlight}>{filename || 'PDF'}</span>
          </h2>
          <div className={styles.scroll}>
            <p className={styles.text}>
              {content || 'Aucun résumé disponible.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 