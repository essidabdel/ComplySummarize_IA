import React, { useState, useEffect } from 'react';
import styles from './MenuPage.module.css';
import { FaCloudUploadAlt, FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MenuPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();
  const [showModeChoice, setShowModeChoice] = useState(false);
  const [pdfPath, setPdfPath] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    setShowCard(true);
    setTimeout(() => setShowLogo(true), 200);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadMessage('');
    setUploadError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadMessage('');
    setUploadError('');
    if (!selectedFile) {
      setUploadError('Veuillez sélectionner un fichier.');
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('pdf', selectedFile);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadMessage('Fichier uploadé avec succès !');
      setPdfPath(response.data.filename ? `uploads/${response.data.filename}` : '');
      setShowModeChoice(true);
      setSelectedFile(null);
      setTimeout(() => setUploadMessage(''), 3500);
    } catch (err) {
      setUploadError("Erreur lors de l'upload. Vérifiez le format ou la connexion.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSummarize = async (mode) => {
    setShowModeChoice(false);
    setIsSummarizing(true);
    try {
      const token = localStorage.getItem('token');
      const body = mode === 'complet'
        ? { pdfPath, mode: 'complet' }
        : { pdfPath };
      const response = await axios.post('http://localhost:5000/api/summaries', body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/resume', {
        state: {
          filename: pdfPath.split('/').pop(),
          mode,
          content: response.data.content || '',
          summaries: response.data.summaries || null
        }
      });
    } catch (err) {
      setUploadError("Erreur lors de la génération du résumé.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header flottant */}
      <div className={styles.floatingHeader}>
        <div className={styles.logoWrapper}>
          <FaRegCommentDots className={showLogo ? styles.logoAnimated : styles.logo} />
        </div>
        <div className={styles.topBarButtons}>
          <button className={styles.button} onClick={() => navigate('/history')}>Historique</button>
          <button className={styles.button} onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}>Se déconnecter</button>
        </div>
      </div>
      <div className={styles.centerContent}>
        <div className={styles.mainText}>Partagez moi un document à traiter ...</div>
        <div className={showCard ? styles.uploadCardAnimated : styles.uploadCard}>
          <FaCloudUploadAlt className={styles.uploadIcon} />
          <div className={styles.uploadText}>Sélectionnez un fichier PDF à uploader</div>
          <div className={styles.uploadSubtext}>Seuls les fichiers PDF en français sont acceptés</div>
          <form onSubmit={handleUpload}>
            <div className={styles.uploadFormButtons}>
              <label htmlFor="file-upload" className={styles.browseButton}>
                browse
                <input id="file-upload" type="file" className={styles.fileInput} onChange={handleFileChange} />
              </label>
              <button className={styles.button} type="submit" disabled={isUploading}>
                {isUploading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </div>
            {selectedFile && (
              <div className={styles.selectedFileName}>{selectedFile.name}</div>
            )}
          </form>
          {isUploading && <div className={styles.loader}></div>}
          {uploadMessage && <div className={styles.successMsg}>{uploadMessage}</div>}
          {uploadError && <div className={styles.errorMsg}>{uploadError}</div>}
          {showModeChoice && (
            <div className={styles.modeChoiceBox}>
              <div className={styles.modeChoiceTitle}>Choisissez le mode de résumé :</div>
              <div className={styles.modeChoiceButtons}>
                <button className={styles.modeButton} onClick={() => handleSummarize('rapide')}>Résumé rapide</button>
                <button className={styles.modeButton} onClick={() => handleSummarize('complet')}>Résumé complet</button>
              </div>
            </div>
          )}
          {isSummarizing && (
            <>
              <div className={styles.loader} style={{marginTop: '1.5rem'}}></div>
              <div className={styles.summarizeText}>Génération du résumé...</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 