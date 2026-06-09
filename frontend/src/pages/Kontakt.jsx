// src/pages/Kontakt.jsx
import React from 'react';
import './Kontakt.css';
// Falls du ein Profilbild nutzt, kannst du es hier importieren:
import profileImg from '../img/portrait.jpg';

function Kontakt() {
  return (
    <div className="kontakt-container">
      <h2 className="kontakt-title">Kontakt</h2>
      
      {/* Das umhüllende Element, das den Hover-Effekt auslöst */}
      <div className="id-card-wrapper">
        <div className="id-card">
          
          {/* VORDERSEITE DER KARTE */}
          <div className="id-card-front">
            <div className="card-glare"></div>
            <div className="profile-circle">
              <img src={profileImg} alt="Profil" />
            </div>
            <div className="front-info">
                <h3>Loris Pérez</h3>
              <h3>Informatiker</h3>
              <p>BWD Bern</p>
            </div>
            <div className="flip-hint">Hover mich für den Steckbrief</div>
          </div>

          {/* RÜCKSEITE DER KARTE (Steckbrief) */}
          <div className="id-card-back">
            <h3>Steckbrief</h3>
            <div className="steckbrief-divider"></div>
            
            <div className="steckbrief-grid">
              <div className="info-label">Name:</div>
              <div className="info-value">Loris Pérez</div>

              <div className="info-label">Geburtstag:</div>
              <div className="info-value">16.12.2005</div>

              <div className="info-label">Sprachen:</div>
              <div className="info-value">DE, EN (C1), FR, IT</div>

              <div className="info-label">E-Mail:</div>
              <div className="info-value">
                <a href="mailto:loris.perez@proton.me">E-Mail senden</a>
              </div>

              <div className="info-label">Telefon:</div>
              <div className="info-value">+41 78 307 23 90</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Kontakt;