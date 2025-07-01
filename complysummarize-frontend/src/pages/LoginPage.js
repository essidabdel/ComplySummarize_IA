import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { FaRegCommentDots } from 'react-icons/fa';
import { login, register } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(loginEmail, loginPass);
    if (res.token) {
      localStorage.setItem('token', res.token);
      toast.success("Connexion réussie !");
      navigate('/menu');
    } else {
      setError(res.message || "Erreur de connexion");
      toast.error(res.message || "Erreur de connexion");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(registerEmail, registerPass);
    if (res.message === "Inscription réussie") {
      const loginRes = await login(registerEmail, registerPass);
      if (loginRes.token) {
        localStorage.setItem('token', loginRes.token);
        toast.success("Inscription et connexion réussies !");
        navigate('/menu');
      }
    } else {
      setError(res.message || "Erreur d'inscription");
      toast.error(res.message || "Erreur d'inscription");
    }
  };

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
        {error && <div style={{ color: "#E07A5F", marginBottom: 16 }}>{error}</div>}
        <div className={styles.forms}>
          {/* Connexion */}
          <form className={styles.card} onSubmit={handleLogin}>
            <label className={styles.label}>Identifiant</label>
            <input className={styles.input} type="text" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            <label className={styles.label}>Mot de passe</label>
            <input className={styles.input} type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
            <button className={styles.button} type="submit">Se connecter</button>
          </form>
          {/* Inscription */}
          <form className={styles.card} onSubmit={handleRegister}>
            <div className={styles.signupTitle}>Pas de compte&nbsp;?</div>
            <label className={styles.label}>Identifiant</label>
            <input className={styles.input} type="text" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
            <label className={styles.label}>Mot de passe</label>
            <input className={styles.input} type="password" value={registerPass} onChange={e => setRegisterPass(e.target.value)} />
            <button className={styles.button} type="submit">Créer un compte</button>
          </form>
        </div>
      </div>
    </div>
  );
}