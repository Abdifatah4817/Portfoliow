import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, BookOpen, LayoutGrid, List } from 'lucide-react';

const projects = [
  {
    title: 'FoodieFinder',
    description: 'Full-stack restaurant discovery platform solving "where to eat" for 1,000+ daily users.',
    longDesc: 'Everyone knows the struggle of deciding where to eat. Built a restaurant discovery platform with intelligent filtering by cuisine, price, and location. Mobile-first design with sub-200ms API responses.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    metric: '1,000+ Daily Users',
    features: ['Advanced filtering', 'Interactive cards', 'Mobile-first', 'Reviews system'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    links: { live: '#', github: 'https://github.com/Abdifatah4817', case: '#' },
  },
  {
    title: 'TaskFlow',
    description: 'Enterprise project management dashboard for team collaboration, reducing planning time by 40%.',
    longDesc: 'Teams were using scattered spreadsheets and multiple tools. Built a centralized dashboard where teams can assign tasks, track progress, and visualize project timelines — all in one place.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    metric: '40% Time Reduction',
    features: ['Real-time updates', 'Data visualizations', 'Team workload', 'JWT auth'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    links: { live: '#', github: 'https://github.com/Abdifatah4817', case: '#' },
  },
  {
    title: 'DevLinks API',
    description: 'Developer resource hub with comprehensive API for learning materials. 99.5% uptime.',
    longDesc: 'Developers waste hours searching for quality learning resources. Built a comprehensive REST API that curates and serves developer resources with robust documentation, rate limiting, and containerized deployment.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    metric: '99.5% Uptime',
    features: ['RESTful API', 'Swagger docs', 'Rate limiting', 'Docker containerized'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    links: { live: '#', github: 'https://github.com/Abdifatah4817', case: '#' },
  },
  {
    title: 'School Management System',
    description: 'Complete digitization solution for educational institutions. 60% admin work reduction.',
    longDesc: 'Schools struggle with manual administrative work — paper records, manual attendance, and scattered communication. Built a complete digitization platform handling student records, attendance, grades, and parent-teacher communication.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    metric: '60% Admin Reduction',
    features: ['Student records', 'Attendance', 'Grade book', 'Parent portal'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
    links: { live: '#', github: null, case: '#' },
  },
];

const techColors: Record<string, string> = {
  'React': 'bg-primary/20 text-primary',
  'Node.js': 'bg-accent/20 text-accent',
  'PostgreSQL': 'bg-secondary/20 text-secondary',
  'Tailwind': 'bg-primary/20 text-primary',
  'Chart.js': 'bg-accent/20 text-accent',
  'Express': 'bg-accent/20 text-accent',
  'Docker': 'bg-secondary/20 text-secondary',
};

const ProjectShowcase = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const allTech = [...new Set(projects.flatMap(p => p.tech))];
  const filtered = filter ? projects.filter(p => p.tech.includes(filter)) : projects;

  return (
    <section id="projects" className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Real applications serving real users with measurable impact.</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!filter ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              All
            </button>
            {allTech.map(t => (
              <button
                key={t}
                onClick={() => setFilter(filter === t ? null : t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <button onClick={() => setView('grid')} className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')} className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects */}
        <div className={view === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'flex flex-col gap-6'}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:glow-primary transition-all duration-300 ${view === 'list' ? 'flex flex-col md:flex-row' : ''}`}
            >
              <div className={`relative overflow-hidden ${view === 'list' ? 'md:w-80 flex-shrink-0' : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <span className="font-code text-xs bg-accent/90 text-accent-foreground px-3 py-1 rounded-full">
                    {project.metric}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className={`text-xs px-2 py-1 rounded-md font-code ${techColors[t] || 'bg-muted text-muted-foreground'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={project.links.live} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                  {project.links.github ? (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Github className="w-3.5 h-3.5" /> Private
                    </span>
                  )}
                  <a href={project.links.case} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <BookOpen className="w-3.5 h-3.5" /> Case Study
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
