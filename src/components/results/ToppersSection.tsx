import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { TOPPERS } from '../../constants';
import { Quote, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export const ToppersSection = () => {
  const scrollTo = useScrollToSection();

  return (
    <section id="toppers" className="py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          accent="Results 2024"
          title="The Hall of Fame"
          subtitle="Meet the aspirants who turned their dreams into reality with Ravindra IAS. Their success is our greatest achievement."
        />

        <div className="grid md:grid-cols-3 gap-10">
          {TOPPERS.map((topper, i) => (
            <motion.div
              key={topper.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl shadow-black/40 border border-zinc-800/80"
            >
              {/* Image with zoom effect */}
              <img 
                src={topper.image} 
                alt={topper.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Topper Badge */}
              <div className="absolute top-6 right-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-black rounded-2xl shadow-lg flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5" />
                  {topper.rank}
                </motion.div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-white leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {topper.name}
                  </h3>
                  <div className="flex items-center gap-2 text-amber-500 text-[11px] font-bold uppercase tracking-[0.2em]">
                    <Sparkles className="w-3 h-3" />
                    UPSC CSE {topper.year}
                  </div>
                </div>

                <div className="relative pt-4 overflow-hidden">
                  <Quote className="absolute -top-1 -left-1 w-12 h-12 text-white/5 -z-10" />
                  <p className="text-zinc-300 text-sm leading-relaxed italic line-clamp-4 relative z-10 pl-2">
                    "{topper.story}"
                  </p>
                </div>
                
                {/* Visual accent bar */}
                <div className="h-1 w-12 bg-amber-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/30 transition-colors duration-500 rounded-[40px] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View all results button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/results"
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 font-bold hover:text-white hover:border-amber-500/50 hover:bg-zinc-800 transition-all group inline-block text-center"
          >
            Our Legacy Continues —{' '}
            <span className="text-amber-500 group-hover:text-amber-400">View All Selections</span>
          </Link>
          <button
            type="button"
            onClick={() => scrollTo('enroll')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold shadow-lg shadow-amber-900/30 hover:from-amber-500 hover:to-amber-400 transition-all"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};
