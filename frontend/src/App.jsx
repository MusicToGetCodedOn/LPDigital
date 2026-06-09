import React from 'react';
// Importiere deine neu erstellte Komponente
import Lightfall from './components/Lightfall.jsx'; 
import Navbar from './components/Navbar.jsx'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projekte from './pages/Projekte.jsx';
import Kontakt from './pages/Kontakt.jsx';
import Skills from './pages/Skills.jsx';
import Dokumente from './pages/Dokumente.jsx';  

function App() {
  return (
    <Router>
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 1. LAYER: Der animierte Hintergrund ganz unten (z-index: -1) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Lightfall /> 
      </div>
      
      {/* 2. LAYER: Dein Navbar ganz oben (z-index: 1) */}
       <Navbar />

<div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#e5e5e5',
          paddingTop: '80px' // Etwas Platz nach oben lassen wegen der fixierten Navbar
        }}>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projekte />} />
            <Route path="/documents" element={<Dokumente />} />
            <Route path="/contact" element={<Kontakt />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </div>
     
        
    
      
    </div>
    </Router>
  );
}

export default App;