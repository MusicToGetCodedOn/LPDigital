const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // erwartet Format: "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Zugriff verweigert. Kein Token angegeben.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'dev_fallback_secret_key', (err, user) => { 
    if (err) {
      return res.status(403).json({ success: false, message: 'Token ungültig oder abgelaufen.' });
    }
    
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };