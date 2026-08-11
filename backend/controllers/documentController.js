const path = require('path');
const fs = require('fs');
const { prisma } = require('../config/db');

// Alle Dokumente für das Frontend abfragen (aus DB)
const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await prisma.document.findMany();
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

// Geschützter Download/Stream der PDF-Datei aus dem private-Ordner
const downloadDocument = async (req, res, next) => {
  try {
    const { filename } = req.params;

    // Absolute Pfadzuweisung zum 'private/documents' Ordner
    const filePath = path.join(__dirname, '..', 'private', 'documents', filename);

    // Prüfen, ob die Datei existiert
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Dokument nicht gefunden" });
    }

    // Sendet die Datei sicher an den Client
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDocuments,
  downloadDocument
};