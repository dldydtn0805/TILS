// App.tsx
import React from 'react';
// libraries
import { Routes, Route } from 'react-router-dom'; // react-router-dom
// pages
import Navbar from './components/views/Navbar/Navbar.tsx';
import LandingPage from './components/views/LandingPage/LandingPage.tsx';
import LoginPage from './components/views/LoginPage/LoginPage.tsx';
import RegisterPage from './components/views/RegisterPage/RegisterPage.tsx';
import Footer from './components/views/Footer/Footer.tsx';

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
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
