const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { prisma } = require('../config/db');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Benutzername und Passwort sind erforderlich.' 
      });
    }

    // 1. Benutzer in der Datenbank suchen
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Ungültige Anmeldedaten.' 
      });
    }

    // 2. Passwort mit dem gehashten Wert aus der DB vergleichen
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Ungültige Anmeldedaten.' 
      });
    }

    // 3. JWT-Token generieren
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    return res.json({
      success: true,
      message: 'Erfolgreich angemeldet.',
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };