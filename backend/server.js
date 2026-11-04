const express      = require('express')
const mongoose     = require('mongoose')
const cors         = require('cors')
const dotenv       = require('dotenv')
const helmet       = require('helmet')
const rateLimit    = require('express-rate-limit')

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// ─── Security Headers ─────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
]
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS bloqué pour l'origine : ${origin}`))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de requêtes. Réessayez dans 15 minutes.' },
})
app.use('/api', globalLimiter)

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Routes ───────────────────────────────────────────────────────────────────
const projectRoutes = require('./routes/projects')
const contactRoutes = require('./routes/contact')

app.use('/api/projects', projectRoutes)
app.use('/api/contact',  contactRoutes)

// Health-check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route introuvable : ${req.method} ${req.originalUrl}` })
})

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  let status  = err.statusCode || err.status || 500
  let message = err.message || 'Erreur interne du serveur'

  // Mongoose CastError (ID invalide)
  if (err.name === 'CastError') { status = 400; message = `ID invalide : ${err.value}` }

  // Mongoose Duplicate key
  if (err.code === 11000) {
    status = 409
    const field = Object.keys(err.keyValue || {})[0]
    message = `La valeur '${err.keyValue?.[field]}' est déjà utilisée pour le champ '${field}'`
  }

  // Mongoose Validation
  if (err.name === 'ValidationError') {
    status = 422
    message = Object.values(err.errors).map(e => e.message).join(', ')
  }

  // JWT
  if (err.name === 'JsonWebTokenError')  { status = 401; message = 'Token invalide' }
  if (err.name === 'TokenExpiredError')  { status = 401; message = 'Token expiré' }

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${status}] ${message}`)
  }

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré → http://localhost:${PORT}`)
  console.log(`📋 Environnement  : ${process.env.NODE_ENV || 'development'}`)

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'
  mongoose.connect(mongoUri)
    .then(conn => console.log(`✅ MongoDB connecté : ${conn.connection.host}`))
    .catch(err => console.warn(`⚠️ MongoDB non connecté (${err.message}) — mode dégradé actif.`))
})

mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB déconnecté'))
mongoose.connection.on('reconnected',  () => console.log('🔄 MongoDB reconnecté'))
