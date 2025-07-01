import React from 'react';
import styles from './ResumePage.module.css';

export default function ResumePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button}>Historique</button>
        <button className={styles.button}>Déconnexion</button>
      </div>
      <div className={styles.center}>
        <div className={styles.card}>
          <h2 className={styles.title}>Rendu du document <span className={styles.highlight}>TEST.pdf</span></h2>
          <div className={styles.scroll}>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien. Mauris vel, mollis lorem, varius blandit, sapien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 