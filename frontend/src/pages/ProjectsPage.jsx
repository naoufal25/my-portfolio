import Projects from '../components/Projects'

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-6 pb-12 text-center">
        <h1 className="text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Tous mes <span className="gradient-text">Projets</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          L'ensemble de mes réalisations techniques
        </p>
      </div>
      <Projects />
    </div>
  )
}
