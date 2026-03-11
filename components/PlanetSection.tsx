'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animations
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
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
            style={{ y: planetY, scale: scrollScale, opacity }}
            className="flex-1 flex justify-center items-center"
          >
            <motion.div 
              className="relative cursor-pointer group flex items-center justify-center"
              style={{
                width: `${Math.max(120, size * 100)}px`,
                height: `${Math.max(120, size * 100)}px`,
              }}
              onClick={() => setIsExpanded(!isExpanded)}
              animate={{ scale: isExpanded ? 1.4 : 1 }}
              whileHover={{ scale: isExpanded ? 1.4 : 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                animate={{ 
                  opacity: isExpanded ? 0.6 : 0.3,
                  scale: isExpanded ? 1.4 : 1.2 
                }}
                whileHover={{
                  opacity: isExpanded ? 0.6 : 0.8,
                  scale: isExpanded ? 1.4 : 1.35
                }}
                transition={{ duration: 0.4 }}
                style={{ backgroundColor: color }}
              />

              {/* Rings for Saturn (Back half) */}
              {name === 'Saturn' && (
                <div 
                  className="absolute top-1/2 left-1/2 rounded-[50%] pointer-events-none"
                  style={{
                    width: '300%',
                    height: '300%',
                    transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(-15deg) rotateZ(-15deg)',
                    background: 'linear-gradient(160deg, rgb(245, 225, 180) 0%, rgb(210, 180, 120) 30%, rgb(140, 100, 60) 70%, rgb(50, 30, 15) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle closest-side, transparent 38%, rgba(0,0,0,0.3) 39%, rgba(0,0,0,0.7) 46%, transparent 48%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.8) 64%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.1) 78%, transparent 80%)',
                    maskImage: 'radial-gradient(circle closest-side, transparent 38%, rgba(0,0,0,0.3) 39%, rgba(0,0,0,0.7) 46%, transparent 48%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.8) 64%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.1) 78%, transparent 80%)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* The Planet */}
              <motion.div
                className="absolute inset-0 rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.5)]"
                style={{
                  rotate: planetRotate,
                  backgroundColor: color,
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%), linear-gradient(145deg, ${color} 0%, #000 100%)`,
                  zIndex: 10,
                }}
              >
                {/* Texture overlay (simple CSS pattern) */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>

                {/* Earth Clouds */}
                {name === 'Earth' && (
                  <motion.div
                    className="absolute inset-0 opacity-60 mix-blend-screen"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='clouds'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23clouds)'/%3E%3C/svg%3E")`,
                      backgroundSize: 'cover'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  />
                )}

                {/* Venus Clouds */}
                {name === 'Venus' && (
                  <motion.div
                    className="absolute inset-0 opacity-70 mix-blend-screen"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='venus'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.9 0 0 0 0 0.8 0 0 0 0 0.4 1 0 0 0 -0.1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23venus)'/%3E%3C/svg%3E")`,
                      backgroundSize: 'cover'
                    }}
                    animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                    transition={{ 
                      rotate: { duration: 80, repeat: Infinity, ease: "linear" },
                      scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                )}

                {/* Mars Dust Storms */}
                {name === 'Mars' && (
                  <motion.div
                    className="absolute inset-0 opacity-40 mix-blend-color-dodge"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='mars'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.9 0 0 0 0 0.4 0 0 0 0 0.1 1 0 0 0 -0.3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23mars)'/%3E%3C/svg%3E")`,
                      backgroundSize: 'cover'
                    }}
                    animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
                    transition={{ 
                      rotate: { duration: 100, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                )}

                {/* Jupiter Bands */}
                {name === 'Jupiter' && (
                  <div className="absolute inset-0 flex flex-col justify-between opacity-40 mix-blend-overlay overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[200%] flex-1"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
                        }}
                        animate={{ x: i % 2 === 0 ? ['-50%', '0%'] : ['0%', '-50%'] }}
                        transition={{ duration: 15 + (i % 3) * 5, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                  </div>
                )}

                {/* Uranus Vertical Bands */}
                {name === 'Uranus' && (
                  <div className="absolute inset-0 flex justify-between opacity-30 mix-blend-overlay overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-[200%] flex-1"
                        style={{
                          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.3) 80%, transparent 100%)',
                        }}
                        animate={{ y: i % 2 === 0 ? ['-50%', '0%'] : ['0%', '-50%'] }}
                        transition={{ duration: 20 + (i % 2) * 10, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                  </div>
                )}

                {/* Neptune High-Speed Winds */}
                {name === 'Neptune' && (
                  <div className="absolute inset-0 flex flex-col justify-around opacity-60 mix-blend-screen overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-3 w-[300%]"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 10%, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                        }}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                  </div>
                )}

                {/* Atmospheric Glow Pulse */}
                {['Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].includes(name) && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 30px ${color}80, 0 0 20px ${color}40`
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.div>
              
              {/* Rings for Saturn (Front half) */}
              {name === 'Saturn' && (
                <div 
                  className="absolute top-1/2 left-1/2 rounded-[50%] pointer-events-none"
                  style={{
                    width: '300%',
                    height: '300%',
                    transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(-15deg) rotateZ(-15deg)',
                    background: 'linear-gradient(160deg, rgb(245, 225, 180) 0%, rgb(210, 180, 120) 30%, rgb(140, 100, 60) 70%, rgb(50, 30, 15) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle closest-side, transparent 38%, rgba(0,0,0,0.3) 39%, rgba(0,0,0,0.7) 46%, transparent 48%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.8) 64%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.1) 78%, transparent 80%)',
                    maskImage: 'radial-gradient(circle closest-side, transparent 38%, rgba(0,0,0,0.3) 39%, rgba(0,0,0,0.7) 46%, transparent 48%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.8) 64%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.1) 78%, transparent 80%)',
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                    zIndex: 20,
                  }}
                />
              )}

              {/* Hover/Active Hint */}
              <motion.div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                style={{ zIndex: 30 }}
              >
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-full text-white shadow-lg border border-white/10">
                  {isExpanded ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
                </div>
              </motion.div>
            </motion.div>
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

            {/* Expandable Detailed Info */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-display font-semibold mb-3 flex items-center gap-2" style={{ color }}>
                      <Search className="w-5 h-5" />
                      Detailed Observation
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      Detailed scans of {name} reveal a complex {type.toLowerCase()} environment. 
                      Located approximately {distance} from the Sun, its relative mass and gravitational pull significantly influence its immediate cosmic neighborhood. 
                      Further analysis of its {size < 1 ? 'terrestrial surface' : 'gaseous envelope'} continues to provide vital clues about the early formation of our solar system.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
