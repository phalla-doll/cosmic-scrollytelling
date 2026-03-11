'use client';

import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-24 border-t border-zinc-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6 text-white">
            Beyond the Stars
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12 font-light leading-relaxed">
            Our solar system is just one tiny speck in the vast cosmic ocean. The universe is full of mysteries waiting to be discovered.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 mx-auto px-8 py-4 rounded-full border border-zinc-800 hover:border-white transition-colors duration-300"
          >
            <span className="font-mono text-sm uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
              Return to Earth
            </span>
            <ArrowUp className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:-translate-y-1 transition-all" />
          </button>
        </motion.div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-zinc-900/20 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
}
