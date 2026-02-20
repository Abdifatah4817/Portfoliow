import { Github, Linkedin, Mail, MessageCircle, ArrowUp, FileText } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border bg-card/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:brightness-110 transition-all text-sm">
              <FileText className="w-4 h-4" /> Download CV (PDF)
            </a>
          </div>
          <div className="flex gap-4">
            {[
              { icon: Github, href: 'https://github.com/Abdifatah4817' },
              { icon: Linkedin, href: 'https://linkedin.com/in/abdifatah-mursal' },
              { icon: Mail, href: 'mailto:contact@example.com' },
              { icon: MessageCircle, href: '#' },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Abdifatah Mursal. All rights reserved.</p>
          <p className="font-code text-xs">Built with React & Three.js</p>
          <button onClick={scrollToTop} className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
