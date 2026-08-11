const express = require('express');
const router = express.Router();
const { getAllDocuments, downloadDocument } = require('../controllers/documentController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Öffentliche Liste aller Dokumenten-Metadaten (Titel, Kategorie etc.)
router.get('/', getAllDocuments);

// GESCHÜTZTER ENDPOINT: Nur mit gültigem Auth-Header aufrufbar
router.get('/download/:filename', authenticateToken , downloadDocument);

module.exports = router;