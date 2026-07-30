// src/components/home/TechFocus.jsx
import React from "react";
import "./TechFocus.css";

function TechFocus() {
  return (
    <section className="techfocus-section">
      <div className="techfocus-container">
        {/* Section Header */}
        <div className="techfocus-header">
          <span className="section-badge">Skill Architecture</span>
          <h2 className="section-title">
            Duale Expertise:{" "}
            <span className="gradient-text">Software & Plattform</span>
          </h2>
          <p className="section-subtitle">
            Ausbildung als Applikationsentwickler mit ausgeprägtem Interesse an
            modernem Cloud Engineering, Automatisierung und stabiler
            Systeminfrastruktur.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="techfocus-grid">
          {/* SÄULE 1: Applikationsentwicklung */}
          <div className="tech-card glass-box highlight-card">
            <div className="card-header">
              <div>
                <h3>Applikationsentwicklung</h3>
                <span className="card-sub">Core Qualification</span>
              </div>
            </div>

            <p className="card-desc">
              Fokus auf moderne Fullstack-Webanwendungen, saubere
              Systemarchitektur, API-Design und performante
              Frontend-Schnittstellen.
            </p>

            <div className="skill-list">
              <div className="skill-item">
                <span className="skill-name">Frontend Engineering</span>
                <span className="skill-tags">
                  React • JavaScript / TS • .NET • React Native
                </span>
              </div>
              <div className="skill-item">
                <span className="skill-name">Backend & APIs</span>
                <span className="skill-tags">
                  Node.js • Express • REST APIs • Auth / JWT
                </span>
              </div>
              <div className="skill-item">
                <span className="skill-name">Datenbanken & ORM</span>
                <span className="skill-tags">
                  Prisma ORM • MongoDB • SQLite
                </span>
              </div>
            </div>
          </div>

          {/* SÄULE 2: Plattformentwicklung & DevOps */}
          <div className="tech-card glass-box highlight-card">
            <div className="card-header">
              <div>
                <h3>Platform & Infrastructure</h3>
                <span className="card-sub">Specialization & Future Focus</span>
              </div>
            </div>

            <p className="card-desc">
              Praktische Erfahrung im Betrieb eigener Server, Containerisierung
              von Apps und Automatisierung von Deployments.
            </p>

            <div className="skill-list">
              <div className="skill-item">
                <span className="skill-name">Containerisierung</span>
                <span className="skill-tags">
                  Docker • Docker Compose • Container Mgmt
                </span>
              </div>
              <div className="skill-item">
                <span className="skill-name">
                  Infrastructure as Code & Systems
                </span>
                <span className="skill-tags">
                  OpenTofu • Linux (Ubuntu/Debian) • Bash
                </span>
              </div>
              <div className="skill-item">
                <span className="skill-name">Self-Hosting & Network</span>
                <span className="skill-tags">
                  Reverse Proxies • Git Workflow • Network Config
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechFocus;
