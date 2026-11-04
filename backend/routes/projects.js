const express = require('express')
const router  = express.Router()
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')

// GET    /api/projects
router.get('/',    getAllProjects)

// GET    /api/projects/:id
router.get('/:id', getProjectById)

// POST   /api/projects
router.post('/',   createProject)

// PUT    /api/projects/:id
router.put('/:id', updateProject)

// DELETE /api/projects/:id
router.delete('/:id', deleteProject)

module.exports = router
