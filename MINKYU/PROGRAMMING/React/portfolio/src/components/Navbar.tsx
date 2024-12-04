// 네비게이션 바
import { useState } from 'react';
// react-router-dom
import { Link } from 'react-router-dom';
// react-bootstrap
import { Container, Nav, Navbar } from 'react-bootstrap';
// Navigation Bar CSS
import '../css/Navbar.css';
// react-icons
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

function NavigationBar() {
  // const []
  return (
    <>
      <nav className="nav">
        <div className="nav-brand">MK's PortFolio</div>
        <div className="nav-icons">
          <Link to={'/'} className="nav-link">
            <FaHome />
            <span className="nav-text">HOME</span>
          </Link>
          <Link to={'/about'} className="nav-link">
            <FaUser />
            <span className="nav-text">ABOUT</span>
          </Link>
          <Link to={'/project'} className="nav-link">
            <FaProjectDiagram />
            <span className="nav-text">PROJECT</span>
          </Link>
          <Link to={'/contact'} className="nav-link">
            <FaEnvelope />
            <span className="nav-text">CONTACT</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
