const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validierung der Eingaben
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Benutzername und Passwort sind erforderlich.' 
      });
    }

    // TODO: Später hier Datenbank-Abfrage einbauen:
    // const user = await User.findOne({ username });
    
    // Aktueller temporärer Abgleich via Umgebungsvariablen
    const validUsername = process.env.PORTFOLIO_USERNAME;
    const validPassword = process.env.PORTFOLIO_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Ungültige Anmeldedaten.' 
      });
    }

    // JWT erstellen
    const token = jwt.sign(
      { username: validUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    return res.json({
      success: true,
      message: 'Erfolgreich angemeldet.',
      token,
    });
  } catch (error) {
    next(error); // Reicht Fehler an die errorHandler Middleware weiter
  }
};

module.exports = { login };