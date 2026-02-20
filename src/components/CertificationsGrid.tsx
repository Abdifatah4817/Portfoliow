import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Clock } from 'lucide-react';

const certifications = [
  { title: 'Software Engineering', issuer: 'Moringa School', date: '2026', completed: true },
  { title: 'Agile with Jira', issuer: 'Coursera', date: 'Jan 2025', completed: true },
  { title: 'PostgreSQL Bootcamp', issuer: 'Udemy', date: 'Nov 2024', completed: true },
  { title: 'JavaScript Algorithms', issuer: 'freeCodeCamp', date: 'Sep 2024', completed: true },
  { title: 'Git & GitHub', issuer: 'LinkedIn Learning', date: 'Aug 2024', completed: true },
  { title: 'Web Development Bootcamp', issuer: 'Udemy', date: 'In Progress', completed: false },
];

const CertificationsGrid = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Certifications</h2>
          <p className="text-muted-foreground">Continuous learning across the stack</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 flex items-start gap-4"
            >
              <div className={`p-2 rounded-lg ${cert.completed ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                {cert.completed ? <Award className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-foreground text-sm">{cert.title}</h4>
                <p className="text-muted-foreground text-xs mt-1">{cert.issuer}</p>
                <p className="font-code text-xs text-accent mt-1">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsGrid;
