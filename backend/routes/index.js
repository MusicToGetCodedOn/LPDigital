const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const documentRoutes = require('./documentRoutes');

// Einbinden aller Sub-Routen unter /api/...
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/documents', documentRoutes);



module.exports = router;