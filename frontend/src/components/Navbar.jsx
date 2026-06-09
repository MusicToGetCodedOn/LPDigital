import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="glass-navbar">
      <div className="nav-logo">
        {/* Hier könnte später dein Logo oder dein Name stehen */}
        <span style={{ fontWeight: 'bold', color: '#fff' }}>Mein Portfolio</span>
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