const { prisma } = require('../config/db');

const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany();
    
    const formattedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tags: p.tags ? p.tags.split(',') : [],
      description: p.description,
      imageUrl: p.imageUrl,
      documentUrl: p.documentUrl,
      links: {
        github: p.githubUrl,
        live: p.liveUrl
      },
      abstract: {
        initialSituation: p.initialSituation,
        technologies: p.technologies ? p.technologies.split(',') : [],
        implementation: p.implementation,
        results: p.results,
        learnings: p.learnings
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

    // Formatierung für das Einzelprojekt (inkl. geparsten Arrays für Tags & Techs)
    const formattedProject = {
      ...project,
      tags: project.tags ? project.tags.split(',') : [],
      technologiesArray: project.technologies ? project.technologies.split(',') : []
    };

    res.json(formattedProject);
  } catch (error) {
    console.error("Fehler beim Laden des Projekts:", error);
    res.status(500).json({ error: "Fehler beim Laden des Projekts" });
  }
};

module.exports = { 
  getProjects, 
  getProjectById 
};