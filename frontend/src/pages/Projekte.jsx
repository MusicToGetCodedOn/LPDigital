// src/pages/Projects.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Projekte.css";

const API_BASE_URL = "http://localhost:5000";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("alle"); // 'alle', 'privat', 'gibb', 'ük'
  const [selectedTag, setSelectedTag] = useState(null); // z.B. 'React', 'Docker'
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend-Daten laden
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Projekte:", err);
        setLoading(false);
      });
  }, []);

  // Alle eindeutigen Tags dynamisch aus den geladenen Projekten extrahieren
  const allTags = Array.from(
    new Set(
      projects.flatMap((p) => (p.tags ? p.tags.map((t) => t.trim()) : []))
    )
  ).sort();

  // Kombinierte Filter-Logik (Kategorie + Tag)
  const filteredProjects = projects.filter((p) => {
    // 1. Kategorie-Check
    const matchesCategory =
      categoryFilter === "alle" ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();

    // 2. Tag-Check
    const matchesTag =
      !selectedTag ||
      (p.tags && p.tags.map((t) => t.trim()).includes(selectedTag));

    return matchesCategory && matchesTag;
  });

  return (
    <div className="projects-page-container">
      <h2 className="projects-main-title">Projekte & Arbeiten</h2>
      <p className="projects-subtitle">
        Eine Übersicht meiner Software- und Infrastrukturprojekte – aus privaten Entwicklungen, GIBB-Modulen und überbetrieblichen Kursen (ÜK).
      </p>

      {/* KATEGORIE FILTER BUTTONS */}
      <div className="projects-filter-bar">
        <button
          className={`filter-btn ${categoryFilter === "alle" ? "active" : ""}`}
          onClick={() => setCategoryFilter("alle")}
        >
          Alle
        </button>
        <button
          className={`filter-btn ${categoryFilter === "privat" ? "active" : ""}`}
          onClick={() => setCategoryFilter("privat")}
        >
          Private Projekte
        </button>
        <button
          className={`filter-btn ${categoryFilter === "gibb" ? "active" : ""}`}
          onClick={() => setCategoryFilter("gibb")}
        >
          GIBB Module
        </button>
        <button
          className={`filter-btn ${categoryFilter === "ük" ? "active" : ""}`}
          onClick={() => setCategoryFilter("ük")}
        >
          ÜK Kurse
        </button>
      </div>

      {/* TAG FILTER SCHLEIFE (TECHNOLOGIE-SCHALTER) */}
      {!loading && allTags.length > 0 && (
        <div className="tag-filter-container">
          <span className="tag-filter-label">Nach Tech-Stack filtern:</span>
          <div className="tag-filter-pills">
            {allTags.map((tag, idx) => (
              <button
                key={idx}
                className={`tag-filter-pill ${selectedTag === tag ? "active" : ""}`}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? null : tag)
                }
              >
                {tag}
              </button>
            ))}
            {selectedTag && (
              <button
                className="clear-tag-btn"
                onClick={() => setSelectedTag(null)}
              >
                ✕ Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      )}

      {/* LOADING INDICATOR */}
      {loading ? (
        <div className="projects-loading">Projekte werden geladen...</div>
      ) : (
        /* PROJECT GRID */
        <div className="projects-grid">
          {filteredProjects.length === 0 ? (
            <div className="no-projects-found">
              <p>Keine Projekte für diesen Filter gefunden.</p>
              <button
                className="reset-all-filters-btn"
                onClick={() => {
                  setCategoryFilter("alle");
                  setSelectedTag(null);
                }}
              >
                Alle Filter zurücksetzen
              </button>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
              >
                {/* BILD ALS HINTERGRUND MIT OVERLAY */}
                <div
                  className="project-card-bg"
                  style={{
                    backgroundImage: project.imageUrl
                      ? `url(${API_BASE_URL}${project.imageUrl})`
                      : "none",
                  }}
                />
                <div className="project-card-overlay" />

                {/* CARD INHALT */}
                <div className="project-card-content">
                  <div className="card-top-row">
                    <span
                      className={`category-badge badge-${project.category.toLowerCase()}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-short-desc">{project.shortDesc}</p>

                  {/* TAGS (Beim Klick auf ein Tag auf der Karte kann man direkt filtern!) */}
                  <div className="project-tags">
                    {project.tags &&
                      project.tags.map((tag, idx) => {
                        const trimmedTag = tag.trim();
                        return (
                          <span
                            key={idx}
                            className={`tag-pill ${selectedTag === trimmedTag ? "highlighted" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation(); // Verhindert das Öffnen des Modals
                              setSelectedTag(
                                selectedTag === trimmedTag ? null : trimmedTag
                              );
                            }}
                          >
                            {trimmedTag}
                          </span>
                        );
                      })}
                  </div>

                  <button className="details-btn">Details & Abstract</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* DETAIL MODAL VIA PORTAL */}
      {selectedProject &&
        createPortal(
          <div
            className="preview-modal-overlay"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="preview-modal-container project-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="modal-header">
                <span className="modal-title">{selectedProject.title}</span>
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="modal-body project-detail-body">
                {/* HERO BILD IN DER DETAILANSICHT */}
                {selectedProject.imageUrl && (
                  <div className="detail-hero-image-wrapper">
                    <img
                      src={`${API_BASE_URL}${selectedProject.imageUrl}`}
                      alt={selectedProject.title}
                      className="detail-hero-image"
                    />
                  </div>
                )}

                {/* KATEGORIE & TAGS */}
                <div className="detail-meta-row">
                  <span
                    className={`category-badge badge-${selectedProject.category.toLowerCase()}`}
                  >
                    {selectedProject.category}
                  </span>
                  <div className="project-tags">
                    {selectedProject.tags &&
                      selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className="tag-pill">
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                </div>

                {/* ABSTRACT SEKTIONEN */}
                <div className="abstract-container">
                  <div className="abstract-section">
                    <h4>Ausgangslage & Problemstellung</h4>
                    <p>{selectedProject.abstract?.problem}</p>
                  </div>

                  <div className="abstract-section">
                    <h4>Umsetzung & Architektur</h4>
                    <p>{selectedProject.abstract?.solution}</p>
                  </div>

                  <div className="abstract-section">
                    <h4>Ergebnis & Resultat</h4>
                    <p>{selectedProject.abstract?.result}</p>
                  </div>
                </div>

                {/* LINKS (GITHUB & LIVE) */}
                <div className="detail-links-row">
                  {selectedProject.links?.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn github-btn"
                    >
                      GitHub Repository
                    </a>
                  )}
                  {selectedProject.links?.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn live-btn"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Projects;