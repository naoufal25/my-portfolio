import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const year = new Date().getFullYear()

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/naoufal-elbhioui',
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/naoufal-elbhioui-bb4899342/',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

const scrollTo = (id) =>
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { label: t.nav.home,     href: '#hero' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.skills,   href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-dark-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      {/* CTA Banner */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t.footer.ctaTitle}{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                {t.footer.ctaHighlight}
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
              {t.footer.ctaSubtitle}
            </p>
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79,70,229,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-colors"
            >
              {t.footer.contactBtn}
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white text-lg">
                N
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-xl">Naoufal<span className="text-violet-600">.</span>dev</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer.brandDesc}
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.navHeader}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-violet-400 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.contactHeader}</h4>
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-violet-600 dark:text-violet-400">📧</span>
                <a href="mailto:elbhiouinaoufal@gmail.com" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  elbhiouinaoufal@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-violet-600 dark:text-violet-400">📍</span>
                {t.contact.locationValue}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-600 dark:text-green-400 font-medium">{t.contact.availableBadge}</span>
              </p>
            </div>

            {/* Stack badges */}
            <div className="mt-6">
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-3">{t.footer.stackHeader}</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Laravel', 'MongoDB', 'Tailwind'].map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg text-gray-500 dark:text-gray-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {year} <span className="text-gray-700 dark:text-gray-300">Naoufal Elbhioui</span>. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
