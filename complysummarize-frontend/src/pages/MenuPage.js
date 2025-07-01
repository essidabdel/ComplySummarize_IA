import React, { useState } from 'react';
import styles from './MenuPage.module.css';
import { FaCloudUploadAlt, FaRegCommentDots } from 'react-icons/fa';
import { uploadPdf, createSummary } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MenuPage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const uploadRes = await uploadPdf(file, token);
      if (!uploadRes.filename) {
        setError(uploadRes.message || "Erreur upload");
        toast.error(uploadRes.message || "Erreur upload");
        setUploading(false);
        return;
      }
      toast.success("PDF téléchargé avec succès !");
      navigate('/loading');
      const summaryRes = await createSummary(`uploads/${uploadRes.filename}`, token);
      localStorage.setItem('lastSummary', JSON.stringify(summaryRes));
      setUploading(false);
      navigate('/resume');
    } catch (err) {
      setError("Erreur lors de l'envoi");
      toast.error("Erreur lors de l'envoi");
      setUploading(false);
    }
  };

  const handleHistory = () => navigate('/history');
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info("Déconnexion réussie");
    navigate('/');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>Menu</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <button className={styles.button} onClick={handleHistory}>Historique</button>
          <button className={styles.button} onClick={handleLogout}>Se déconnecter</button>
        </div>
      </div>
      <div className={styles.centerContent}>
        <FaRegCommentDots className={styles.commentIcon} />
        <div className={styles.mainText}>Partagez moi un document à traiter ...</div>
        <div className={styles.uploadCard}>
          <FaCloudUploadAlt className={styles.uploadIcon} />
          <div className={styles.uploadText}>select your file or drag and drop</div>
          <div className={styles.uploadSubtext}>png, pdf, jpg, docx accepted</div>
          {error && <div style={{ color: "#E07A5F", marginBottom: 8 }}>{error}</div>}
          <label htmlFor="file-upload" className={styles.browseButton}>
            {uploading ? "Envoi..." : "browse"}
            <input id="file-upload" type="file" className={styles.fileInput} onChange={handleFileChange} disabled={uploading} />
          </label>
        </div>
      </div>
    </div>
  );
}