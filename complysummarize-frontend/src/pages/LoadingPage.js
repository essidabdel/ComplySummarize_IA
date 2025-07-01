import React from 'react';
import styles from './LoadingPage.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoadingPage() {
  const navigate = useNavigate();

  const handleHistory = () => navigate('/history');
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info("Déconnexion réussie");
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button} onClick={handleHistory}>Historique</button>
        <button className={styles.button} onClick={handleLogout}>Déconnexion</button>
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