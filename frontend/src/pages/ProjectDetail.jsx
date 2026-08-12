import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Projekt nicht gefunden");
        return res.json();
      })
      .then((data) => {
        let formattedTags = [];
        if (typeof data.tags === "string") {
          formattedTags = data.tags.split(",").map((t) => t.trim());
        } else if (Array.isArray(data.tags)) {
          formattedTags = data.tags;
        }

        const initialSituation = data.initialSituation || data.abstract?.initialSituation || data.problem;
        const implementation = data.implementation || data.abstract?.implementation || data.solution;
        const results = data.results || data.abstract?.results || data.result;
        const learnings = data.learnings || data.abstract?.learnings;
        const technologies = data.technologies || (Array.isArray(data.abstract?.technologies) ? data.abstract.technologies.join(", ") : data.abstract?.technologies);
        const description = data.description || data.shortDesc;

        setProject({
          ...data,
          description,
          initialSituation,
          technologies,
          implementation,
          results,
          learnings,
          tags: formattedTags,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Projekt-Abstract wird geladen...</div>;
  }

  if (!project) {
    return (
      <div className="detail-error">
        <h2>Projekt nicht gefunden</h2>
        <button className="back-btn" onClick={() => navigate("/projects")}>
          ← Zurück zur Übersicht
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* TOP NAVIGATION */}
      <nav className="detail-nav">
        <button className="back-btn" onClick={() => navigate("/projects")}>
          ← Zurück zur Übersicht
        </button>
      </nav>

      {/* PAPER CONTAINER (2-Spalten Word Layout) */}
      <main className="abstract-paper">
        {/* HEADER SECTION (Volle Breite) */}
        <header className="paper-header">
          <h1 className="paper-title">{project.title}</h1>
          <p className="paper-description">{project.description}</p>
        </header>

        {/* 2-SPALTEN GRID */}
        <div className="paper-grid">
          {/* LINKE SPALTE */}
          <div className="paper-column">
            {project.initialSituation && (
              <section className="paper-section">
                <h2>Ausgangslage/Aufgabenstellung</h2>
                <p>{project.initialSituation}</p>
              </section>
            )}

            {project.technologies && (
              <section className="paper-section">
                <h2>Verwendete Technologien</h2>
                <p>{project.technologies}</p>
              </section>
            )}

            {project.implementation && (
              <section className="paper-section">
                <h2>Umsetzung/Herausforderungen</h2>
                <p>{project.implementation}</p>
              </section>
            )}
          </div>

          {/* RECHTE SPALTE */}
          <div className="paper-column">
            {project.results && (
              <section className="paper-section">
                <h2>Ergebnisse und Erfolge</h2>
                <p>{project.results}</p>
              </section>
            )}

            {project.learnings && (
              <section className="paper-section">
                <h2>Erkenntnisse/Lernerfahrung</h2>
                <p>{project.learnings}</p>
              </section>
            )}

            <section className="paper-section">
              <h2>Referenzen und Links</h2>
              <p className="section-subtext">
                Links zu relevanten Dokumentationen, Repositories oder Live-Demos für eine tiefere Analyse des Projekts.
              </p>

              {/* DOWNLOAD & REPO BUTTONS IN EINER REIHE */}
              <div className="paper-links">
                {project.documentUrl && (
                  <a
                    href={`${API_BASE_URL}${project.documentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paper-btn download-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Abstract (PDF)
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="paper-btn github-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub Repository
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paper-btn live-btn"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* UNTEN: BILD / VISUALISIERUNG MIT UNTERTITEL */}
        {project.imageUrl && (
          <div className="paper-visual">
            <div className="visual-wrapper">
              <img src={`${API_BASE_URL}${project.imageUrl}`} alt={project.title} />
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectDetail;