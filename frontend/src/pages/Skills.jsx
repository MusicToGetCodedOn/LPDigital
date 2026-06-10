// src/pages/Skills.jsx
import React, { useEffect } from "react";
import "./Skills.css";
import CountUp from "../components/CountUp";

function Skills() {
  useEffect(() => {
    // Der Observer schaut, wann Elemente im Sichtfeld auftauchen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            // Hole den gewünschten Prozentwert aus dem data-Attribut
            const targetWidth = element.getAttribute("data-width");
            // Setze die finale Breite und füge die Animationsklasse hinzu
            element.style.width = targetWidth;
            element.classList.add("animated");

            // Sobald animiert, müssen wir das Element nicht mehr überwachen
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 },
    ); // Reagiert, sobald 10% des Balkens sichtbar sind

    // Alle Progress-Fills finden und überwachen
    const progressElements = document.querySelectorAll(".progress-fill");
    progressElements.forEach((el) => observer.observe(el));

    // Cleanup-Funktion beim Verlassen der Seite
    return () => {
      progressElements.forEach((el) => observer.unobserve(el));
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
        {/* CARD 2: FRONTEND */}
        <div className="stack-card">
          <h3>Frontend</h3>
          <div className="techskill-container">
            {/* HTML & CSS */}
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>HTML & CSS</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={90}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="90%"></div>
              </div>
            </div>

            {/* React */}
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>React</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={80}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="80%"></div>
              </div>
            </div>

            {/* TypeScript */}
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>TypeScript</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={75}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="75%"></div>
              </div>
            </div>

            {/* React Native */}
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>React Native</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={60}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="60%"></div>
              </div>
            </div>

            {/* .NET */}
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>.NET</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={50}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="50%"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: BACKEND */}
        <div className="stack-card">
          <h3>Backend</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>JavaScript (Node.js)</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={85}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="85%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>Java</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={60}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="60%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>Python</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={65}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="65%"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: DATENBANKEN */}
        <div className="stack-card">
          <h3>Datenbanken</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>SQL</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={80}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="80%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>MongoDB</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={70}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="70%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>Redis</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={55}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="55%"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: TOOLS & CLOUD */}
        <div className="stack-card">
          <h3>IDE's & Tools</h3>
          <div className="techskill-container">
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>Docker</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={85}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="85%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>OpenTofu / Terraform</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={80}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="80%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>Git</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={85}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="85%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>AWS & Azure</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={65}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="65%"></div>
              </div>
            </div>
            <div className="skill-progress-wrapper">
              <div className="skill-info">
                <span>Linux & Windows</span>
                <div className="counter-container">
                  <CountUp
                    from={0}
                    to={75}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />
                  <span className="percent-sign">%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" data-width="75%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
