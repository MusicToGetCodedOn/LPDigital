const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Datenbankverbindung initialisieren
connectDB();

// Global Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);
app.use('/projects', express.static('public/projects'));
app.use('/documents', express.static('public/documents'));

// Health-Check Endpunkt (sehr nützlich für Server-Monitoring & Self-Hosting)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Centralized Error Handling Middleware (MUSS als letztes eingebunden werden)
app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(`Backend läuft erfolgreich im ${process.env.NODE_ENV || 'development'} Modus auf Port ${PORT}`);
});