import React from 'react';
import styles from './HistoryPage.module.css';

export default function HistoryPage() {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Résumé PDF</h2>
        <ul className={styles.docList}>
          <li className={styles.docItem}>Document_1.pdf</li>
          <li className={styles.docItem}>Document_2.pdf</li>
          <li className={styles.docItem}>Document_3.pdf</li>
        </ul>
      </div>
      {/* Main content */}
      <div className={styles.main}>
        <div className={styles.header}>
          <button className={styles.button}>Menu</button>
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
    </div>
  );
} 