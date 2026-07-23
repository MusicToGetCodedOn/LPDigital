import React from "react";
// Importiere deine neu erstellte Komponente
import Lightfall from "./components/Lightfall.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projekte from "./pages/Projekte.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Skills from "./pages/Skills.jsx";
import Dokumente from "./pages/Dokumente.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/Protectedroute.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* 1. LAYER: Der animierte Hintergrund ganz unten (z-index: -1) */}
        <div className="background-layer">
          <Lightfall />
        </div>

        {/* 2. LAYER: Dein Navbar ganz oben (z-index: 1) */}
        <Navbar />

        <div className="main-content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projekte />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Kontakt />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Dokumente />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
