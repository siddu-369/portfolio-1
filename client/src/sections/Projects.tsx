import { ProjectCard } from '@/components/ProjectCard'

const projects = [
  {
    title: 'DevFlow — Dev Productivity App',
    description:
      'A Kanban-style task manager built for developers with GitHub integration, markdown support, and real-time collaboration.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    title: 'ShopSphere E-Commerce',
    description:
      'Full-featured e-commerce platform with Stripe payments, inventory management, and an admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    title: 'AI Content Generator',
    description:
      'SaaS tool that uses the OpenAI API to generate blog posts, social captions, and ad copy on demand.',
    tags: ['Next.js', 'OpenAI API', 'Tailwind', 'Vercel'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    title: 'Weather Dashboard',
    description:
      'Clean weather app with 7-day forecast, location search, and beautiful animated weather icons.',
    tags: ['React', 'TypeScript', 'OpenWeatherAPI'],
    github: 'https://github.com',
  },
  {
    title: 'CLI Task Manager',
    description:
      'A lightweight terminal task manager built in Node.js with persistent JSON storage.',
    tags: ['Node.js', 'Commander.js', 'JSON'],
    github: 'https://github.com',
  },
  {
    title: 'Portfolio Website',
    description:
      'This portfolio! A responsive dark-mode single pager with Express backend and contact form.',
    tags: ['React', 'Vite', 'Tailwind', 'Express'],
    github: 'https://github.com',
    demo: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">My work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Projects</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            A selection of things I've built — from side projects to production apps.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {/* Footer link */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm">
            More on{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
            >
              GitHub →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
