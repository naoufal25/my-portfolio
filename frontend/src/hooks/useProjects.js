import { useState, useEffect } from 'react'
import { projectService } from '../services/projectService'

// Fallback projects for development / when API is unavailable
const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'Portfolio Full Stack',
    description: 'Application web complète avec React, Node.js, Express et MongoDB. Design moderne avec Tailwind CSS et animations CSS.',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack'],
    emoji: '🚀',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    _id: '2',
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce avec gestion des produits, panier, paiement Stripe et tableau de bord administrateur.',
    tags: ['React', 'Node.js', 'Full Stack'],
    emoji: '🛒',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    _id: '3',
    title: 'API REST MongoDB',
    description: 'API REST robuste avec authentification JWT, validation des données et documentation Swagger complète.',
    tags: ['Node.js', 'MongoDB'],
    emoji: '⚡',
    github: 'https://github.com',
  },
  {
    _id: '4',
    title: 'Dashboard Analytics',
    description: 'Tableau de bord d\'analytiques en temps réel avec graphiques interactifs et rapports exportables.',
    tags: ['React', 'Full Stack'],
    emoji: '📊',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    _id: '5',
    title: 'Chat Application',
    description: 'Application de messagerie en temps réel avec Socket.io, salons de discussion et partage de fichiers.',
    tags: ['React', 'Node.js', 'Full Stack'],
    emoji: '💬',
    github: 'https://github.com',
  },
  {
    _id: '6',
    title: 'Task Manager',
    description: 'Gestionnaire de tâches collaboratif avec drag & drop, étiquettes et notifications en temps réel.',
    tags: ['React', 'MongoDB'],
    emoji: '✅',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
]

/**
 * Hook to fetch projects from the API with fallback to mock data.
 * @returns {{ projects: Array, loading: boolean, error: string|null }}
 */
export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll()
        setProjects(data.length ? data : FALLBACK_PROJECTS)
      } catch (err) {
        console.warn('API non disponible, utilisation des données de démonstration.')
        setProjects(FALLBACK_PROJECTS)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
