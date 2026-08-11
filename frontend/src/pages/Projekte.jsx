import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projekte.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Farbschema für spezifische Tech-Stack Tags (leuchten nur wenn isSelected === true)
const TAG_COLORS = {
  mongodb: { bg: "rgba(16, 185, 129, 0.25)", border: "#10b981", text: "#6ee7b7" },
  react: { bg: "rgba(14, 165, 233, 0.25)", border: "#0ea5e9", text: "#7dd3fc" },
  "react native": { bg: "rgba(14, 165, 233, 0.25)", border: "#0ea5e9", text: "#7dd3fc" },
  docker: { bg: "rgba(2, 132, 199, 0.25)", border: "#0284c7", text: "#38bdf8" },
  "docker-compose": { bg: "rgba(2, 132, 199, 0.25)", border: "#0284c7", text: "#38bdf8" },
  opentofu: { bg: "rgba(249, 115, 22, 0.25)", border: "#f97316", text: "#ffedd5" },
  terraform: { bg: "rgba(168, 85, 247, 0.25)", border: "#a855f7", text: "#e9d5ff" },
  javascript: { bg: "rgba(234, 179, 8, 0.25)", border: "#eab308", text: "#fef08a" },
  typescript: { bg: "rgba(59, 130, 246, 0.25)", border: "#3b82f6", text: "#93c5fd" },
  "node.js": { bg: "rgba(34, 197, 94, 0.25)", border: "#22c55e", text: "#86efac" },
  python: { bg: "rgba(234, 179, 8, 0.25)", border: "#3b82f6", text: "#fde047" },
  csharp: { bg: "rgba(168, 85, 247, 0.25)", border: "#9333ea", text: "#f3e8ff" },
  ".net maui": { bg: "rgba(147, 51, 234, 0.25)", border: "#a855f7", text: "#f3e8ff" },
  java: { bg: "rgba(239, 68, 68, 0.25)", border: "#ef4444", text: "#fca5a5" },
  api: { bg: "rgba(20, 184, 166, 0.25)", border: "#14b8a6", text: "#99f6e4" },
  ai: { bg: "rgba(236, 72, 153, 0.25)", border: "#ec4899", text: "#fbcfe8" },
};

// Hilfsfunktion: Farbe NUR bei aktiver Selektion
const getTagStyle = (tag, isSelected = false) => {
  if (!isSelected) {
    return {
      background: "rgba(255, 255, 255, 0.04)",
      borderColor: "rgba(255, 255, 255, 0.12)",
      color: "#d4d4d8",
      boxShadow: "none",
    };
  }

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
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("alle");
  const [selectedTags, setSelectedTags] = useState([]);
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

  // Eindeutige Tags extrahieren
  const allTags = Array.from(
    new Set(
      projects.flatMap((p) => (p.tags ? p.tags.map((t) => t.trim()) : []))
    )
  ).sort();

  // Multi-Select Tag Toggle
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Filter-Logik (Kategorie + Multi-Tag)
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      categoryFilter === "alle" ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();

    const projectTags = p.tags ? p.tags.map((t) => t.trim()) : [];
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

      {/* MULTI-SELECT TAG FILTER */}
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

      {/* LOADING / GRID */}
      {loading ? (
        <div className="projects-loading">Projekte werden geladen...</div>
      ) : (
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
                onClick={() => navigate(`/projects/${project.id}`)} // Router-Navigation
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
                              e.stopPropagation(); // Verhindert Seitenwechsel beim Tag-Filter-Klick
                              toggleTag(trimmedTag);
                            }}
                          >
                            {trimmedTag}
                          </span>
                        );
                      })}
                  </div>

                  <button className="details-btn">Details & Abstract →</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;