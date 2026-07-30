// src/components/home/FeaturedProjects.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProjects.css";

function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Gewünschte Projekt-IDs in exakter Reihenfolge
  const featuredIds = ["stalkr", "gamebase", "lpfinance"];

  // Dynamische Live-URL für das GitHub Graph
  const githubGraphUrl = "https://ghchart.rshah.org/a855f7/MusicToGetCodedOn";

  useEffect(() => {
    // Abrufen aller Projekte vom Backend
    fetch("http://localhost:5000/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Projekte");
        }
        return res.json();
      })
      .then((data) => {
        // Filtern und exakt nach der ID-Reihenfolge sortieren
        const selectedProjects = featuredIds
          .map((id) => data.find((p) => p.id === id))
          .filter(Boolean); // Filtert nicht gefundene IDs heraus

        setProjects(selectedProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const parseTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    return [];
  };

  return (
    <section className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <span className="section-badge">Proof of Work</span>
          <h2 className="section-title">
            Ausgewählte <span className="gradient-text">Projekte</span>
          </h2>
          <p className="section-subtitle">
            Ein Einblick in praxisnahe Anwendungen, an denen ich aktuell arbeite
            — direkt aus der Datenbank geladen.
          </p>
        </div>

        {/* Dynamic Projects Grid */}
        <div className="projects-grid">
          {loading ? (
            <div className="projects-loading glass-box">
              <span>Projekte werden geladen...</span>
            </div>
          ) : error ? (
            <div className="projects-error glass-box">
              <span>Projekte konnten nicht geladen werden.</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="projects-empty glass-box">
              <span>Keine passenden Projekte gefunden.</span>
            </div>
          ) : (
            projects.map((project) => {
              const tagList = parseTags(project.tags);

              return (
                <div key={project.id} className="project-card glass-box">
                  <div className="project-card-header">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  <p className="project-desc">{project.shortDesc}</p>

                  <div className="project-tags">
                    {tagList.map((tag, idx) => (
                      <span key={idx} className="project-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn project-btn-github"
                      >
                        GitHub ↗
                      </a>
                    )}
                    <Link
                      to={`/projects`}
                      className="project-btn project-btn-details"
                    >
                      Details ansehen
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* LIVE GITHUB ACTIVITY OVERVIEW CARD */}
        <div className="github-activity-card glass-box">
          <div className="github-card-header">
            <div className="github-title-group">
              <div>
                <h3>Live GitHub Contribution Activity</h3>
                <p>
                  Kontinuierliches Lernen & täglicher Code-Workflow (Live-Daten)
                </p>
              </div>
            </div>
            <a
              href="https://github.com/MusicToGetCodedOn"
              target="_blank"
              rel="noreferrer"
              className="github-profile-link"
            >
              @MusicToGetCodedOn ↗
            </a>
          </div>

          <div className="github-graph-container">
            {!imageLoaded && (
              <div className="github-graph-skeleton">
                <span>Lade aktuelle GitHub-Aktivitäten...</span>
              </div>
            )}
            <img
              src={githubGraphUrl}
              alt="Live GitHub Contributions Graph"
              className={`github-graph-img ${imageLoaded ? "loaded" : "loading"}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;