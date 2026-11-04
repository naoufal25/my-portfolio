import api from './api'

/**
 * Contact service — wraps the /api/contact endpoint.
 */
export const contactService = {
  /**
   * Send a contact message.
   * @param {{ name: string, email: string, subject: string, message: string }} data
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  send: async (data) => {
    try {
      const response = await api.post('/contact', data)
      return response
    } catch (err) {
      console.warn('[Contact Service] Backend non joignable ou erreur API, fallback actif:', err.message)
      // Fallback local ou mailto
      const mailtoUrl = `mailto:elbhiouinaoufal@gmail.com?subject=${encodeURIComponent(data.subject || 'Contact Portfolio')}&body=${encodeURIComponent(`De: ${data.name} (${data.email})\n\n${data.message}`)}`
      window.open(mailtoUrl, '_blank')
      return {
        success: true,
        message: 'Message transmis avec succès ! (Client email ouvert)',
      }
    }
  },
}
