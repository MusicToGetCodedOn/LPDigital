// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetail.css";

const API_BASE_URL = "http://localhost:5000";

const TAG_COLORS = {
  mongodb: {
    bg: "rgba(16, 185, 129, 0.25)",
    border: "#10b981",
    text: "#6ee7b7",
  },
  react: { bg: "rgba(14, 165, 233, 0.25)", border: "#0ea5e9", text: "#7dd3fc" },
  "react native": {
    bg: "rgba(14, 165, 233, 0.25)",
    border: "#0ea5e9",
    text: "#7dd3fc",
  },
  docker: { bg: "rgba(2, 132, 199, 0.25)", border: "#0284c7", text: "#38bdf8" },
  "docker-compose": {
    bg: "rgba(2, 132, 199, 0.25)",
    border: "#0284c7",
    text: "#38bdf8",
  },
  opentofu: {
    bg: "rgba(249, 115, 22, 0.25)",
    border: "#f97316",
    text: "#ffedd5",
  },
  terraform: {
    bg: "rgba(168, 85, 247, 0.25)",
    border: "#a855f7",
    text: "#e9d5ff",
  },
  javascript: {
    bg: "rgba(234, 179, 8, 0.25)",
    border: "#eab308",
    text: "#fef08a",
  },
  typescript: {
    bg: "rgba(59, 130, 246, 0.25)",
    border: "#3b82f6",
    text: "#93c5fd",
  },
  "node.js": {
    bg: "rgba(34, 197, 94, 0.25)",
    border: "#22c55e",
    text: "#86efac",
  },
  python: { bg: "rgba(234, 179, 8, 0.25)", border: "#3b82f6", text: "#fde047" },
  csharp: {
    bg: "rgba(168, 85, 247, 0.25)",
    border: "#9333ea",
    text: "#f3e8ff",
  },
  ".net maui": {
    bg: "rgba(147, 51, 234, 0.25)",
    border: "#a855f7",
    text: "#f3e8ff",
  },
  java: { bg: "rgba(239, 68, 68, 0.25)", border: "#ef4444", text: "#fca5a5" },
  api: { bg: "rgba(20, 184, 166, 0.25)", border: "#14b8a6", text: "#99f6e4" },
  ai: { bg: "rgba(236, 72, 153, 0.25)", border: "#ec4899", text: "#fbcfe8" },
};

const getTagStyle = (tag) => {
  const normalized = tag.toLowerCase().trim();
  const config = TAG_COLORS[normalized] || {
    bg: "rgba(255, 255, 255, 0.06)",
    border: "rgba(255, 255, 255, 0.15)",
    text: "#e4e4e7",
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Projekt nicht gefunden");
        return res.json();
      })
      .then((data) => {
        // Tags sicher als Array verarbeiten (entweder Komma-String oder bereits Array)
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
        <button onClick={() => navigate("/projects")}>
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* ZURÜCK-BUTTON */}
      <button className="back-btn" onClick={() => navigate("/projects")}>
        ← Zurück zu allen Projekten
      </button>

      {/* HERO BILD BANNER */}
      {project.imageUrl && (
        <div className="detail-hero-banner">
          <img src={`${API_BASE_URL}${project.imageUrl}`} alt={project.title} />
          <div className="detail-hero-overlay" />
        </div>
      )}

      {/* HEADER INFO */}
      <div className="detail-header-content">
        <div className="detail-meta">
          <span
            className={`category-badge badge-${project.category?.toLowerCase()}`}
          >
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
      </div>

      {/* ABSTRACT & INHALTE (Direkt aus den Schema-Feldern) */}
      <div className="detail-grid">
        {project.problem && (
          <div className="abstract-card">
            <h3>Ausgangslage & Problemstellung</h3>
            <p>{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div className="abstract-card">
            <h3>Umsetzung & Architektur</h3>
            <p>{project.solution}</p>
          </div>
        )}

        {project.result && (
          <div className="abstract-card">
            <h3>Ergebnis & Resultat</h3>
            <p>{project.result}</p>
          </div>
        )}
      </div>

      {/* ACTION LINKS */}
      <div className="detail-actions">
        <div className="project-links">
          {project.githubFrontend && (
            <a
              href={project.githubFrontend}
              target="_blank"
              rel="noreferrer"
              className="btn-github"
            >
              GitHub (Frontend)
            </a>
          )}
          {project.githubBackend && (
            <a
              href={project.githubBackend}
              target="_blank"
              rel="noreferrer"
              className="btn-github"
            >
              GitHub (Backend)
            </a>
          )}
          {/* Fallback für einfache/einzelne Repositories */}
          {project.githubUrl && !project.githubFrontend && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-github"
            >
              GitHub
            </a>
          )}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn live-btn"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
