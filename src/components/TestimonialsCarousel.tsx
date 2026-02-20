import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Abdifatah is one of the most dedicated learners I've mentored. His ability to grasp complex concepts and help others understand them is remarkable.",
    name: 'Kelvin Muriithi',
    role: 'Technical Mentor, Moringa School',
  },
  {
    text: "Working with Abdifatah on group projects was seamless. He brings both technical skill and excellent communication.",
    name: 'Faith Wanjiku',
    role: 'Classmate, Kenyatta University',
  },
  {
    text: "His attention to detail and commitment to clean code made our hackathon project stand out.",
    name: 'Brian Otieno',
    role: 'Hackathon Team Partner',
  },
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="py-24 px-4 bg-card/30" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-foreground mb-4">What People Say</h2>
        </motion.div>

        <div
          className="relative min-h-[200px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-2xl p-8 text-center"
            >
              <Quote className="w-8 h-8 text-primary/40 mx-auto mb-4" />
              <p className="text-foreground text-lg italic leading-relaxed mb-6">
                "{testimonials[current].text}"
              </p>
              <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-3 flex items-center justify-center text-primary font-bold text-lg">
                {testimonials[current].name.charAt(0)}
              </div>
              <p className="font-bold text-foreground">{testimonials[current].name}</p>
              <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-8' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
