import React from "react";
import { useState, useEffect } from "react";
import "./About.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function About() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/languages`)
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Sprachen:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="about-page-container">
      <h2 className="about-main-title">Über mich</h2>

      <div className="about-grid">
        {/* LINKE SPALTE: PERSÖNLICHES & SPRACHEN */}
        <div className="about-column">
          {/* Hobbys Box */}
          <div className="about-card">
            <h3>Hobbies & Interessen</h3>
            <div className="hobby-item">
              <div className="hobby-header">
                <h4>Saxophon</h4>
              </div>
              <p>
                Ich habe für 10 Jahre lang Saxophon Stunden genommen. Zeigt mein
                Durchhaltevermögen und meine kreative Ader außerhalb der IT.
              </p>
            </div>

            <div className="hobby-item">
              <div className="hobby-header">
                <h4>Sport & Bewegung</h4>
              </div>
              <p>
                Um ein wenig Abwechslung vom ganztägigen Sitzen zu bekommen,
                gehe ich regelmässig ins Gym aber wenn das Wetter es erlaubt,
                gehe ich auch gerne mal mit meinen Freunden Basketball spielen.
              </p>
            </div>

            <div className="hobby-item">
              <div className="hobby-header">
                <h4>Gaming</h4>
              </div>
              <p>
                Wenn ich mal Zeit habe und Abschalten möchte, spiele ich gerne
                verschiedene Spiele auf der PlayStation, meinem PC oder sogar in
                Virtual Reality.
              </p>
            </div>
          </div>

          {/* Sprachen Box */}
          <div className="about-card">
            <h3>Sprachkenntnisse</h3>
            {loading ? (
              <p>Sprachen werden geladen...</p>
            ) : (
              <div className="language-grid">
                {languages.map((lang) => (
                  <div key={lang.id} className="lang-entry">
                    <span className="lang-name">
                      {lang.name}{" "}
                      {lang.flagUrl && (
                        <img
                          src={`${API_BASE_URL}${lang.flagUrl}`}
                          alt={lang.name}
                          height="20"
                        />
                      )}
                    </span>
                    <span className="lang-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECHTE SPALTE: WERDEGANG (TIMELINE) */}
        <div className="about-column">
          <div className="about-card
          ">
            <h3>Ausbildung & Berufserfahrung</h3>
            <div className="timeline">
              {/* Station 1: IMS */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Seit 2023</span>
                  <h4>Informatikmittelschule (IMS)</h4>
                  <p className="timeline-sub">BWD Bern</p>
                  <p>
                    Ich habe im Jahr 2023 mit meiner Ausbildung an der
                    Informatikmittelschule (IMS) begonnen, auch wenn es ein paar
                    stolpersteine auf meinem Weg gab, kann ich trotzdem stolz
                    auf meine Fortschritte sein und sagen das ich viel gelernt
                    habe und als Person gewaschsen bin.
                  </p>
                </div>
              </div>

              {/* Station 2: Migros */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">4 Jahre</span>
                  <h4>Mitarbeiter Dienstleistung</h4>
                  <p className="timeline-sub">Genossenschaft Migros Aare</p>
                  <p>
                    Langjährige Erfahrung im Kundenkontakt und Servicebereich.
                    Hier habe ich meine Zuverlässigkeit und Teamfähigkeit im
                    kaufmännischen Umfeld gefestigt.
                  </p>
                </div>
              </div>

              {/* Station 3: Gastro */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">1 Jahr</span>
                  <h4>Service-Mitarbeiter / Kellner</h4>
                  <p className="timeline-sub">Ristorante Lago</p>
                  <p>
                    Arbeiten in einem dynamischen, stressigen Umfeld. Perfektes
                    Training für Belastbarkeit, Multitasking und
                    serviceorientierte Kommunikation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
