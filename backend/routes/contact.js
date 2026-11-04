const express    = require('express')
const rateLimit  = require('express-rate-limit')
const router     = express.Router()
const { sendMessage, getAllMessages } = require('../controllers/contactController')

// Rate limiter spécifique : max 5 messages par heure par IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de messages envoyés. Veuillez réessayer dans une heure.',
  },
  keyGenerator: (req) =>
    req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress,
})

// POST /api/contact  — envoyer un message (rate limited)
router.post('/', contactLimiter, sendMessage)

// GET  /api/contact  — lister tous les messages (admin, non protégé ici)
router.get('/', getAllMessages)

module.exports = router
