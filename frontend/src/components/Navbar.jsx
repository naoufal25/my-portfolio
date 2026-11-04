import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const LANGUAGES = [
  { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'ENG', name: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'AR', name: 'العربية', flag: '🇲🇦' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [active,       setActive]       = useState('hero')
  const dropdownRef = useRef(null)

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  const navLinks = [
    { label: t.nav.home,     href: '#hero' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.skills,   href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setLangDropdown(false)

    const targetId = href.replace('#', '')

    const scrollToTarget = () => {
      const el = document.getElementById(targetId)
      if (el) {
        const yOffset = -80
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scrollToTarget, 300)
    } else {
      setTimeout(scrollToTarget, 100)
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = ['hero', 'about', 'skills', 'projects', 'contact']
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(ids[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to lg screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-gray-800 py-3'
          : 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md py-5'
      }`}
    >
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="relative max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('#hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white text-base sm:text-lg shadow-lg shadow-violet-600/40">
              N
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl tracking-tight">
              Naoufal<span className="text-violet-600">.</span>dev
            </span>
          </motion.button>

          {/* Desktop links — absolutely centred on large screens */}
          <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive ? 'text-violet-700 dark:text-violet-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-violet-50 dark:bg-violet-950/60 rounded-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Theme Toggle + Language Dropdown + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100/90 dark:bg-gray-800/90 border border-gray-200/90 dark:border-gray-700/90 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 hover:border-violet-300 dark:hover:border-violet-500 transition-all shadow-sm flex items-center justify-center"
              aria-label="Toggle theme"
              title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? (
                  /* Sun Icon for Light mode */
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  /* Moon Icon for Dark mode */
                  <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.div>
            </button>

            {/* Language Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/90 dark:bg-gray-800/90 border border-gray-200/90 dark:border-gray-700/90 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 hover:border-violet-300 dark:hover:border-violet-500 text-xs sm:text-sm font-bold transition-all shadow-sm"
                aria-label="Select language"
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.label}</span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${langDropdown ? 'rotate-180 text-violet-600' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 ltr:right-0 rtl:left-0 mt-2 w-40 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-xl py-1.5 z-50 overflow-hidden"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code)
                          setLangDropdown(false)
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold transition-all ${
                          lang === l.code
                            ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 font-bold'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{l.flag}</span>
                          <span>{l.name}</span>
                        </div>
                        {lang === l.code && (
                          <svg className="w-4 h-4 text-violet-600 dark:text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div animate={menuOpen ? 'open' : 'closed'} className="w-6 h-5 flex flex-col justify-between">
                <motion.span variants={{ open: { rotate: 45, y: 9 }, closed: { rotate: 0, y: 0 } }} className="block h-0.5 w-full bg-current origin-left transition-all" />
                <motion.span variants={{ open: { opacity: 0, x: -10 }, closed: { opacity: 1, x: 0 } }} className="block h-0.5 w-full bg-current" />
                <motion.span variants={{ open: { rotate: -45, y: -9 }, closed: { rotate: 0, y: 0 } }} className="block h-0.5 w-full bg-current origin-left transition-all" />
              </motion.div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mx-4 mt-2 bg-white/98 dark:bg-dark-800/98 backdrop-blur-xl border border-gray-100 dark:border-gray-700 shadow-lg rounded-2xl p-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left ltr:text-left rtl:text-right px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 active:bg-gray-100 dark:active:bg-gray-700 transition-all text-sm font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
