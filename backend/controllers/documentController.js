const { prisma } = require('../config/db');

const getDocuments = async (req, res, next) => {
  try {
    const documents = await prisma.document.findMany();
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDocuments };