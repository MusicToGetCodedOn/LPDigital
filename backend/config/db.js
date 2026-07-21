const connectDB = async () => {
  try {
    // Später noch richtige db verbindung machen!!!
    console.log('Datenbank-Anbindung bereitgestellt (noch keine DB konfiguriert).');
  } catch (error) {
    console.error('Fehler beim Verbinden der Datenbank:', error);
    process.exit(1);
  }
};

module.exports = connectDB;