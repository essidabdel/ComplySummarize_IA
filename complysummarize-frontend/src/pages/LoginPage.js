import React from 'react';
import styles from './LoginPage.module.css';
import { FaRegCommentDots } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>Page de connexion</span>
      </div>
      <div className={styles.centerContent}>
        <div className={styles.titleRow}>
          <span className={styles.title}>Resume Generator</span>
          <FaRegCommentDots className={styles.commentIcon} />
        </div>
        <div className={styles.forms}>
          {/* Connexion */}
          <form className={styles.card}>
            <label className={styles.label}>Identifiant</label>
            <input className={styles.input} type="text" placeholder="" />
            <label className={styles.label}>Mot de passe</label>
            <input className={styles.input} type="password" placeholder="" />
            <button className={styles.button}>Se connecter</button>
          </form>
          {/* Inscription */}
          <form className={styles.card}>
            <div className={styles.signupTitle}>Pas de compte&nbsp;?</div>
            <label className={styles.label}>Identifiant</label>
            <input className={styles.input} type="text" placeholder="" />
            <label className={styles.label}>Mot de passe</label>
            <input className={styles.input} type="password" placeholder="" />
            <button className={styles.button}>Créer un compte</button>
          </form>
        </div>
      </div>
    </div>
  );
} 