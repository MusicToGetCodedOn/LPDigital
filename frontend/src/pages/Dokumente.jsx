// src/pages/Documents.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Documents.css";

// Backend Basis-URL
const API_BASE_URL = "http://localhost:5000";

function Documents() {
  const [previewUrl, setPreviewUrl] = useState(null);

  // Download-Funktion via Backend
  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/documents/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Öffnet den PDF-Viewer im Modal
  const handlePreview = (fileName) => {
    setPreviewUrl(`${API_BASE_URL}/documents/${fileName}`);
  };

  // Schliesst das Modal
  const closePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="documents-page-container">
      <h2 className="documents-main-title">Dokumente & Zertifikate</h2>
      <p className="documents-subtitle">
        Hier findest du meine Bewerbungsunterlagen, schulischen Zeugnisse sowie Bestätigungen aus meinen Praxistrainings und überbetrieblichen Kursen (ÜK).
      </p>

      <div className="documents-grid">
        
        {/* KATEGORIE 1: BEWERBUNG & LEBENSLAUF */}
        <div className="documents-card glass-box">
          <h3>Persönliche Dokumente</h3>
          <p className="card-desc">Aktuelle Lebensläufe und Bewerbungsdokumente für deine Einsicht.</p>
          
          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Lebenslauf</span>
                <span className="doc-meta">PDF • Deutsch</span>
              </div>
              <div className="button-group-split">
                <button className="preview-btn" onClick={() => handlePreview("Lebenslauf_Pérez_Loris.pdf")}>
                  Vorschau
                </button>
                <button className="download-btn-small primary-gradient" onClick={() => handleDownload("Lebenslauf_Pérez_Loris.pdf")}>
                  Download
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* KATEGORIE 2: SCHULZEUGNISSE */}
        <div className="documents-card glass-box">
          <h3>Schule & Noten</h3>
          <p className="card-desc">Offizielle Zeugnisse und Leistungsnachweise meiner Ausbildungsstätten.</p>
          
          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Zeugnis BWD IM24A</span>
                <span className="doc-meta">PDF • Semesterzeugnis bwd Bern</span>
              </div>
              <div className="button-group-split">
                <button className="preview-btn" onClick={() => handlePreview("Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf")}>
                  Vorschau
                </button>
                <button className="download-btn-small primary-gradient" onClick={() => handleDownload("Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf")}>
                  Download
                </button>
              </div>
            </li>
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Zeugnis GIBB IM24A</span>
                <span className="doc-meta">PDF • Modulnoten Berufsschule</span>
              </div>
              <div className="button-group-split">
                <button className="preview-btn" onClick={() => handlePreview("Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf")}>
                  Vorschau
                </button>
                <button className="download-btn-small primary-gradient" onClick={() => handleDownload("Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf")}>
                  Download
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* KATEGORIE 3: ÜK & PRAXISTRAINING */}
        <div className="documents-card glass-box">
          <h3>Kurse & Praxistraining</h3>
          <p className="card-desc">Bestätigungen überbetrieblicher Kurse (ÜK) und praktische Module.</p>
          
          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Kursbestätigung Praxistraining</span>
                <span className="doc-meta">PDF • Praktisches Modul</span>
              </div>
              <div className="button-group-split">
                <button className="preview-btn" onClick={() => handlePreview("Kursbestätigung_Praxistraining_Pérez_Loris.pdf")}>
                  Vorschau
                </button>
                <button className="download-btn-small primary-gradient" onClick={() => handleDownload("Kursbestätigung_Praxistraining_Pérez_Loris.pdf")}>
                  Download
                </button>
              </div>
            </li>
            
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">ÜK KNW 106 / 187</span>
                <span className="doc-meta">PDF • Kompetenznachweise</span>
              </div>
              <div className="button-grid-quad">
                <button className="preview-btn-tiny" onClick={() => handlePreview("KNW106_Pérez_Loris.pdf")}>
                  106 Vorschau
                </button>
                <button className="download-btn-small" onClick={() => handleDownload("KNW106_Pérez_Loris.pdf")}>
                  106 Download
                </button>
                <button className="preview-btn-tiny" onClick={() => handlePreview("KNW187_bwd_Pérez_Loris.pdf")}>
                  187 Vorschau
                </button>
                <button className="download-btn-small" onClick={() => handleDownload("KNW187_bwd_Pérez_Loris.pdf")}>
                  187 Download
                </button>
              </div>
            </li>

            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">ÜK KNW 210 / 294 / 295 / 335</span>
                <span className="doc-meta">PDF • Kompetenznachweise</span>
              </div>
              <div className="button-grid-six">
                <button className="preview-btn-tiny" onClick={() => handlePreview("KNW210_Pérez_Loris.pdf")}>
                  210 Box
                </button>
                <button className="download-btn-small" onClick={() => handleDownload("KNW210_Pérez_Loris.pdf")}>
                  210 Down
                </button>
                <button className="preview-btn-tiny" onClick={() => handlePreview("KNW294_Pérez_Loris.pdf")}>
                  294 Box
                </button>
                <button className="download-btn-small" onClick={() => handleDownload("KNW294_Pérez_Loris.pdf")}>
                  294 Down
                </button>
                <button className="preview-btn-tiny" onClick={() => handlePreview("KNW295_Pérez_Loris.pdf")}>
                  295 Box
                </button>
                <button className="download-btn-small" onClick={() => handleDownload("KNW295_Pérez_Loris.pdf")}>
                  295 Down
                </button>
                <button className="preview-btn-tiny" onClick={() => handlePreview("KNW335_Pérez_Loris.pdf")}>
                  335 Box
                </button>
                <button className="download-btn-small" onClick={() => handleDownload("KNW335_Pérez_Loris.pdf")}>
                  335 Down
                </button>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* PORTAL: Das Modal wird direkt am Ende des <body> gerendert */}
      {previewUrl && createPortal(
        <div className="preview-modal-overlay" onClick={closePreview}>
          <div className="preview-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Dokumenten-Vorschau</span>
              <button className="modal-close-btn" onClick={closePreview}>✕</button>
            </div>
            <div className="modal-body">
              <iframe 
                src={`${previewUrl}#toolbar=0`} 
                width="100%" 
                height="100%" 
                title="PDF Preview"
                frameBorder="0"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Documents;