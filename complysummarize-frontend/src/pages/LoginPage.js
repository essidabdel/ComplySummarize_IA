import React from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resume Generator <span style={{color: '#E07A5F'}}>📝</span></h1>
      <div className={styles.forms}>
        {/* Connexion */}
        <form className={styles.card}>
          <label className={styles.label}>Identifiant</label>
          <input className={styles.input} type="text" placeholder="Votre identifiant" />
          <label className={styles.label}>Mot de passe</label>
          <input className={styles.input} type="password" placeholder="Votre mot de passe" />
          <button className={styles.button}>Se connecter</button>
        </form>
        {/* Inscription */}
        <form className={styles.card}>
          <label className={styles.label}>Pas de compte ?</label>
          <input className={styles.input} type="text" placeholder="Nouvel identifiant" />
          <input className={styles.input} type="password" placeholder="Nouveau mot de passe" />
          <button className={styles.button}>Créer un compte</button>
        </form>
      </div>
    </div>
  );
} 