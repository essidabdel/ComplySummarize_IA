import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import LoadingPage from './pages/LoadingPage';
import ResumePage from './pages/ResumePage';
import HistoryPage from './pages/HistoryPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default App;
