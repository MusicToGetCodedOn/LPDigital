// src/components/home/CallToAction.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CallToAction.css";

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-container glass-box">
        
        {/* Background Glow Effect */}
        <div className="cta-glow"></div>

        <div className="cta-content">
          <span className="section-badge">Kontakt & Austausch</span>
          <h2 className="cta-title">
            Lassen Sie uns ins <span>Gespräch</span> kommen
          </h2>
          <p className="cta-subtitle">
            Sie haben Fragen zu meinen Projekten, oder möchten mehr über meinen beruflichen 
            Werdegang erfahren oder sehen eine spannende Einsatzmöglichkeit? 
            Ich freue mich über jede Nachricht.
          </p>

          <div className="cta-actions">
            <Link to="/contact" className="cta-btn cta-btn-primary">
              Nachricht senden
            </Link>
            <a 
              href="https://github.com/MusicToGetCodedOn" 
              target="_blank" 
              rel="noreferrer"
              className="cta-btn cta-btn-secondary"
            >
              GitHub Profil
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CallToAction;