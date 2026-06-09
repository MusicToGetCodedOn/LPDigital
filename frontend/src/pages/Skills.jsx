// src/pages/Skills.jsx
import React, { useEffect } from 'react';
import './Skills.css';

function Skills() {
  
  useEffect(() => {
    // Der Observer schaut, wann Elemente im Sichtfeld auftauchen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          // Hole den gewünschten Prozentwert aus dem data-Attribut
          const targetWidth = element.getAttribute('data-width');
          // Setze die finale Breite und füge die Animationsklasse hinzu
          element.style.width = targetWidth;
          element.classList.add('animated');
          
          // Sobald animiert, müssen wir das Element nicht mehr überwachen
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 }); // Reagiert, sobald 10% des Balkens sichtbar sind

    // Alle Progress-Fills finden und überwachen
    const progressElements = document.querySelectorAll('.progress-fill');
    progressElements.forEach(el => observer.observe(el));

    // Cleanup-Funktion beim Verlassen der Seite
    return () => {
      progressElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="skills-container">
      <h2 className="skills-title">Meine Kompetenzen</h2>
      
      <div className="scrollstack">
        
        {/* CARD 1: SOFTSKILLS */}
        <div className="stack-card">
          <h3>Softskills</h3>
          <ul className="softskill-list">
            <li>Teamfähigkeit</li>
            <li>Zuverlässigkeit & Verantwortungsbewusstsein</li>
            <li>Lernbereitschaft</li>
            <li>Empathie & Freundlichkeit</li>
            <li>Belastbarkeit</li>
          </ul>
        </div>

        {/* CARD 2: FRONTEND */}
        <div className="stack-card">
          <h3>Frontend</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>HTML & CSS</span><span>90%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="90%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>React</span><span>80%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="80%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>TypeScript</span><span>75%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="75%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>React Native</span><span>60%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="60%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>.NET</span><span>50%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="50%"></div></div>
            </div>
          </div>
        </div>

        {/* CARD 3: BACKEND */}
        <div className="stack-card">
          <h3>Backend</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>JavaScript (Node.js)</span><span>85%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="85%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>Java</span><span>70%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="70%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>Python</span><span>65%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="65%"></div></div>
            </div>
          </div>
        </div>

        {/* CARD 4: DATENBANKEN */}
        <div className="stack-card">
          <h3>Datenbanken</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>SQL</span><span>80%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="80%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>MongoDB</span><span>70%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="70%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>Redis</span><span>55%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="55%"></div></div>
            </div>
          </div>
        </div>

        {/* CARD 5: TOOLS & CLOUD */}
        <div className="stack-card">
          <h3>IDE's & Tools</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>Docker</span><span>85%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="85%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>OpenTofu / Terraform</span><span>80%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="80%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>Git</span><span>85%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="85%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>AWS & Azure</span><span>65%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="65%"></div></div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info"><span>Linux & Windows</span><span>75%</span></div>
              <div className="progress-bar"><div className="progress-fill" data-width="75%"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Skills;