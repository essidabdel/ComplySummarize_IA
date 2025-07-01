import React from 'react';
import styles from './MenuPage.module.css';

export default function MenuPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button}>Historique</button>
        <button className={styles.button}>Déconnexion</button>
      </div>
      <div className={styles.center}>
        <p className={styles.text}>Partagez moi un document à traiter ...</p>
        <div className={styles.card}>
          <div className={styles.icon}>📄</div>
          <input type="file" className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className={styles.uploadLabel}>Sélectionner</label>
        </div>
      </div>
    </div>
  );
} 