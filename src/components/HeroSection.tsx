import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, Download, ArrowDown, ChevronRight } from 'lucide-react';

const roles = ['Full Stack Developer', 'Telecom Engineer', 'Problem Solver', 'Moringa Graduate'];

const Scene3DLazy = () => {
  const [Scene, setScene] = useState<React.ComponentType | null>(null);
  useEffect(() => {
    import('./Scene3D').then((mod) => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene />;
};

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    
    if (isTyping) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3DLazy />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center mt-16"
        >
          <img
            src="/profile.jpg"
            alt="Abdifatah Mursal"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-primary shadow-2xl object-cover object-top"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-extrabold mb-4 text-foreground"
        >
          Abdifatah <span className="text-gradient">Mursal</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-10 mb-6"
        >
          <span className="font-code text-xl sm:text-2xl text-primary">
            {displayText}<span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Building scalable web solutions for Kenyan businesses and beyond.{' '}
          <span className="font-code text-accent">1,000+</span> daily active users served.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a href="#projects" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:brightness-110 hover:scale-105 transition-all duration-300 glow-primary">
            <ChevronRight className="w-5 h-5" /> View My Work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex justify-center gap-5"
        >
          {[
            { icon: Github, href: 'https://github.com/Abdifatah4817', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/abdifatah-mursal', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:mursalabdifatah17@gmail.com', label: 'Email' },
            { icon: MessageCircle, href: 'https://wa.me/254740531856', label: 'WhatsApp' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary hover:glow-primary transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-sm">Scroll to explore</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
