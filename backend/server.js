const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Erlaubt deinem React-Frontend den Zugriff
app.use(express.json()); // Erlaubt das Lesen von JSON-Inhalten im Request-Body

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { password } = req.body;

  // Passwort aus der .env Datei abgleichen
  if (password === process.env.PORTFOLIO_PASSWORD) {
    // Wenn korrekt, erstelle ein JWT-Token (Gültigkeit: 2 Stunden)
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '2h' }
    );

    // Token erfolgreich zurückgeben
    return res.json({ success: true, token });
  }

  // Wenn falsch, 401 Unauthorized zurückgeben
  return res.status(401).json({ success: false, message: 'Falsches Passwort.' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Backend läuft sicher auf Port ${PORT}`);
});