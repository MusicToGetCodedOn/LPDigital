import React, { useState } from "react";
import { createPortal } from "react-dom";
import JSZip from "jszip";
import "./Documents.css";

// Backend Basis-URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Documents() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hilfsfunktion: Lädt das PDF geschützt per Fetch mit JWT-Token
  const fetchProtectedDocument = async (fileName) => {
    const token = localStorage.getItem("portfolio_token"); // Oder wo du dein JWT speicherst

    const response = await fetch(
      `${API_BASE_URL}/api/documents/download/${encodeURIComponent(fileName)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Du musst eingeloggt sein, um dieses Dokument einzusehen.",
        );
      }
      throw new Error("Fehler beim Laden des Dokuments.");
    }

    // Antwort in ein Blob-Objekt umwandeln
    const blob = await response.blob();
    // Temporäre Browser-URL erzeugen
    return URL.createObjectURL(blob);
  };

  // Download-Funktion via geschützte API
  const handleDownload = async (fileName) => {
    try {
      setIsLoading(true);
      const objectUrl = await fetchProtectedDocument(fileName);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Speicher freigeben
      setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Öffnet den PDF-Viewer im Modal via geschützte API
  const handlePreview = async (fileName) => {
    try {
      setIsLoading(true);
      const objectUrl = await fetchProtectedDocument(fileName);
      setPreviewUrl(objectUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Schliesst das Modal und räumt den Speicher auf
  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Speicher bereinigen
    }
    setPreviewUrl(null);
  };

  // Alle Dokumente als ZIP herunterladen
  const handleDownloadAllZip = async () => {
    try {
      setIsLoading(true);
      const zip = new JSZip();
      const token = localStorage.getItem("portfolio_token");

      // Liste aller deiner Dateien
      const filesToDownload = [
        "Lebenslauf_Pérez_Loris.pdf",
        "Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf",
        "Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf",
        "Kursbestätigung_Praxistraining_Pérez_Loris.pdf",
        "KNW106_Pérez_Loris.pdf",
        "KNW187_bwd_Pérez_Loris.pdf",
        "KNW210_Pérez_Loris.pdf",
        "KNW294_Pérez_Loris.pdf",
        "KNW295_Pérez_Loris.pdf",
        "KNW335_Pérez_Loris.pdf",
      ];

      // Jede Datei fetchen und dem ZIP hinzufügen
      for (const fileName of filesToDownload) {
        const response = await fetch(
          `${API_BASE_URL}/api/documents/download/${encodeURIComponent(fileName)}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.ok) {
          const blob = await response.blob();
          zip.file(fileName, blob); // Datei ins ZIP legen
        } else {
          console.error(`Fehler beim Laden von: ${fileName}`);
        }
      }

      // ZIP generieren und Download starten
      const zipContent = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipContent);

      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "Bewerbungsunterlagen_Loris_Perez.zip";
      document.body.appendChild(link);
      link.click();

      // Aufräumen
      document.body.removeChild(link);
      URL.revokeObjectURL(zipUrl);
    } catch (error) {
      alert("Fehler beim Erstellen der ZIP-Datei.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="documents-page-container">
      <h2 className="documents-main-title">Dokumente & Zertifikate</h2>
      <p className="documents-subtitle">
        Hier findest du meine Bewerbungsunterlagen, schulischen Zeugnisse sowie
        Bestätigungen aus meinen Praxistrainings und überbetrieblichen Kursen
        (ÜK).
      </p>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          className="download-btn-small primary-gradient"
          style={{
            padding: "12px 24px",
            fontSize: "1.1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          disabled={isLoading}
          onClick={handleDownloadAllZip}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {isLoading
            ? "ZIP wird erstellt..."
            : "Alle Dokumente als ZIP herunterladen"}
        </button>
      </div>
      <div className="documents-grid">
        {/* KATEGORIE 1: BEWERBUNG & LEBENSLAUF */}
        <div className="documents-card glass-box">
          <h3>Persönliche Dokumente</h3>
          <p className="card-desc">
            Aktuelle Lebensläufe und Bewerbungsdokumente für deine Einsicht.
          </p>

          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Lebenslauf</span>
                <span className="doc-meta">PDF • Deutsch</span>
              </div>
              <div className="button-group-split">
                <button
                  className="preview-btn"
                  disabled={isLoading}
                  onClick={() => handlePreview("Lebenslauf_Pérez_Loris.pdf")}
                >
                  Vorschau
                </button>
                <button
                  className="download-btn-small primary-gradient"
                  disabled={isLoading}
                  onClick={() => handleDownload("Lebenslauf_Pérez_Loris.pdf")}
                >
                  Download
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* KATEGORIE 2: SCHULZEUGNISSE */}
        <div className="documents-card glass-box">
          <h3>Schule & Noten</h3>
          <p className="card-desc">
            Offizielle Zeugnisse und Leistungsnachweise meiner
            Ausbildungsstätten.
          </p>

          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Zeugnis BWD IM24A</span>
                <span className="doc-meta">PDF • Semesterzeugnis bwd Bern</span>
              </div>
              <div className="button-group-split">
                <button
                  className="preview-btn"
                  disabled={isLoading}
                  onClick={() =>
                    handlePreview(
                      "Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf",
                    )
                  }
                >
                  Vorschau
                </button>
                <button
                  className="download-btn-small primary-gradient"
                  disabled={isLoading}
                  onClick={() =>
                    handleDownload(
                      "Zeugnis_bwd_IM24A_Perez_Loris_Zeugnis_Berufsmaturität.pdf",
                    )
                  }
                >
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
                <button
                  className="preview-btn"
                  disabled={isLoading}
                  onClick={() =>
                    handlePreview(
                      "Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf",
                    )
                  }
                >
                  Vorschau
                </button>
                <button
                  className="download-btn-small primary-gradient"
                  disabled={isLoading}
                  onClick={() =>
                    handleDownload(
                      "Zeugnis_gibb_IM24A_Perez_Loris_Zeugnis_Informatik.pdf",
                    )
                  }
                >
                  Download
                </button>
              </div>
            </li>
          </ul>
        </div>

        {/* KATEGORIE 3: ÜK & PRAXISTRAINING */}
        <div className="documents-card glass-box">
          <h3>Kurse & Praxistraining</h3>
          <p className="card-desc">
            Bestätigungen überbetrieblicher Kurse (ÜK) und praktische Module.
          </p>

          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-info">
                <span className="doc-name">Kursbestätigung Praxistraining</span>
                <span className="doc-meta">PDF • Praktisches Modul</span>
              </div>
              <div className="button-group-split">
                <button
                  className="preview-btn"
                  disabled={isLoading}
                  onClick={() =>
                    handlePreview(
                      "Kursbestätigung_Praxistraining_Pérez_Loris.pdf",
                    )
                  }
                >
                  Vorschau
                </button>
                <button
                  className="download-btn-small primary-gradient"
                  disabled={isLoading}
                  onClick={() =>
                    handleDownload(
                      "Kursbestätigung_Praxistraining_Pérez_Loris.pdf",
                    )
                  }
                >
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
                <button
                  className="preview-btn-tiny"
                  disabled={isLoading}
                  onClick={() => handlePreview("KNW106_Pérez_Loris.pdf")}
                >
                  106 Vorschau
                </button>
                <button
                  className="download-btn-small"
                  disabled={isLoading}
                  onClick={() => handleDownload("KNW106_Pérez_Loris.pdf")}
                >
                  106 Download
                </button>
                <button
                  className="preview-btn-tiny"
                  disabled={isLoading}
                  onClick={() => handlePreview("KNW187_bwd_Pérez_Loris.pdf")}
                >
                  187 Vorschau
                </button>
                <button
                  className="download-btn-small"
                  disabled={isLoading}
                  onClick={() => handleDownload("KNW187_bwd_Pérez_Loris.pdf")}
                >
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
                <button
                  className="preview-btn-tiny"
                  disabled={isLoading}
                  onClick={() => handlePreview("KNW210_Pérez_Loris.pdf")}
                >
                  210 Box
                </button>
                <button
                  className="download-btn-small"
                  disabled={isLoading}
                  onClick={() => handleDownload("KNW210_Pérez_Loris.pdf")}
                >
                  210 Down
                </button>
                <button
                  className="preview-btn-tiny"
                  disabled={isLoading}
                  onClick={() => handlePreview("KNW294_Pérez_Loris.pdf")}
                >
                  294 Box
                </button>
                <button
                  className="download-btn-small"
                  disabled={isLoading}
                  onClick={() => handleDownload("KNW294_Pérez_Loris.pdf")}
                >
                  294 Down
                </button>
                <button
                  className="preview-btn-tiny"
                  disabled={isLoading}
                  onClick={() => handlePreview("KNW295_Pérez_Loris.pdf")}
                >
                  295 Box
                </button>
                <button
                  className="download-btn-small"
                  disabled={isLoading}
                  onClick={() => handleDownload("KNW295_Pérez_Loris.pdf")}
                >
                  295 Down
                </button>
                <button
                  className="preview-btn-tiny"
                  disabled={isLoading}
                  onClick={() => handlePreview("KNW335_Pérez_Loris.pdf")}
                >
                  335 Box
                </button>
                <button
                  className="download-btn-small"
                  disabled={isLoading}
                  onClick={() => handleDownload("KNW335_Pérez_Loris.pdf")}
                >
                  335 Down
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* PORTAL: Das Modal wird direkt am Ende des <body> gerendert */}
      {previewUrl &&
        createPortal(
          <div className="preview-modal-overlay" onClick={closePreview}>
            <div
              className="preview-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <span className="modal-title">Dokumenten-Vorschau</span>
                <button className="modal-close-btn" onClick={closePreview}>
                  ✕
                </button>
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
          document.body,
        )}
    </div>
  );
}

export default Documents;
