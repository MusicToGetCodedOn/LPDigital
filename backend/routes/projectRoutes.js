// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { getProjects } = require('../controllers/projectController');

// GET /api/projects
router.get('/', getProjects);

module.exports = router;