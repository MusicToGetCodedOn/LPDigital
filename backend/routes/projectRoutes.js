// routes/projectRoutes.js
const express = require('express');
const router = express.Router();

// Beide Controller-Funktionen importieren
const { getProjects, getProjectById } = require('../controllers/projectController');

// GET /api/projects
router.get('/', getProjects);

// GET /api/projects/:id
router.get('/:id', getProjectById);

module.exports = router;