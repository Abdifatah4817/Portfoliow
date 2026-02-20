import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillGroups = [
  {
    title: 'Frontend',
    rating: '4.5/5',
    skills: [
      { name: 'React.js', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'JavaScript (ES6+)', level: 4.5 },
    ],
  },
  {
    title: 'Backend',
    rating: '4/5',
    skills: [
      { name: 'Node.js/Express', level: 4 },
      { name: 'REST APIs', level: 4.5 },
      { name: 'JWT Auth', level: 4 },
    ],
  },
  {
    title: 'Database',
    rating: '4/5',
    skills: [
      { name: 'PostgreSQL', level: 4 },
      { name: 'Schema Design', level: 4 },
      { name: 'Query Optimization', level: 4 },
    ],
  },
  {
    title: 'Tools & DevOps',
    rating: '3.5/5',
    skills: [
      { name: 'Docker', level: 3.5 },
      { name: 'Git/GitHub', level: 4.5 },
      { name: 'CI/CD (Learning)', level: 3 },
    ],
  },
  {
    title: 'Soft Skills',
    rating: '5/5',
    skills: [
      { name: 'Problem Solving', level: 5 },
      { name: 'Mentoring', level: 5 },
      { name: 'Communication', level: 5 },
    ],
  },
];

const SkillBar = ({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-foreground font-medium">{name}</span>
      <span className="font-code text-accent">{level}/5</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${(level / 5) * 100}%` } : {}}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 px-4 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground">Proficiency ratings based on real project experience</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold text-foreground">{group.title}</h3>
                <span className="font-code text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">{group.rating}</span>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} inView={inView} delay={gi * 0.1 + si * 0.15} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
