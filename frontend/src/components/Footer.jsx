import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom"; // Falls du react-router nutzt
import github from "../icons/github.png"; // Beispiel für ein GitHub-Icon, falls du eins hast
import "./Footer.css";
const commitHash = import.meta.env.VITE_GIT_COMMIT_HASH;
const shortHash = commitHash ? commitHash.substring(0, 7) : "dev";


function Footer() {
  const [showImpressum, setShowImpressum] = useState(false);

  const currentUrl = `${window.location.protocol}//${window.location.host}`;

  const toggleImpressum = () => {
    setShowImpressum(!showImpressum);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* SPALTE 1: BRANDING & COPYRIGHT */}
        <div className="footer-col footer-brand">
          <span className="footer-logo">&lt;/&gt; LPDigital</span>
          <p className="footer-copy">
            © {new Date().getFullYear()} Loris Pérez.
            <br />
            Alle Rechte vorbehalten.
          </p>
          <br />
          <div className="version-tag">
          <span>Version: </span>
          <a 
            href={`https://github.com/musictogetcodedon/LPDigital/commit/${commitHash}`}
            target="_blank" 
            rel="noopener noreferrer"
            title="View Commit on GitHub"
          >
            {shortHash}
          </a>
        </div>
        </div>

        {/* SPALTE 2: SCHNELL-NAVIGATION */}
        <div className="footer-col footer-links">
          <span className="footer-col-title">Navigation</span>
          <div className="footer-link-group">
            <Link to="/" className="footer-nav-link">Home</Link>
            <Link to="/about" className="footer-nav-link">Über mich</Link>
            <Link to="/projects" className="footer-nav-link">Projekte</Link>
            <Link to="/documents" className="footer-nav-link">Dokumente</Link>
          </div>
        </div>

        {/* SPALTE 2: SCHNELL-NAVIGATION */}
        <div className="footer-col footer-socials">
          <span className="footer-col-title">Links & Rechtliches</span>
          <div className="footer-link-group">
            <a
              href="https://github.com/MusicToGetCodedOn"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link footer-social-link"
            >
              <img src={github} alt="GitHub" className="footer-icon" />
              <span>GitHub ↗</span>
            </a>
            <button className="footer-link-btn" onClick={toggleImpressum}>
              Impressum
            </button>
          </div>
        </div>
      </div>

      {/* IMPRESSUM MODAL */}
      {showImpressum &&
        createPortal(
          <div className="modal-overlay" onClick={toggleImpressum}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Impressum</h3>
                <button className="modal-close-btn" onClick={toggleImpressum}>
                  ✕
                </button>
              </div>
              <div className="modal-body impressum-text">
                <h4>Angaben gemäss Schweizer Recht</h4>
                <p>
                  <strong>Betreiber der Website:</strong>
                  <br />
                  Loris Pérez
                  <br />
                  Hinterkappelen, Bern
                </p>

                <h4>Kontakt:</h4>
                <p>
                  E-Mail: loris.perez@proton.me
                  <br />
                  Website:{" "}
                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="impressum-link"
                  >
                    {currentUrl}
                  </a>
                </p>

                <h4>Haftungsausschluss:</h4>
                <p>
                  Der Autor übernimmt keinerlei Gewähr hinsichtlich der
                  inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
                  Zuverlässigkeit und Vollständigkeit der Informationen.
                </p>

                <h4>Urheberrechte:</h4>
                <p>
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern,
                  Fotos oder anderen Dateien auf dieser Website gehören
                  ausschliesslich Loris Pérez oder den speziell genannten
                  Rechtsinhabern.
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </footer>
  );
}

export default Footer;
