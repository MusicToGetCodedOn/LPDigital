const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');

// Einbinden aller Sub-Routen unter /api/...
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);



module.exports = router;