// src/pages/Kontakt.jsx
import React, { useState } from "react";
import "./Kontakt.css";
import profileImg from "../img/portrait.jpg"; // Falls vorhanden, sonst Fallback nutzen

function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Fehler beim Senden der Nachricht.");
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
      alert("Verbindung zum Server fehlgeschlagen.");
    }
  };
  return (
    <div className="kontakt-page">
      <div className="kontakt-wrapper">
        {/* SECTION HEADER */}
        <div className="kontakt-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">
            Lass uns <span className="gradient-text">verbinden</span>
          </h2>
          <p className="section-subtitle">
            Du möchtest ein Projekt besprechen, hast Fragen zu meinen Arbeiten
            oder suchst nach einer Zusammenarbeit? Schreib mir direkt eine
            Nachricht.
          </p>
        </div>

        {/* 2-COLUMN GRID */}
        <div className="kontakt-grid">
          {/* LINKESEITE: PROFILE & DIRECT CONTACT */}
          <div className="kontakt-info-card glass-box">
            <div className="profile-header">
              <div className="profile-circle">
                {profileImg ? (
                  <img src={profileImg} alt="Loris Pérez" />
                ) : (
                  <div className="profile-placeholder">LP</div>
                )}
              </div>
              <div className="profile-title">
                <h3>Loris Pérez</h3>
                <p>Applikationsentwickler EFZ in Ausbildung</p>
                <span className="location-tag">Bern, Schweiz</span>
              </div>
            </div>

            <div className="info-divider"></div>

            {/* Kontakt-Details */}
            <div className="contact-details-list">
              <div className="detail-item">
                <span className="detail-label">E-Mail</span>
                <a href="mailto:loris.perez@proton.me" className="detail-value">
                  loris.perez@proton.me ↗
                </a>
              </div>

              <div className="detail-item">
                <span className="detail-label">Sprachen</span>
                <span className="detail-value text-muted">
                  Deutsch (Muttersprache), Englisch (C1), Französisch,
                  Italienisch
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Socials & Code</span>
                <div className="social-links">
                  <a
                    href="https://github.com/MusicToGetCodedOn"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RECHTE SEITE: KONTAKTFORMULAR */}
          <div className="kontakt-form-card glass-box">
            <h3>Nachricht senden</h3>

            {submitted ? (
              <div className="form-success-message">
                <h4>Vielen Dank für deine Nachricht!</h4>
                <p>
                  Ich habe deine Anfrage erhalten und werde mich so schnell wie
                  möglich bei dir melden.
                </p>
                <button
                  className="btn-submit"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="kontakt-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Dein Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="deine.email@beispiel.ch"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Betreff</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Projektanfrage, Austausch, etc."
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Nachricht</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Deine Nachricht an mich..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Nachricht absenden ↗
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
