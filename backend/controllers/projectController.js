const { prisma } = require('../config/db');

const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany();
    
    const formattedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tags: p.tags.split(','),
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

module.exports = { getProjects };