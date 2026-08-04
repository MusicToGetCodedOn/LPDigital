import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL ;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Anfrage an den überarbeiteten Auth-Endpunkt senden
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // JWT-Token lokal speichern
        localStorage.setItem('portfolio_token', data.token);
        navigate('/'); // Weiterleitung zu den Dokumenten
      } else {
        setError(data.message || 'Ungültige Anmeldedaten.');
      }
    } catch (err) {
      setError('Verbindung zum Server fehlgeschlagen. Bitte versuche es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-login-box">
        <h2>Geschützter Bereich</h2>
        <p>Bitte melde dich an, um Zugriff auf die Dokumente zu erhalten.</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Benutzername" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Passwort eingeben" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Anmelden...' : 'Freischalten'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;