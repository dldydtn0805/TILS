// App.tsx
import React from 'react';
// libraries
import { Routes, Route } from 'react-router-dom'; // react-router-dom
import axios from 'axios';
// pages
import Navbar from './pages/Navbar/Navbar.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import SignupPage from './pages/SignupPage/SignupPage.tsx';
import Footer from './pages/Footer/Footer.tsx';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />
      {/* Routing */}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
