'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Starry Background */}
      <motion.div
        style={{ y: bgY, scale, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
        {/* Simple CSS stars */}
        <div className="absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-1/3 left-2/3 animate-pulse delay-75" />
        <div className="absolute w-2 h-2 bg-blue-200 rounded-full top-1/2 left-1/5 animate-pulse delay-150 blur-[1px]" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-3/4 left-1/2 animate-pulse delay-300" />
        <div className="absolute w-1.5 h-1.5 bg-orange-200 rounded-full top-1/5 left-4/5 animate-pulse delay-500 blur-[1px]" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-zinc-400 font-mono tracking-[0.3em] uppercase mb-6 text-sm md:text-base">
            A Journey Through The
          </p>
          <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter text-white mb-8 leading-none">
            SOLAR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-500">
              SYSTEM
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Scroll down to explore the planets that orbit our star, from the scorching surface of Mercury to the icy depths of Neptune.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
