const nodemailer  = require('nodemailer')
const mongoose    = require('mongoose')
const ContactMsg  = require('../models/Contact')

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const buildOwnerHtml = ({ name, email, subject, message }) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:28px;text-align:center;">
    <h2 style="margin:0;font-size:22px;letter-spacing:-0.5px;">📬 Nouveau message — Portfolio</h2>
  </div>
  <div style="padding:32px;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:10px 0;color:#9ca3af;width:110px;font-size:13px;vertical-align:top;">Nom</td>
          <td style="padding:10px 0;color:#fff;font-weight:600;">${name}</td></tr>
      <tr><td style="padding:10px 0;color:#9ca3af;font-size:13px;vertical-align:top;">Email</td>
          <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
      <tr><td style="padding:10px 0;color:#9ca3af;font-size:13px;vertical-align:top;">Sujet</td>
          <td style="padding:10px 0;color:#fff;">${subject || '—'}</td></tr>
    </table>
    <div style="background:#12121a;border-left:4px solid #7c3aed;border-radius:8px;padding:20px;">
      <p style="margin:0;color:#d1d5db;line-height:1.7;white-space:pre-wrap;">${message}</p>
    </div>
    <p style="margin-top:24px;color:#4b5563;font-size:12px;">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
  </div>
</div>`

const buildConfirmHtml = ({ name, subject }) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:28px;text-align:center;">
    <h2 style="margin:0;font-size:22px;">Merci, ${name} ! 👋</h2>
  </div>
  <div style="padding:32px;">
    <p style="color:#d1d5db;line-height:1.7;">
      Votre message concernant <strong style="color:#fff;">"${subject || 'votre demande'}"</strong>
      a bien été reçu. Je m'engage à vous répondre dans les
      <strong style="color:#818cf8;">24 à 48 heures</strong>.
    </p>
    <p style="color:#d1d5db;line-height:1.7;">En attendant, n'hésitez pas à consulter mes projets !</p>
    <div style="text-align:center;margin-top:28px;">
      <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/#projects"
         style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;">
        Voir mes projets
      </a>
    </div>
    <p style="margin-top:32px;color:#6b7280;font-size:13px;">
      Cordialement,<br>
      <strong style="color:#9ca3af;">Naoufal Elbhioui</strong><br>
      Développeur Full Stack
    </p>
  </div>
</div>`

// ─── POST /api/contact ────────────────────────────────────────────────────────
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    // ── Validation ─────────────────────────────────────────────────────────────
    const errors = []
    if (!name?.trim() || name.trim().length < 2)
      errors.push('Le nom doit contenir au moins 2 caractères')
    if (!email?.trim() || !isValidEmail(email.trim()))
      errors.push('Adresse email invalide')
    if (!message?.trim() || message.trim().length < 10)
      errors.push('Le message doit contenir au moins 10 caractères')
    if (message?.trim().length > 2000)
      errors.push('Le message ne peut pas dépasser 2000 caractères')

    if (errors.length)
      return res.status(400).json({ success: false, message: errors.join('. ') })

    const payload = {
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      subject: subject?.trim() || 'Contact depuis le portfolio',
      message: message.trim(),
      ip: req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || '',
    }

    // ── Sauvegarde en base ─────────────────────────────────────────────────────
    try {
      if (mongoose.connection.readyState === 1) {
        await ContactMsg.create(payload)
      } else {
        console.log('[CONTACT BDD] MongoDB non connecté — message reçu avec succès.')
      }
    } catch (dbErr) {
      console.warn('[CONTACT BDD WARN] Échec sauvegarde BDD :', dbErr.message)
    }

    // ── Nodemailer ─────────────────────────────────────────────────────────────
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        })

        await Promise.all([
          // Email au propriétaire
          transporter.sendMail({
            from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to:      process.env.EMAIL_USER,
            replyTo: payload.email,
            subject: `📬 [Portfolio] ${payload.subject}`,
            html:    buildOwnerHtml(payload),
          }),
          // Confirmation à l'expéditeur
          transporter.sendMail({
            from:    `"Naoufal Elbhioui | Portfolio" <${process.env.EMAIL_USER}>`,
            to:      payload.email,
            subject: `✅ Message bien reçu — Je vous réponds bientôt !`,
            html:    buildConfirmHtml(payload),
          }),
        ])
      } catch (mailErr) {
        console.warn('[CONTACT EMAIL WARN] Échec envoi email :', mailErr.message)
      }
    } else {
      console.log('[CONTACT] EMAIL_USER/PASS non configurés — message traité.')
    }

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès !',
    })
  } catch (err) { next(err) }
}

// ─── GET /api/contact (admin) ─────────────────────────────────────────────────
const getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactMsg.find().sort({ createdAt: -1 }).lean()
    res.json({ success: true, count: messages.length, data: messages })
  } catch (err) { next(err) }
}

module.exports = { sendMessage, getAllMessages }
