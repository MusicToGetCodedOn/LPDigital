import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom"; // useLocation & useNavigate hinzugefügt
import logo from "../img/logo.png";
import logoNameOnly from "../img/Logo_nur_Name.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Zwingt die Navbar bei jedem Seitenwechsel zum Neu-Rendern
  const navigate = useNavigate(); // Ermöglicht die Weiterleitung nach dem Logout

  // Prüfen, ob das Token im LocalStorage existiert (gibt true oder false zurück)
  const isLoggedIn = !!localStorage.getItem("portfolio_token");

  const handleLogout = () => {
    localStorage.removeItem("portfolio_token"); // Token löschen
    setOpen(false); // Mobiles Menü schliessen
    navigate("/"); // User zurück zur Homepage leiten
  };

  const getDynamicTag = () => {
    switch (location.pathname) {
      case "/":
        return ""; // Auf der Startseite zeigen wir nur das Logo ohne Tag
      case "/about":
        return "about";
      case "/projects":
        return "projects";
      case "/skills":
        return "skills";
      case "/contact":
        return "contact";
      case "/documents":
        return "documents";
      case "/login":
        return "login";
      default:
        return "";
    }
  };

  const currentTag = getDynamicTag();

  return (
    <nav className="glass-navbar">
      <div className="nav-logo">
        <Link to="/" onClick={() => setOpen(false)} className="logo-link">
          {/* Das Tag wird nun IMMER gerendert */}
          <span className="dynamic-code-tag">{`</${currentTag}>`}</span>
          <span className="dynamic-code-tag">{`LPDigital`}</span>{" "}
        </Link>
      </div>

      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "✕" : "☰"}
      </button>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setOpen(false)}>
            Über mich
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={() => setOpen(false)}>
            Projekte
          </Link>
        </li>
        <li>
          <Link to="/skills" onClick={() => setOpen(false)}>
            Skills
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Kontakt
          </Link>
        </li>
        <li>
          <Link to="/documents" onClick={() => setOpen(false)}>
            Dokumente
          </Link>
        </li>

        {/* Dynamischer Login/Logout Button */}
        {isLoggedIn ? (
          <li>
            <button className="nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
