import React from 'react';
import styles from './LoadingPage.module.css';

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button}>Historique</button>
        <button className={styles.button}>Déconnexion</button>
      </div>
      <div className={styles.center}>
        <p className={styles.text}>En cours de traitement</p>
        <div className={styles.card}>
          <div className={styles.progressBar}>
            <div className={styles.progress}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 