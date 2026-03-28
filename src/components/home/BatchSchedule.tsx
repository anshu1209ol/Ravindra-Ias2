import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Wifi, MapPin, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { BATCHES } from '../../constants';

const MODE_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Hybrid: { bg: 'bg-amber-500/10 border border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  Online: { bg: 'bg-green-500/10 border border-green-500/20', text: 'text-green-400', dot: 'bg-green-400' },
  Offline: { bg: 'bg-blue-500/10 border border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
};

export const BatchSchedule = () => (
  <section className="py-28 bg-zinc-950 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-50" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeading
        accent="Admissions"
        title="Upcoming Batch Schedule"
        subtitle="Plan your UPSC preparation with our carefully structured offline and online batches."
      />

      {/* Cards grid (responsive, replaces the table) */}
      <div className="space-y-4">
        {BATCHES.map((batch, i) => {
          const mode = MODE_STYLES[batch.mode] ?? MODE_STYLES['Online'];
          return (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl backdrop-blur-sm hover:border-amber-500/25 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer"
            >
              {/* Left: title */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center shrink-0">
                  <span className="text-amber-500 font-black text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base truncate">{batch.course}</h3>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-zinc-500 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                      {batch.date}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-500 text-xs">
                      <Clock className="w-3.5 h-3.5 text-zinc-600" />
                      {batch.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: mode badge + CTA */}
              <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${mode.bg} ${mode.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${mode.dot} animate-pulse`} />
                  {batch.mode === 'Online' ? <Wifi className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                  {batch.mode}
                </span>

                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1.5 text-amber-500 hover:text-amber-400 font-bold text-sm transition-colors group/btn"
                >
                  Inquire
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-600/10 via-amber-600/5 to-amber-600/10 border border-amber-600/20"
      >
        <div>
          <p className="text-white font-bold">Can't find the right batch?</p>
          <p className="text-zinc-400 text-sm">Talk to our counselor and get a custom schedule designed for you.</p>
        </div>
        <button className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors shrink-0">
          Talk to Counselor
        </button>
      </motion.div>
    </div>
  </section>
);
