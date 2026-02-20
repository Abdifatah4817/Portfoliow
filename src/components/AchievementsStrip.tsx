import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const achievements = [
  { icon: '🏆', label: 'Hackathon 2025', value: 2, suffix: 'nd Place', prefix: '' },
  { icon: '👥', label: 'Developers Mentored', value: 10, suffix: '+', prefix: '' },
  { icon: '🚀', label: 'Production Apps', value: 7, suffix: '', prefix: '' },
  { icon: '📊', label: 'Daily Active Users', value: 1000, suffix: '+', prefix: '' },
  { icon: '🎓', label: 'GPA (Dean\'s List)', value: 3.6, suffix: '/4.0', prefix: '', decimals: 1 },
];

const AchievementsStrip = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-12 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-muted/50 hover:glow-accent transition-all duration-300 group"
            >
              <span className="text-3xl mb-2">{a.icon}</span>
              <div className="font-code text-2xl font-bold text-accent">
                {inView ? (
                  <CountUp
                    end={a.value}
                    duration={2}
                    suffix={a.suffix}
                    prefix={a.prefix}
                    decimals={a.decimals || 0}
                  />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-1">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsStrip;
