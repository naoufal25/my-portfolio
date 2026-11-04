import api from './api'

/**
 * Project service — wraps all /api/projects endpoints.
 */
export const projectService = {
  /**
   * Fetch all projects.
   * @returns {Promise<Array>}
   */
  getAll: () => api.get('/projects'),

  /**
   * Fetch a single project by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getById: (id) => api.get(`/projects/${id}`),

  /**
   * Create a new project (admin use).
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  create: (data) => api.post('/projects', data),

  /**
   * Update an existing project (admin use).
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  update: (id, data) => api.put(`/projects/${id}`, data),

  /**
   * Delete a project (admin use).
   * @param {string} id
   * @returns {Promise<Object>}
   */
  delete: (id) => api.delete(`/projects/${id}`),
}
