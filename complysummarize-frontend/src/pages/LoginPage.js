import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  // États pour le formulaire de connexion
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // États pour le formulaire d'inscription
  const [registerId, setRegisterId] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Handler pour la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginId,
        password: loginPassword
      });
      // Stocker le token JWT
      localStorage.setItem('token', response.data.token);
      // Rediriger vers la page d'accueil/menu
      navigate('/menu');
    } catch (err) {
      setLoginError('Identifiant ou mot de passe incorrect.');
    }
  };

  // Handler pour la soumission du formulaire d'inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: registerId,
        password: registerPassword
      });
      // Si le backend renvoie un token, on connecte automatiquement l'utilisateur
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/menu');
      } else {
        setRegisterSuccess('Compte créé avec succès ! Vous pouvez vous connecter.');
      }
      setRegisterId('');
      setRegisterPassword('');
    } catch (err) {
      setRegisterError('Erreur lors de la création du compte. Identifiant peut-être déjà utilisé.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.centerContent}>
        <div className={styles.titleRow}>
          <span className={styles.title}>Resume Generator</span>
          <FaRegCommentDots className={styles.commentIcon} />
        </div>
        <div className={styles.forms}>
          {/* Connexion */}
          <form className={styles.card} onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label className={styles.label} style={{ alignSelf: 'flex-start' }}>Identifiant</label>
            <input className={styles.input} type="text" value={loginId} onChange={e => setLoginId(e.target.value)} />
            <label className={styles.label} style={{ alignSelf: 'flex-start' }}>Mot de passe</label>
            <input className={styles.input} type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            <button className={styles.button} type="submit">Se connecter</button>
            {loginError && <div className={styles.error}>{loginError}</div>}
          </form>
          {/* Inscription */}
          <form className={styles.card} onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles.signupTitle} style={{ alignSelf: 'flex-start' }}>Pas de compte&nbsp;?</div>
            <label className={styles.label} style={{ alignSelf: 'flex-start' }}>Identifiant</label>
            <input className={styles.input} type="text" value={registerId} onChange={e => setRegisterId(e.target.value)} />
            <label className={styles.label} style={{ alignSelf: 'flex-start' }}>Mot de passe</label>
            <input className={styles.input} type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
            <button className={styles.button} type="submit">Créer un compte</button>
            {registerError && <div className={styles.error}>{registerError}</div>}
            {registerSuccess && <div className={styles.success}>{registerSuccess}</div>}
          </form>
        </div>
      </div>
    </div>
  );
} 