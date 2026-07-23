const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllLanguages = async (req, res, next) => {
  try {
    const languages = await prisma.language.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(languages);
  } catch (error) {
    console.error("Fehler beim Laden der Sprachen:", error);
    res.status(500).json({ error: "Fehler beim Laden der Sprachen" });
  }
};