import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'

export default function Skills() {
  const [active, setActive] = useState('frontend')
  const { ref, isVisible } = useScrollReveal()
  const { t } = useLanguage()

  const categories = [
    {
      key: 'frontend',
      label: t.skills.frontend,
      icon: '🎨',
      color: 'from-violet-500 to-pink-500',
      skills: [
        { name: 'HTML5',       level: 95, color: 'from-orange-500 to-red-500' },
        { name: 'CSS3',        level: 90, color: 'from-blue-500 to-cyan-400' },
        { name: 'JavaScript',  level: 85, color: 'from-yellow-400 to-orange-400' },
        { name: 'React.js',    level: 80, color: 'from-cyan-400 to-blue-500' },
      ],
    },
    {
      key: 'backend',
      label: t.skills.backend,
      icon: '⚙️',
      color: 'from-cyan-500 to-blue-600',
      skills: [
        { name: 'Node.js',   level: 75, color: 'from-green-500 to-emerald-400' },
        { name: 'Express.js',level: 70, color: 'from-gray-400 to-gray-300' },
        { name: 'MongoDB',   level: 70, color: 'from-green-600 to-green-400' },
        { name: 'Laravel',   level: 75, color: 'from-red-500 to-rose-600' },
      ],
    },
    {
      key: 'tools',
      label: t.skills.tools,
      icon: '🛠️',
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'Git / GitHub', level: 85, color: 'from-orange-600 to-red-500' },
        { name: 'Docker',       level: 60, color: 'from-blue-600 to-cyan-500' },
        { name: 'Figma',        level: 65, color: 'from-violet-500 to-pink-500' },
      ],
    },
  ]

  const techStack = [
    'React','TypeScript','Node.js','Express','MongoDB','Laravel','Tailwind CSS',
    'Git','Docker','REST API','JWT','Vite','Redux','Mongoose','Figma','Postman',
  ]

  const current = categories.find(c => c.key === active) || categories[0]

  return (
    <section id="skills" className="py-16 md:py-28 bg-white dark:bg-dark-900 transition-colors duration-300 relative overflow-hidden scroll-mt-24">

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-12 md:mb-20"
        >
          <p className="text-violet-600 dark:text-violet-400 font-mono text-xs sm:text-sm mb-3 tracking-widest uppercase">{t.skills.sectionTag}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t.skills.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5, delay:0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-14"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              className={`relative flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                active === cat.key
                  ? 'text-white shadow-lg shadow-violet-600/30'
                  : 'bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {active === cat.key && (
                <motion.div layoutId="tab-bg"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cat.color}`}
                  transition={{ type:'spring', stiffness:380, damping:30 }}
                />
              )}
              <span className="relative z-10">{cat.icon}</span>
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Skill bars */}
          <motion.div
            key={active}
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.4 }}
            className="space-y-7"
          >
            {current.skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                  <span className="text-sm font-mono text-gray-400 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-lg`}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Radar / visual side */}
          <motion.div
            initial={{ opacity:0, x:20 }} animate={isVisible ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.6, delay:0.2 }}
            className="flex flex-col gap-6"
          >
            {current.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity:0, scale:0.9 }}
                animate={isVisible ? { opacity:1, scale:1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale:1.02 }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:border-violet-200 dark:hover:border-violet-500 hover:shadow-md transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}>
                  {skill.level}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold mb-1.5">{skill.name}</p>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width:0 }}
                      animate={isVisible ? { width:`${skill.level}%` } : {}}
                      transition={{ duration:1, delay: 0.5 + i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={isVisible ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.5 }} className="mt-20 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-mono">{t.about.techMastered}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity:0, scale:0.8 }}
                animate={isVisible ? { opacity:1, scale:1 } : {}}
                transition={{ delay: 0.6 + i * 0.04 }}
                whileHover={{ scale:1.1, y:-3 }}
                className="px-4 py-2 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 text-sm hover:border-violet-300 dark:hover:border-violet-500 hover:text-violet-700 dark:hover:text-violet-400 transition-all cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
