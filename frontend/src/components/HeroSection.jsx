// src/components/home/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const codeText = `const developer = {
  name: "Loris Pérez",
  role: "Apprentice Software Engineer",
  location: "Bern, CH",
  focus: ["Fullstack Dev", "Platform Eng"],
  currentStack: {
    frontend: ["React", "React Native", ".NET"],
    backend: ["Node.js", "Express", "MongoDB"],
    devOps: ["Docker", "Linux", "OpenTofu"]
  },
  status: "Open for Application Dev Internships"
};`;

function HeroSection() {
  const [displayedCode, setDisplayedCode] = useState("");

  useEffect(() => {
    let index = 0;
    const speed = 20;

    const interval = setInterval(() => {
      index++;
      if (index <= codeText.length) {
        setDisplayedCode(codeText.slice(0, index));
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Linke Spalte: Intro & Call to Actions */}
        <div className="hero-content">

          <h1 className="hero-title">
            Building Apps &<br />
            <span>Modern Infrastructure.</span>
          </h1>

          <p className="hero-subtitle">
            Hi, ich bin <strong>Loris</strong>. Applikationsentwickler mit
            starkem Fokus auf Fullstack-Webarchitekturen, Containerisierung und
            Cloud-Infrastruktur.
          </p>

          <div className="hero-cta-group">
            <Link to="/projects" className="btn-primary">
              Projekte erkunden
            </Link>
            <Link to="/documents" className="btn-secondary">
              Dossier & Zeugnisse
            </Link>
          </div>

          {/* Tech Stack Indicator */}
          <div className="hero-tech-stack">
            <span className="tech-label">Core Stack:</span>
            <div className="tech-pills">
              <span>React / Vite</span>
              <span>Node.js</span>
              <span>Docker</span>
              <span>Git</span>
              <span>OpenTofu</span>
            </div>
          </div>
        </div>

        {/* Rechte Spalte: Live Terminal / Architecture Snippet */}
        <div className="hero-visual">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="btn-close"></span>
                <span className="btn-minimize"></span>
                <span className="btn-maximize"></span>
              </div>
              <span className="terminal-title">developer-profile.ts</span>
            </div>
            <div className="terminal-body">
              <pre>
                <code>
                  {displayedCode}
                  <span className="terminal-cursor">|</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;