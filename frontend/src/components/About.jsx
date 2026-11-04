import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import profileImg from '../assets/img1.png'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 md:py-28 bg-gray-50 dark:bg-dark-800/60 transition-colors duration-300 relative overflow-hidden scroll-mt-24">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-violet-600 dark:text-violet-400 font-mono text-xs sm:text-sm mb-3 tracking-widest uppercase">{t.about.sectionTag}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t.about.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — presentation */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
            initial="hidden" animate={isVisible ? 'show' : 'hidden'}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t.about.subtitle}
            </h3>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
              <p>{t.about.bio3}</p>
            </div>

            {/* Quality Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { title: t.about.card1Title, desc: t.about.card1Desc, icon: '✨' },
                { title: t.about.card2Title, desc: t.about.card2Desc, icon: '📱' },
                { title: t.about.card3Title, desc: t.about.card3Desc, icon: '⚡' },
              ].map((c) => (
                <div key={c.title} className="p-4 rounded-xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <span className="text-xl mb-2 block">{c.icon}</span>
                  <h4 className="text-gray-900 dark:text-white font-bold text-xs mb-1">{c.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — avatar card */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2, ease: 'easeOut' } } }}
            initial="hidden" animate={isVisible ? 'show' : 'hidden'}
            className="flex justify-center lg:justify-end"
          >
            {/* Avatar card */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-dark-800 dark:to-dark-900 p-8 sm:p-10 text-center flex flex-col items-center">
              <img src={profileImg} alt="Naoufal Elbhioui" className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover mb-5 shadow-xl shadow-violet-600/30 border-4 border-white dark:border-dark-700" />
              <h3 className="text-gray-900 dark:text-white font-bold text-2xl mb-1">Naoufal Elbhioui</h3>
              <p className="text-violet-600 dark:text-violet-400 text-base font-mono mb-4">{t.hero.role}</p>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-dark-800/80 border border-gray-100 dark:border-gray-700 shadow-sm text-sm text-gray-700 dark:text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span>{t.contact.locationValue} 🇲🇦</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
