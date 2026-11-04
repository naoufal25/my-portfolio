const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true,
      maxlength: [120, 'Titre trop long (max 120 caractères)'],
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
      trim: true,
      maxlength: [600, 'Description trop longue (max 600 caractères)'],
    },
    longDescription: {
      type: String,
      trim: true,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: 'Maximum 10 technologies par projet',
      },
    },
    // Alias tags → technologies (rétro-compatibilité frontend)
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    emoji: {
      type: String,
      default: '🚀',
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\//, 'L\'URL GitHub doit commencer par http(s)://'],
    },
    demoUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\//, 'L\'URL de démo doit commencer par http(s)://'],
    },
    // Raccourcis pour rétro-compat frontend
    github: { type: String, trim: true, default: '' },
    demo:   { type: String, trim: true, default: '' },

    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,         // createdAt + updatedAt automatiques
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
)

// ── Pré-save : synchroniser github/demo ↔ githubUrl/demoUrl ─────────────────
projectSchema.pre('save', function (next) {
  if (this.githubUrl && !this.github) this.github = this.githubUrl
  if (this.github   && !this.githubUrl) this.githubUrl = this.github
  if (this.demoUrl  && !this.demo)   this.demo    = this.demoUrl
  if (this.demo     && !this.demoUrl)  this.demoUrl  = this.demo
  if (!this.tags.length && this.technologies.length) this.tags = this.technologies
  if (!this.technologies.length && this.tags.length) this.technologies = this.tags
  next()
})

// ── Virtuel : nombre de technologies ─────────────────────────────────────────
projectSchema.virtual('techCount').get(function () {
  return this.technologies.length || this.tags.length
})

// ── Index pour les requêtes fréquentes ───────────────────────────────────────
projectSchema.index({ featured: 1, order: 1 })
projectSchema.index({ tags: 1 })
projectSchema.index({ technologies: 1 })
projectSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Project', projectSchema)
