import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // API-Anfrage an dein Node.js-Backend senden
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Das vom Backend generierte JWT-Token im LocalStorage speichern
        localStorage.setItem('portfolio_token', data.token);
        navigate('/documents'); // Weiterleitung zu den Dokumenten
      } else {
        setError(data.message || 'Falsches Passwort.');
      }
    } catch (err) {
      setError('Verbindung zum Server fehlgeschlagen.');
    }
  };

  return (
    <div className="login-container">
      <div className="glass-login-box">
        <h2>Geschützter Bereich</h2>
        <p>Bitte gib das Passwort ein, um Zugriff auf die Dokumente zu erhalten.</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Passwort eingeben" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-btn">Freischalten</button>
        </form>
      </div>
    </div>
  );
}

export default Login;