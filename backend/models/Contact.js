const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      maxlength: [80, 'Nom trop long (max 80 caractères)'],
    },
    email: {
      type: String,
      required: [true, 'L\'email est obligatoire'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Adresse email invalide'],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [150, 'Sujet trop long (max 150 caractères)'],
      default: 'Contact depuis le portfolio',
    },
    message: {
      type: String,
      required: [true, 'Le message est obligatoire'],
      trim: true,
      minlength: [10, 'Le message doit contenir au moins 10 caractères'],
      maxlength: [2000, 'Message trop long (max 2000 caractères)'],
    },
    ip: {
      type: String,
      default: '',
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

contactSchema.index({ createdAt: -1 })
contactSchema.index({ email: 1 })

module.exports = mongoose.model('Contact', contactSchema)
