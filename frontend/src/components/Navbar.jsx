import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import logoNameOnly from "../img/Logo_nur_Name.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const isLoggedIn = !!localStorage.getItem("portfolio_token");

  const handleLogout = () => {
    localStorage.removeItem("portfolio_token");
    setOpen(false);
    navigate("/"); 
  };

  const getDynamicTag = () => {
    switch (location.pathname) {
      case "/":
        return ""; 
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
      // Den Fall "/login" können wir komplett löschen
      default:
        return "";
    }
  };

  const currentTag = getDynamicTag();

  return (
    <nav className="glass-navbar">
      <div className="nav-logo">
        <Link to="/" onClick={() => setOpen(false)} className="logo-link">
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
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setOpen(false)}>Über mich</Link>
        </li>
        <li>
          <Link to="/projects" onClick={() => setOpen(false)}>Projekte</Link>
        </li>
        <li>
          <Link to="/skills" onClick={() => setOpen(false)}>Skills</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setOpen(false)}>Kontakt</Link>
        </li>
        <li>
          <Link to="/documents" onClick={() => setOpen(false)}>Dokumente</Link>
        </li>

        {/* Wenn eingeloggt -> Logout anzeigen. Wenn nicht -> GAR NICHTS anzeigen */}
        {isLoggedIn && (
          <li>
            <button className="nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;