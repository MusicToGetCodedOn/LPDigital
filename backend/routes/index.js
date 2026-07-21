const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

// Einbinden aller Sub-Routen unter /api/...
router.use('/auth', authRoutes);



module.exports = router;