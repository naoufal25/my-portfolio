import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { contactService } from '../services/contactService'
import { useLanguage } from '../context/LanguageContext'

const INIT = { name: '', email: '', subject: '', message: '' }

const inputCls = `w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 
  placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 
  focus:ring-violet-500/30 transition-all duration-200 text-sm`

export default function Contact() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useLanguage()
  const [form,   setForm]   = useState(INIT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      label: t.contact.emailLabel,
      value: 'elbhiouinaoufal@gmail.com',
      href:  'mailto:elbhiouinaoufal@gmail.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      label: t.contact.locationLabel,
      value: t.contact.locationValue,
      href:  '#',
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: t.contact.linkedinLabel,
      value: 'Naoufal Elbhioui',
      href:  'https://www.linkedin.com/in/naoufal-elbhioui-bb4899342/',
    },
  ]

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = t.contact.errName
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = t.contact.errEmail
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = t.contact.errMessage
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await contactService.send(form)
      setStatus('success')
      setForm(INIT)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-16 md:py-28 bg-white dark:bg-dark-900 transition-colors duration-300 relative overflow-hidden scroll-mt-24">

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-10 md:mb-16">
          <p className="text-violet-600 dark:text-violet-400 font-mono text-xs sm:text-sm mb-3 tracking-widest uppercase">{t.contact.sectionTag}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t.contact.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Info side */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={isVisible ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.6, delay:0.1 }} className="lg:col-span-2 space-y-4 sm:space-y-5">

            {/* Contact cards */}
            {contactInfo.map((info) => (
              <motion.a key={info.label} href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:border-violet-200 dark:hover:border-violet-500 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-600 dark:group-hover:text-white transition-all flex-shrink-0">
                  {info.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-400 dark:text-gray-400 text-xs">{info.label}</p>
                  <p className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-medium group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-dark-800 dark:to-dark-900 border border-violet-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold">{t.contact.availableBadge}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t.contact.availableDesc}
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:30 }} animate={isVisible ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.6, delay:0.15 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit}
              className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-md space-y-4 sm:space-y-5">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-gray-600 dark:text-gray-300 text-xs mb-1.5 font-medium">
                    {t.contact.formFullName} <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <input id="name" name="name" type="text" value={form.name}
                    onChange={handleChange} placeholder={t.contact.formFullNamePlaceholder}
                    className={`${inputCls} ${errors.name ? 'border-red-500/60 focus:border-red-500' : ''}`} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 text-xs mb-1.5 font-medium">
                    {t.contact.formEmail} <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <input id="email" name="email" type="email" value={form.email}
                    onChange={handleChange} placeholder={t.contact.formEmailPlaceholder}
                    className={`${inputCls} ${errors.email ? 'border-red-500/60 focus:border-red-500' : ''}`} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-gray-600 dark:text-gray-300 text-xs mb-1.5 font-medium">{t.contact.formSubject}</label>
                <input id="subject" name="subject" type="text" value={form.subject}
                  onChange={handleChange} placeholder={t.contact.formSubjectPlaceholder}
                  className={inputCls} />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-600 dark:text-gray-300 text-xs mb-1.5 font-medium">
                  {t.contact.formMessage} <span className="text-violet-400">*</span>
                </label>
                <textarea id="message" name="message" rows={5} value={form.message}
                  onChange={handleChange} placeholder={t.contact.formMessagePlaceholder}
                  className={`${inputCls} resize-none ${errors.message ? 'border-red-500/60 focus:border-red-500' : ''}`} />
                <div className="flex items-center justify-between mt-1">
                  {errors.message
                    ? <p className="text-red-400 text-xs">{errors.message}</p>
                    : <span />}
                  <span className={`text-xs ${form.message.length > 1800 ? 'text-orange-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {form.message.length}/2000
                  </span>
                </div>
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/25 text-green-600 dark:text-green-400 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  {t.contact.successMsg}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-500 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {t.contact.errorMsg}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button type="submit" disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale:1.02 } : {}}
                whileTap={status !== 'loading' ? { scale:0.98 } : {}}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {t.contact.formSubmitting}
                  </>
                ) : (
                  <>
                    {t.contact.formSubmit}
                    <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
