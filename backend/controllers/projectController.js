const { prisma } = require('../config/db');

const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany();
    
    const formattedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tags: p.tags ? p.tags.split(',') : [],
      shortDesc: p.shortDesc,
      imageUrl: p.imageUrl,
      links: {
        github: p.githubUrl,
        live: p.liveUrl
      },
      abstract: {
        problem: p.problem,
        solution: p.solution,
        result: p.result
      }
    }));

    res.json(formattedProjects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: id },
    });
    
    if (!project) {
      return res.status(404).json({ error: "Projekt nicht gefunden" });
    }
    res.json(project);
  } catch (error) {
    console.error("Fehler beim Laden des Projekts:", error);
    res.status(500).json({ error: "Fehler beim Laden des Projekts" });
  }
};

// Beide Funktionen gemeinsam exportieren
module.exports = { 
  getProjects, 
  getProjectById 
};