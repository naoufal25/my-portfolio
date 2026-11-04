const Project = require('../models/Project')

// ─── GET /api/projects ────────────────────────────────────────────────────────
const getAllProjects = async (req, res, next) => {
  try {
    const { featured, tag, tech, limit = 50, sort = '-createdAt' } = req.query

    const filter = {}
    if (featured === 'true')  filter.featured = true
    if (featured === 'false') filter.featured = false
    if (tag)  filter.tags         = { $in: Array.isArray(tag)  ? tag  : [tag] }
    if (tech) filter.technologies = { $in: Array.isArray(tech) ? tech : [tech] }

    const projects = await Project
      .find(filter)
      .sort(sort)
      .limit(Number(limit))
      .lean()

    res.json({ success: true, count: projects.length, data: projects })
  } catch (err) { next(err) }
}

// ─── GET /api/projects/:id ────────────────────────────────────────────────────
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean()
    if (!project) return res.status(404).json({ success: false, message: 'Projet introuvable' })
    res.json({ success: true, data: project })
  } catch (err) { next(err) }
}

// ─── POST /api/projects ───────────────────────────────────────────────────────
const createProject = async (req, res, next) => {
  try {
    const {
      title, description, longDescription,
      technologies, tags, imageUrl, emoji,
      githubUrl, demoUrl, github, demo,
      featured, order,
    } = req.body

    if (!title?.trim())       return res.status(400).json({ success: false, message: 'Le titre est requis' })
    if (!description?.trim()) return res.status(400).json({ success: false, message: 'La description est requise' })

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription?.trim() || '',
      technologies: technologies || tags || [],
      tags: tags || technologies || [],
      imageUrl: imageUrl || '',
      emoji: emoji || '🚀',
      githubUrl: githubUrl || github || '',
      demoUrl: demoUrl || demo || '',
      github: github || githubUrl || '',
      demo: demo || demoUrl || '',
      featured: featured ?? false,
      order: order ?? 0,
    })

    res.status(201).json({ success: true, data: project, message: 'Projet créé avec succès' })
  } catch (err) { next(err) }
}

// ─── PUT /api/projects/:id ────────────────────────────────────────────────────
const updateProject = async (req, res, next) => {
  try {
    // Synchroniser les alias avant la mise à jour
    const update = { ...req.body }
    if (update.githubUrl && !update.github) update.github = update.githubUrl
    if (update.github    && !update.githubUrl) update.githubUrl = update.github
    if (update.demoUrl   && !update.demo)  update.demo   = update.demoUrl
    if (update.demo      && !update.demoUrl)  update.demoUrl  = update.demo
    if (update.tags && !update.technologies) update.technologies = update.tags
    if (update.technologies && !update.tags) update.tags = update.technologies

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    )

    if (!project) return res.status(404).json({ success: false, message: 'Projet introuvable' })
    res.json({ success: true, data: project, message: 'Projet mis à jour avec succès' })
  } catch (err) { next(err) }
}

// ─── DELETE /api/projects/:id ─────────────────────────────────────────────────
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Projet introuvable' })
    res.json({ success: true, message: `Projet "${project.title}" supprimé avec succès` })
  } catch (err) { next(err) }
}

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject }
