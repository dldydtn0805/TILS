// App.tsx
import React from 'react';
// libraries
import { Routes, Route } from 'react-router-dom'; // react-router-dom
import axios from 'axios';
// pages
import Navbar from './pages/Navbar/Navbar.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import Footer from './pages/Footer/Footer.tsx';

// css
import './App.css';

function App() {
  // 로그인 페이지로 이동 전 현재 경로를 세션에 저장
  const handleLoginRedirect = () => {
    sessionStorage.setItem('previousUrl', window.location.pathname);
  };
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />
      {/* Routing */}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
