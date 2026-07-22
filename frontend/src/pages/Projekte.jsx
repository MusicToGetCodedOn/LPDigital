// src/pages/Projects.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Projekte.css";

const API_BASE_URL = "http://localhost:5000";

// Farbschema für spezifische Tech-Stack Tags (wird NUR angewendet, wenn aktiv/ausgewählt!)
const TAG_COLORS = {
  mongodb: { bg: "rgba(16, 185, 129, 0.25)", border: "#10b981", text: "#6ee7b7" }, // Grün
  react: { bg: "rgba(14, 165, 233, 0.25)", border: "#0ea5e9", text: "#7dd3fc" }, // Hellblau
  "react native": { bg: "rgba(14, 165, 233, 0.25)", border: "#0ea5e9", text: "#7dd3fc" },
  docker: { bg: "rgba(2, 132, 199, 0.25)", border: "#0284c7", text: "#38bdf8" }, // Docker Blau
  "docker-compose": { bg: "rgba(2, 132, 199, 0.25)", border: "#0284c7", text: "#38bdf8" },
  opentofu: { bg: "rgba(249, 115, 22, 0.25)", border: "#f97316", text: "#ffedd5" }, // Orange
  terraform: { bg: "rgba(168, 85, 247, 0.25)", border: "#a855f7", text: "#e9d5ff" }, // Violett
  javascript: { bg: "rgba(234, 179, 8, 0.25)", border: "#eab308", text: "#fef08a" }, // Gelb
  typescript: { bg: "rgba(59, 130, 246, 0.25)", border: "#3b82f6", text: "#93c5fd" }, // Blau
  "node.js": { bg: "rgba(34, 197, 94, 0.25)", border: "#22c55e", text: "#86efac" }, // Node Grün
  python: { bg: "rgba(234, 179, 8, 0.25)", border: "#3b82f6", text: "#fde047" }, // Gelb/Blau
  csharp: { bg: "rgba(168, 85, 247, 0.25)", border: "#9333ea", text: "#f3e8ff" }, // Lila
  ".net maui": { bg: "rgba(147, 51, 234, 0.25)", border: "#a855f7", text: "#f3e8ff" },
  java: { bg: "rgba(239, 68, 68, 0.25)", border: "#ef4444", text: "#fca5a5" }, // Rot
  api: { bg: "rgba(20, 184, 166, 0.25)", border: "#14b8a6", text: "#99f6e4" }, // Türkis
  ai: { bg: "rgba(236, 72, 153, 0.25)", border: "#ec4899", text: "#fbcfe8" }, // Pink
};

// Hilfsfunktion: Gibt die Farbe NUR zurück, wenn der Tag tatsächlich ausgewählt (isSelected) ist
const getTagStyle = (tag, isSelected = false) => {
  if (!isSelected) {
    // Inaktiv: Standardmässiger, unaufdringlicher Look
    return {
      background: "rgba(255, 255, 255, 0.04)",
      borderColor: "rgba(255, 255, 255, 0.12)",
      color: "#d4d4d8",
      boxShadow: "none"
    };
  }

  // Aktiv: Individuelle Tech-Farbe
  const normalized = tag.toLowerCase().trim();
  const config = TAG_COLORS[normalized] || {
    bg: "rgba(168, 85, 247, 0.25)",
    border: "#a855f7",
    text: "#e9d5ff",
  };

  return {
    background: config.bg,
    borderColor: config.border,
    color: config.text,
    boxShadow: `0 0 14px ${config.bg}`,
  };
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("alle");
  const [selectedTags, setSelectedTags] = useState([]); // Array für Multi-Select
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Alle eindeutigen Tags dynamisch extrahieren
  const allTags = Array.from(
    new Set(
      projects.flatMap((p) => (p.tags ? p.tags.map((t) => t.trim()) : []))
    )
  ).sort();

  // Multi-Select Tag-Toggle Handler
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Kombinierte Filter-Logik (Kategorie + Multi-Tag)
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      categoryFilter === "alle" ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();

    const projectTags = p.tags ? p.tags.map((t) => t.trim()) : [];
    
    // Prüft, ob ALLE ausgewählten Tags im Projekt enthalten sind
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((selectedTag) => projectTags.includes(selectedTag));

    return matchesCategory && matchesTags;
  });

  return (
    <div className="projects-page-container">
      <h2 className="projects-main-title">Projekte & Arbeiten</h2>
      <p className="projects-subtitle">
        Eine Übersicht meiner Software- und Infrastrukturprojekte – aus privaten Entwicklungen, GIBB-Modulen und überbetrieblichen Kursen (ÜK).
      </p>

      {/* KATEGORIE FILTER BUTTONS */}
      <div className="projects-filter-bar">
        {["alle", "privat", "gibb", "ük"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${categoryFilter === cat ? "active" : ""}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat === "alle"
              ? "Alle"
              : cat === "privat"
              ? "Private Projekte"
              : cat === "gibb"
              ? "GIBB Module"
              : "ÜK Kurse"}
          </button>
        ))}
      </div>

      {/* TAG FILTER SCHLEIFE (MULTI-SELECT SCHALTER) */}
      {!loading && allTags.length > 0 && (
        <div className="tag-filter-container">
          <span className="tag-filter-label">
            Nach Tech-Stack filtern {selectedTags.length > 0 && `(${selectedTags.length} aktiv)`}:
          </span>
          <div className="tag-filter-pills">
            {allTags.map((tag, idx) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={idx}
                  style={getTagStyle(tag, isSelected)}
                  className={`tag-filter-pill ${isSelected ? "active" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}
            {selectedTags.length > 0 && (
              <button
                className="clear-tag-btn"
                onClick={() => setSelectedTags([])}
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
                  setSelectedTags([]);
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
                <div
                  className="project-card-bg"
                  style={{
                    backgroundImage: project.imageUrl
                      ? `url(${API_BASE_URL}${project.imageUrl})`
                      : "none",
                  }}
                />
                <div className="project-card-overlay" />

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

                  {/* TAGS AUF DER KARTE (Färben sich beim Anklicken/Auswählen) */}
                  <div className="project-tags">
                    {project.tags &&
                      project.tags.map((tag, idx) => {
                        const trimmedTag = tag.trim();
                        const isSelected = selectedTags.includes(trimmedTag);
                        return (
                          <span
                            key={idx}
                            style={getTagStyle(trimmedTag, isSelected)}
                            className={`tag-pill ${isSelected ? "highlighted" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation(); // Verhindert das Öffnen des Detail-Modals
                              toggleTag(trimmedTag);
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
              <div className="modal-header">
                <span className="modal-title">{selectedProject.title}</span>
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body project-detail-body">
                {selectedProject.imageUrl && (
                  <div className="detail-hero-image-wrapper">
                    <img
                      src={`${API_BASE_URL}${selectedProject.imageUrl}`}
                      alt={selectedProject.title}
                      className="detail-hero-image"
                    />
                  </div>
                )}

                <div className="detail-meta-row">
                  <span
                    className={`category-badge badge-${selectedProject.category.toLowerCase()}`}
                  >
                    {selectedProject.category}
                  </span>
                  <div className="project-tags">
                    {selectedProject.tags &&
                      selectedProject.tags.map((tag, idx) => {
                        const trimmedTag = tag.trim();
                        const isSelected = selectedTags.includes(trimmedTag);
                        return (
                          <span
                            key={idx}
                            style={getTagStyle(trimmedTag, isSelected)}
                            className="tag-pill"
                          >
                            {trimmedTag}
                          </span>
                        );
                      })}
                  </div>
                </div>

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