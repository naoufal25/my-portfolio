import { motion } from 'framer-motion'
import profileImg from '../assets/img1.png'
import { useLanguage } from '../context/LanguageContext'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark-900 scroll-mt-24 transition-colors duration-300">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/80">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
              <span className="text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-medium">{t.hero.available}</span>
            </motion.div>

            <motion.h1 variants={item} className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              {t.hero.greeting}{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">Naoufal Elbhioui</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light mb-6">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono">&lt;</span> {t.hero.role} <span className="text-cyan-600 dark:text-cyan-400 font-mono">/&gt;</span>
            </motion.p>

            <motion.p variants={item} className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10">
              {t.hero.description}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.button onClick={() => scrollTo('projects')} whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 transition-colors">
                {t.hero.viewProjects}
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </motion.button>
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-4 mt-8 sm:mt-10">
              <span className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">{t.hero.findMeOn}</span>
              {[
                { href:'https://github.com/naoufal-elbhioui', label:'GitHub', d:'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                { href:'https://www.linkedin.com/in/naoufal-elbhioui-bb4899342/', label:'LinkedIn', d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} whileHover={{ scale:1.15, y:-2 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — blob + profile + floating tech badges */}
          <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.3 }}
            className="flex justify-center lg:justify-end mt-4 lg:mt-0">
            <motion.div
              animate={{ y:[0,-10,0] }}
              transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
              className="relative w-[260px] h-[320px] sm:w-[320px] sm:h-[380px] md:w-[380px] md:h-[440px]"
            >
              {/* Blob SVG background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 420" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="blobGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ede9fe" />
                      <stop offset="100%" stopColor="#e0f2fe" />
                    </linearGradient>
                    <linearGradient id="blobGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2e1065" />
                      <stop offset="100%" stopColor="#082f49" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M200,30 C270,20 340,70 360,140 C385,220 370,310 300,360 C230,410 120,420 65,360 C10,300 20,190 50,120 C80,50 130,40 200,30 Z"
                    className="fill-[url(#blobGradLight)] dark:fill-[url(#blobGradDark)] transition-colors duration-300"
                  />
                </svg>
              </div>

              {/* Profile photo — sits inside the blob, no circular crop */}
              <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                <img
                  src={profileImg}
                  alt="Naoufal Elbhioui"
                  className="h-[95%] w-auto object-contain object-bottom"
                  style={{ filter:'drop-shadow(0 20px 40px rgba(139,92,246,0.18))' }}
                />
              </div>

              {/* React badge — top right */}
              <motion.div
                initial={{ opacity:0, scale:0.5, y:10 }} animate={{ opacity:1, scale:1, y:0 }}
                transition={{ delay:0.9, duration:0.4 }}
                className="absolute -top-2 right-0 sm:-top-3 sm:-right-4 md:-right-8 bg-white dark:bg-dark-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-2.5 py-1.5 sm:px-3 sm:py-2.5 flex items-center gap-2 sm:gap-2.5"
              >
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#20232a] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="-11.5 -10.232 23 20.463" className="w-4 h-4 sm:w-5 sm:h-5" fill="#61DAFB">
                    <circle r="2.05" />
                    <g stroke="#61DAFB" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-400 leading-none mb-0.5">{t.hero.badgeFramework}</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 leading-none">React.js</p>
                </div>
              </motion.div>

              {/* Node.js badge — right middle */}
              <motion.div
                initial={{ opacity:0, scale:0.5, y:10 }} animate={{ opacity:1, scale:1, y:0 }}
                transition={{ delay:1.1, duration:0.4 }}
                className="absolute top-[48%] -right-2 sm:-right-6 md:-right-12 -translate-y-1/2 bg-white dark:bg-dark-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-2.5 py-1.5 sm:px-3 sm:py-2.5 flex items-center gap-2 sm:gap-2.5"
              >
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#026e00] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 256 289" className="w-4 h-4 sm:w-6 sm:h-6" fill="white">
                    <path d="M128 0C57.3 0 0 57.3 0 128c0 53 32.2 98.7 78.5 118.2-.8-7.3-.8-16.5.2-24.6l12.4-52.6s-3.2-6.4-3.2-15.8c0-14.8 8.6-25.8 19.3-25.8 9.1 0 13.5 6.8 13.5 15 0 9.1-5.8 22.8-8.8 35.4-2.5 10.6 5.3 19.2 15.7 19.2 18.8 0 31.4-24.2 31.4-52.9 0-21.8-14.7-38.1-41.3-38.1-30.1 0-49 21.9-49 46.4 0 8.4 2.5 14.4 6.3 19-.8 3.2-2.6 10.3-3 12.5-.5 2-.5 4.2 1.5 5.1 1.5.8 3.2 0 5-1.6 5.6-5.4 10.8-18.2 14.4-29.3 1.8-6.3 5.6-19.4 5.6-19.4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-400 leading-none mb-0.5">{t.hero.badgeBackend}</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 leading-none">Node.js</p>
                </div>
              </motion.div>

              {/* Laravel badge — left */}
              <motion.div
                initial={{ opacity:0, scale:0.5, y:10 }} animate={{ opacity:1, scale:1, y:0 }}
                transition={{ delay:1.3, duration:0.4 }}
                className="absolute top-[28%] -left-2 sm:-left-4 md:-left-10 bg-white dark:bg-dark-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-2.5 py-1.5 sm:px-3 sm:py-2.5 flex items-center gap-2 sm:gap-2.5"
              >
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#FF2D20] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 50 52" className="w-4 h-4 sm:w-6 sm:h-6" fill="white">
                    <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302-.012.007v10.509a.802.802 0 0 1-.4.694L20.42 51.162a.802.802 0 0 1-.698.004L.774 40.973A.802.802 0 0 1 .376 40.28V8.192a.762.762 0 0 1 .056-.27l.015-.042c.021-.045.042-.09.07-.128l.022-.03.03-.038.031-.025.026-.026 9.477-5.4a.802.802 0 0 1 .796 0l9.477 5.4.026.026.03.024.032.038.021.03c.028.039.05.083.071.129l.014.042a.804.804 0 0 1 .057.27v20.8l8.006-4.615V11.773a.801.801 0 0 1 .056-.27l.014-.042.071-.128.022-.03.03-.038.031-.026.026-.025 9.477-5.4a.803.803 0 0 1 .796 0l9.477 5.4.026.026.031.025.03.038.021.03c.028.039.05.083.071.129l.015.042z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-400 leading-none mb-0.5">{t.hero.badgeBackend}</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 leading-none">Laravel</p>
                </div>
              </motion.div>

              {/* Stats strip — bottom */}
              <motion.div
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:1.5, duration:0.4 }}
                className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-dark-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-3.5 py-2 sm:px-5 sm:py-3 flex items-center gap-2.5 sm:gap-4 whitespace-nowrap"
              >
                <div className="text-center">
                  <p className="text-sm sm:text-base font-extrabold text-violet-600 dark:text-violet-400">10+</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-400">{t.hero.statProjects}</p>
                </div>
                <div className="w-px h-6 sm:h-7 bg-gray-100 dark:bg-gray-700" />
                <div className="text-center">
                  <p className="text-sm sm:text-base font-extrabold text-cyan-600 dark:text-cyan-400">2+</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-400">{t.hero.statYears}</p>
                </div>
                <div className="w-px h-6 sm:h-7 bg-gray-100 dark:bg-gray-700" />
                <div className="text-center">
                  <p className="text-sm sm:text-base font-extrabold text-violet-600 dark:text-violet-400">5+</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-400">{t.hero.statTechs}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('about')}>
          <span className="text-gray-400 dark:text-gray-500 text-xs font-mono">scroll</span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.5, repeat:Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-violet-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
