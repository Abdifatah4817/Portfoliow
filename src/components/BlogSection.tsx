import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock } from 'lucide-react';

const posts = [
  { title: 'Building Scalable APIs with Node.js', tag: 'Backend' },
  { title: 'My Journey from Telecom to Full Stack', tag: 'Career' },
  { title: 'Optimizing PostgreSQL Queries', tag: 'Database' },
];

const BlogSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 px-4 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Latest Thoughts</h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center hover:border-primary/30 transition-all"
            >
              <span className="text-xs font-code text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">{post.tag}</span>
              <h4 className="font-bold text-foreground mb-3">{post.title}</h4>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-3.5 h-3.5" /> Coming Soon
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
