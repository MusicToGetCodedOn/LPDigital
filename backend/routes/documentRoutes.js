const express = require('express');
const router = express.Router();
const { getDocuments } = require('../controllers/documentController');

// Falls der Bereich geschützt sein soll, kannst du hier deine authMiddleware dazwischenschalten!
router.get('/', getDocuments);

module.exports = router;