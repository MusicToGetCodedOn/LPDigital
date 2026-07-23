// src/components/Footer.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Footer.css";

function Footer() {
  const [showImpressum, setShowImpressum] = useState(false);

  const currentUrl = `${window.location.protocol}//${window.location.host}`;

  const toggleImpressum = () => {
    setShowImpressum(!showImpressum);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content glass-box">
        <div className="footer-left">
          <span className="footer-logo">&lt;/&gt; LPDigital</span>
          <p className="footer-copy">
            © {new Date().getFullYear()} Loris Pérez. Alle Rechte vorbehalten.
          </p>
        </div>

        <div className="footer-right">
          <button className="footer-link-btn" onClick={toggleImpressum}>
            Impressum
          </button>
        </div>
      </div>

      {/* IMPRESSUM MODAL */}
      {showImpressum &&
        createPortal(
          <div className="modal-overlay" onClick={toggleImpressum}>
            <div className="modal-container glass-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Impressum</h3>
                <button className="modal-close-btn" onClick={toggleImpressum}>
                  ✕
                </button>
              </div>
              <div className="modal-body impressum-text">
                <h4>Angaben gemäß Schweizer Recht</h4>
                <p>
                  <strong>Betreiber der Website:</strong><br />
                  Loris Pérez<br />
                  Hinterkappelen, Schweiz
                </p>

                <h4>Kontakt:</h4>
                <p>
                  E-Mail: loris.perez@proton.me<br />
                  Website: <a href={currentUrl} target="_blank" rel="noreferrer" className="impressum-link">{currentUrl}</a>
                </p>

                <h4>Haftungsausschluss:</h4>
                <p>
                  Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit,
                  Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
                </p>

                <h4>Urheberrechte:</h4>
                <p>
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien
                  auf dieser Website gehören ausschließlich Loris Pérez oder den speziell genannten Rechtsinhabern.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </footer>
  );
}

export default Footer;