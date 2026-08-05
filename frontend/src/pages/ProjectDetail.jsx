import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TAG_COLORS = {
  mongodb: { bg: "rgba(16, 185, 129, 0.2)", border: "rgba(16, 185, 129, 0.4)", text: "#6ee7b7" },
  react: { bg: "rgba(14, 165, 233, 0.2)", border: "rgba(14, 165, 233, 0.4)", text: "#7dd3fc" },
  "react native": { bg: "rgba(14, 165, 233, 0.2)", border: "rgba(14, 165, 233, 0.4)", text: "#7dd3fc" },
  docker: { bg: "rgba(2, 132, 199, 0.2)", border: "rgba(2, 132, 199, 0.4)", text: "#38bdf8" },
  "docker-compose": { bg: "rgba(2, 132, 199, 0.2)", border: "rgba(2, 132, 199, 0.4)", text: "#38bdf8" },
  opentofu: { bg: "rgba(249, 115, 22, 0.2)", border: "rgba(249, 115, 22, 0.4)", text: "#ffedd5" },
  terraform: { bg: "rgba(168, 85, 247, 0.2)", border: "rgba(168, 85, 247, 0.4)", text: "#e9d5ff" },
  javascript: { bg: "rgba(234, 179, 8, 0.2)", border: "rgba(234, 179, 8, 0.4)", text: "#fef08a" },
  typescript: { bg: "rgba(59, 130, 246, 0.2)", border: "rgba(59, 130, 246, 0.4)", text: "#93c5fd" },
  "node.js": { bg: "rgba(34, 197, 94, 0.2)", border: "rgba(34, 197, 94, 0.4)", text: "#86efac" },
  python: { bg: "rgba(234, 179, 8, 0.2)", border: "rgba(59, 130, 246, 0.4)", text: "#fde047" },
  csharp: { bg: "rgba(168, 85, 247, 0.2)", border: "rgba(147, 51, 234, 0.4)", text: "#f3e8ff" },
  ".net maui": { bg: "rgba(147, 51, 234, 0.2)", border: "rgba(168, 85, 247, 0.4)", text: "#f3e8ff" },
  java: { bg: "rgba(239, 68, 68, 0.2)", border: "rgba(239, 68, 68, 0.4)", text: "#fca5a5" },
  api: { bg: "rgba(20, 184, 166, 0.2)", border: "rgba(20, 184, 166, 0.4)", text: "#99f6e4" },
  ai: { bg: "rgba(236, 72, 153, 0.2)", border: "rgba(236, 72, 153, 0.4)", text: "#fbcfe8" },
};

const getTagStyle = (tag) => {
  const normalized = tag.toLowerCase().trim();
  const config = TAG_COLORS[normalized] || {
    bg: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.15)",
    text: "#a1a1aa",
  };
  return {
    background: config.bg,
    borderColor: config.border,
    color: config.text,
  };
};

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Scroll Event Listener für sanftes Verblassen des Hintergrundbilds
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 400);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        setProject({
          ...data,
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
    return <div className="detail-loading">Projekt wird geladen...</div>;
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
      {/* FULLSCREEN BACKGROUND WITH SCROLL-FADE */}
      {project.imageUrl && (
        <div 
          className="detail-bg-hero" 
          style={{ opacity: scrollOpacity }}
        >
          <img src={`${API_BASE_URL}${project.imageUrl}`} alt={project.title} />
          <div className="detail-bg-overlay" />
        </div>
      )}

      {/* TOP NAVIGATION */}
      <nav className="detail-nav">
        <button className="back-btn" onClick={() => navigate("/projects")}>
          ← Zurück zur Übersicht
        </button>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <main className="detail-content">
        {/* HEADER SECTION */}
        <header className="detail-header">
          <div className="detail-meta">
            <span className={`category-badge badge-${project.category?.toLowerCase()}`}>
              {project.category}
            </span>
            <div className="detail-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} style={getTagStyle(tag)} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{project.shortDesc}</p>
        </header>

        {/* ABSTRACT & CARDS */}
        <section className="detail-grid">
          {project.problem && (
            <div className="minimal-card">
              <span className="card-label">01 / Problemstellung</span>
              <h3>Ausgangslage</h3>
              <p>{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="minimal-card">
              <span className="card-label">02 / Lösung & Architektur</span>
              <h3>Umsetzung</h3>
              <p>{project.solution}</p>
            </div>
          )}

          {project.result && (
            <div className="minimal-card">
              <span className="card-label">03 / Resultat</span>
              <h3>Ergebnis</h3>
              <p>{project.result}</p>
            </div>
          )}
        </section>

        {/* ACTIONS / BUTTONS */}
        <footer className="detail-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="action-btn github-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
              className="action-btn live-btn"
            >
              Live Demo
              <span className="arrow">↗</span>
            </a>
          )}
        </footer>
      </main>
    </div>
  );
}

export default ProjectDetail;