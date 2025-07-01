import React from 'react';
import styles from './MenuPage.module.css';
import { FaCloudUploadAlt, FaRegCommentDots } from 'react-icons/fa';

export default function MenuPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>Menu</span>
        <div className={styles.topBarButtons}>
          <button className={styles.button}>Historique</button>
          <button className={styles.button}>Se déconnecter</button>
        </div>
      </div>
      <div className={styles.centerContent}>
        <FaRegCommentDots className={styles.commentIcon} />
        <div className={styles.mainText}>Partagez moi un document à traiter ...</div>
        <div className={styles.uploadCard}>
          <FaCloudUploadAlt className={styles.uploadIcon} />
          <div className={styles.uploadText}>select your file or drag and drop</div>
          <div className={styles.uploadSubtext}>png, pdf, jpg, docx accepted</div>
          <label htmlFor="file-upload" className={styles.browseButton}>browse
            <input id="file-upload" type="file" className={styles.fileInput} />
          </label>
        </div>
      </div>
    </div>
  );
} 