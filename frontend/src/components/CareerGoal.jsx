import React from "react";
import "./CareerGoal.css";

function CareerGoal() {
  return (
    <section className="career-section">
      <div className="career-container">
        
        {/* Section Header */}
        <div className="career-header">
          <span className="section-badge">Roadmap & Orientierung</span>
          <h2 className="section-title">
            Ausbildung & <span className="gradient-text">Zukunftspläne</span>
          </h2>
          <p className="section-subtitle">
            Mein Weg vom geplanten Lehrabschluss als Applikationsentwickler EFZ 
            hin zu weiterführenden Perspektiven in Software und Infrastruktur.
          </p>
        </div>

        {/* Content Grid */}
        <div className="career-grid">
          
          {/* Hauptfokus Card */}
          <div className="career-card main-vision glass-box">
            <div className="card-badge">Fundament & Schwerpunkte</div>
            <h3>Applikationsentwicklung & Systemnahe Themen</h3>
            <p>
              Aktuell konzentriere ich mich voll auf den erfolgreichen Abschluss 
              meiner Ausbildung zum Applikationsentwickler EFZ. Neben der klassischen 
              Webentwicklung verfolge ich ein starkes Interesse an moderner Infrastruktur.
            </p>
            
            <div className="career-highlights">
              <div className="highlight-item">
                <div className="highlight-content">
                  <strong>Docker, OpenTofu & Cloud-Systeme</strong>
                  <p>
                    Besonders faszinieren mich Containerisierung und Infrastructure-as-Code. 
                    Dieses Interesse spiegelt sich auch in meinen sehr guten Modulnoten im Bereich 
                    Docker und Cloud an der gibb wider.
                  </p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-content">
                  <strong>Praxisnahe Fullstack-Anwendungen</strong>
                  <p>
                    Kombination aus Frontend-Entwicklung (React/Vite) und strukturiertem Backend-Design 
                    (Node.js, Prisma, SQL/NoSQL-Datenbanken).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline / Nächste Schritte */}
          <div className="career-card timeline-card glass-box">
            <div className="card-badge">Meilensteine</div>
            <h3>Geplante Schritte</h3>

            <div className="career-timeline">
              <div className="timeline-item active">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Aktueller Fokus</span>
                  <h4>Abschluss Applikationsentwickler EFZ</h4>
                  <p>
                    Erfolgreicher Abschluss der Lehre mit Vertiefung in der Applikationsentwicklung 
                    und soliden Noten in den praxisnahen gibb-Modulen.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Nächster Schritt</span>
                  <h4>Praktische Erfahrung & Vertiefung</h4>
                  <p>
                    Erste berufliche Schritte in der Softwareentwicklung oder Systemarchitektur, 
                    um mein Wissen in realen Projekten weiter auszubauen.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Weiterbildung</span>
                  <h4>Weiterführendes Studium</h4>
                  <p>
                    Voraussichtlich ein Studium im Bereich Informatik / Software Engineering, 
                    um theoretische Grundlagen mit meiner Praxiserfahrung zu verbinden.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CareerGoal;