import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

function Navbar() {
  return (
    <nav className="glass-navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-image" style={{ width: '30%', height: '100%', objectFit: 'contain' }} />
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Über mich</Link></li>
        <li><Link to="/projects">Projekte</Link></li>
        <li><Link to="/documents">Dokumente</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;