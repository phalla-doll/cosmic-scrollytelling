'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface PlanetProps {
  index: number;
  name: string;
  description: string;
  color: string;
  size: number; // Relative size (e.g., 1 for Earth)
  distance: string;
  type: string;
  facts: string[];
}

export default function PlanetSection({
  index,
  name,
  description,
  color,
  size,
  distance,
  type,
  facts,
}: PlanetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animations
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const planetY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Background stars/dust effect could go here */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
            isEven ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Planet Visual */}
          <motion.div
            style={{ y: planetY, scale, opacity }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ backgroundColor: color, transform: 'scale(1.2)' }}
              />
              {/* The Planet */}
              <motion.div
                className="relative rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{
                  rotate: planetRotate,
                  width: `${Math.max(120, size * 100)}px`,
                  height: `${Math.max(120, size * 100)}px`,
                  backgroundColor: color,
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%), linear-gradient(145deg, ${color} 0%, #000 100%)`,
                }}
              >
                {/* Texture overlay (simple CSS pattern) */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
              </motion.div>
              
              {/* Rings for Saturn */}
              {name === 'Saturn' && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[12px] border-yellow-800/40"
                  style={{
                    width: '180%',
                    height: '40%',
                    transform: 'translate(-50%, -50%) rotate(-20deg)',
                    boxShadow: '0 0 20px rgba(202, 138, 4, 0.3), inset 0 0 20px rgba(202, 138, 4, 0.3)'
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            style={{ y, opacity }}
            className="flex-1 space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-mono tracking-widest uppercase text-zinc-500">
                  0{index + 1}
                </span>
                <div className="h-px bg-zinc-800 flex-1" />
              </div>
              <h2
                className="text-6xl md:text-8xl font-display font-bold tracking-tighter"
                style={{ color }}
              >
                {name}
              </h2>
              <p className="text-xl md:text-2xl text-zinc-400 mt-4 font-light leading-relaxed">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Distance from Sun
                </p>
                <p className="text-lg font-medium">{distance}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Planet Type
                </p>
                <p className="text-lg font-medium">{type}</p>
              </div>
            </div>

            <ul className="space-y-3 pt-4">
              {facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-300">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" 
                    style={{ backgroundColor: color }} 
                  />
                  <span className="leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
