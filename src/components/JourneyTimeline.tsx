import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';

const timelineData = [
  {
    year: '2025–2026',
    items: [
      { icon: '🎓', title: 'Moringa School — Software Engineering', detail: 'Completed 1,000+ hours of intensive full-stack training. Built 7+ production applications with React, Node.js, and PostgreSQL.' },
      { icon: '🏆', title: 'Hackathon 2nd Place', detail: 'Built a disaster response platform in 48 hours. Led a team of 4, handling full-stack architecture and real-time data features.' },
    ],
  },
  {
    year: '2024 (Present)',
    items: [
      { icon: '🎓', title: 'Kenyatta University — Dean\'s List', detail: 'Achieved 3.6/4.0 GPA. Focused on computer science fundamentals and telecommunication systems.' },
      { icon: '👥', title: 'Mentored 10+ Junior Developers', detail: 'Guided peers through software engineering concepts, code reviews, and project architecture.' },
      { icon: '📚', title: '5+ Professional Certifications', detail: 'Earned certifications in PostgreSQL, Agile, Git/GitHub, and JavaScript algorithms.' },
    ],
  },
  {
    year: '2023–2024',
    items: [
      { icon: '📱', title: 'Diploma — Computer Packages (92%)', detail: 'Graduated with distinction, building foundational IT skills.' },
      { icon: '🔧', title: 'Telecommunication Background', detail: 'Started career in telecom, gaining deep understanding of network infrastructure and systems.' },
    ],
  },
];

const JourneyTimeline = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="journey" className="py-24 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-foreground mb-4">My Journey</h2>
          <p className="text-muted-foreground">From telecommunication to full-stack development</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          {timelineData.map((period, pi) => (
            <div key={period.year} className="mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: pi * 0.2 }}
                className="relative flex justify-start md:justify-center mb-6"
              >
                <span className="ml-10 md:ml-0 font-code text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-bold">
                  {period.year}
                </span>
              </motion.div>

              {period.items.map((item, ii) => {
                const key = `${pi}-${ii}`;
                const isExpanded = expanded === key;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: ii % 2 === 0 ? -30 : 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: pi * 0.2 + ii * 0.15 }}
                    className="relative pl-12 md:pl-0 mb-6 md:w-1/2 md:even:ml-auto md:odd:mr-auto md:odd:pr-8 md:even:pl-8"
                  >
                    {/* Dot */}
                    <div className="absolute left-2.5 md:left-auto md:right-auto top-2 w-3 h-3 bg-primary rounded-full border-2 border-background md:odd:-right-1.5 md:even:-left-1.5" style={{ left: undefined }} />
                    
                    <button
                      onClick={() => setExpanded(isExpanded ? null : key)}
                      className="w-full text-left bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      {isExpanded && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-muted-foreground text-sm mt-3 ml-8"
                        >
                          {item.detail}
                        </motion.p>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
