const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Verbindung zur Datenbank hergestellt (Prisma).');
  } catch (error) {
    console.error('Fehler beim Verbinden der Datenbank:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, prisma };