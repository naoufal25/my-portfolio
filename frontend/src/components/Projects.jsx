import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-16 md:py-28 bg-gray-50 dark:bg-dark-800/60 transition-colors duration-300 relative overflow-hidden scroll-mt-24">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span className="text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">{t.projects.statusTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t.projects.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Coming Soon Hero Card */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.2 }}
          className="relative max-w-3xl mx-auto rounded-3xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-xl p-8 sm:p-12 text-center overflow-hidden mb-12"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-600/30 text-white text-4xl sm:text-5xl">
            🚀
          </div>
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-mono text-xs font-semibold mb-4">
            {t.projects.comingSoonBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {t.projects.comingSoonTitle}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
            {t.projects.comingSoonDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              className="px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-colors"
            >
              {t.projects.contactBtn}
            </motion.a>
            <motion.a
              href="https://github.com/naoufal-elbhioui" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              className="px-6 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500 font-semibold text-sm transition-all"
            >
              {t.projects.githubBtn}
            </motion.a>
          </div>
        </motion.div>

        {/* Upcoming preview cards grid */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: t.projects.card1Title,
              desc: t.projects.card1Desc,
              techs: ['React', 'Node.js', 'MongoDB'],
              icon: '🛒',
              status: t.projects.card1Status,
            },
            {
              title: t.projects.card2Title,
              desc: t.projects.card2Desc,
              techs: ['Laravel', 'React', 'MySQL'],
              icon: '💼',
              status: t.projects.card2Status,
            },
            {
              title: t.projects.card3Title,
              desc: t.projects.card3Desc,
              techs: ['React', 'Tailwind', 'Chart.js'],
              icon: '📊',
              status: t.projects.card3Status,
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y:-4 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/60">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-gray-900 dark:text-white font-bold text-base mb-2">{item.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{item.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-700">
                {item.techs.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-gray-50 dark:bg-dark-700 text-gray-500 dark:text-gray-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
