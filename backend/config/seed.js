/**
 * Script de seed MongoDB — insère 3 projets exemples
 * Usage : npm run seed
 */
const mongoose = require('mongoose')
const dotenv   = require('dotenv')
const Project  = require('../models/Project')

dotenv.config()

const projects = [
  {
    title: 'Portfolio Full Stack',
    description:
      'Application web complète avec React (Vite + Tailwind CSS) et Node.js/Express. Design moderne dark mode, animations Framer Motion, formulaire de contact avec Nodemailer.',
    longDescription:
      'Ce portfolio personnel illustre mes compétences full stack. Le frontend React utilise Tailwind CSS pour le style, Framer Motion pour les animations et Axios pour communiquer avec l\'API. Le backend Express expose des endpoints REST connectés à MongoDB.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    tags:         ['React', 'Node.js', 'Full Stack', 'MongoDB'],
    emoji: '🚀',
    imageUrl: '',
    githubUrl: 'https://github.com/alex-martin/portfolio',
    github:    'https://github.com/alex-martin/portfolio',
    demoUrl: 'https://alex-martin.vercel.app',
    demo:    'https://alex-martin.vercel.app',
    featured: true,
    order: 1,
  },
  {
    title: 'E-Commerce Platform',
    description:
      'Plateforme e-commerce complète avec gestion des produits, panier, paiement Stripe sécurisé et tableau de bord admin.',
    longDescription:
      'Application e-commerce avec authentification JWT, upload d\'images via Cloudinary, intégration Stripe pour les paiements, et un dashboard admin pour gérer les commandes et les produits.',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    tags:         ['React', 'Node.js', 'Full Stack', 'MongoDB'],
    emoji: '🛒',
    imageUrl: '',
    githubUrl: 'https://github.com/alex-martin/ecommerce',
    github:    'https://github.com/alex-martin/ecommerce',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    demo:    'https://ecommerce-demo.vercel.app',
    featured: true,
    order: 2,
  },
  {
    title: 'API REST Sécurisée',
    description:
      'API REST robuste avec authentification JWT, validation express-validator, rate limiting, et documentation Swagger interactive.',
    longDescription:
      'Backend API complet avec refresh tokens, blacklist JWT, middleware de validation, tests unitaires Jest, et documentation Swagger auto-générée. Déployé sur Railway avec CI/CD GitHub Actions.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'Jest'],
    tags:         ['Node.js', 'MongoDB'],
    emoji: '⚡',
    imageUrl: '',
    githubUrl: 'https://github.com/alex-martin/api-rest',
    github:    'https://github.com/alex-martin/api-rest',
    demoUrl: '',
    demo:    '',
    featured: false,
    order: 3,
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅  MongoDB connecté')

    await Project.deleteMany({})
    console.log('🗑️   Anciens projets supprimés')

    const inserted = await Project.insertMany(projects)
    console.log(`\n🌱  ${inserted.length} projets insérés :`)
    inserted.forEach((p, i) => console.log(`   ${i + 1}. ${p.title}`))

    console.log('\n✨  Seed terminé avec succès !\n')
  } catch (err) {
    console.error('❌  Erreur seed :', err.message)
  } finally {
    await mongoose.connection.close()
    process.exit(0)
  }
}

seed()
