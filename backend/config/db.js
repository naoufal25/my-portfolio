const mongoose = require('mongoose')

/**
 * Connexion à MongoDB Atlas ou local.
 * Appelé depuis server.js au démarrage.
 */
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`✅ MongoDB connecté : ${conn.connection.host}`)

    // Écoute des événements de connexion
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB déconnecté')
    })

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnecté')
    })

  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB : ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
