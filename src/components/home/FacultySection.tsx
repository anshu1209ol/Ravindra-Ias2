import React from 'react';
import { motion } from 'motion/react';
import { FACULTIES } from '../../constants';
import { SectionHeading } from '../ui/SectionHeading';
import { Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const FacultySection = () => {
  const [index, setIndex] = React.useState(0);
  const [perView, setPerView] = React.useState(1);

  React.useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      if (w >= 1024) setPerView(Math.min(4, FACULTIES.length));
      else if (w >= 768) setPerView(Math.min(2, FACULTIES.length));
      else setPerView(1);
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);

  const maxStart = Math.max(0, FACULTIES.length - perView);

  React.useEffect(() => {
    setIndex((i) => Math.min(i, maxStart));
  }, [maxStart]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxStart, i + 1));

  const visible = FACULTIES.slice(index, index + perView);
  const pages = maxStart + 1;

  return (
    <section id="mentors" className="py-24 relative overflow-hidden bg-zinc-950/50">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <SectionHeading
            title="Expert Faculty"
            subtitle="Guidance from India's most dedicated UPSC mentors."
            accent="The Mentors"
            centered={false}
            className="mb-0"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="w-12 h-12 rounded-full glass border border-zinc-800 hover:border-amber-500/40 hover:bg-amber-600/10 flex items-center justify-center text-zinc-400 hover:text-amber-500 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index >= maxStart}
              className="w-12 h-12 rounded-full glass border border-zinc-800 hover:border-amber-500/40 hover:bg-amber-600/10 flex items-center justify-center text-zinc-400 hover:text-amber-500 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            'grid gap-6 min-h-[300px]',
            perView >= 4 && 'sm:grid-cols-2 lg:grid-cols-4',
            perView === 2 && 'md:grid-cols-2',
            perView === 1 && 'grid-cols-1'
          )}
        >
          {visible.map((faculty) => (
            <motion.div
              key={`${faculty.id}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="glass rounded-[24px] overflow-hidden border border-zinc-800/80 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10 bg-zinc-900/40 backdrop-blur-md h-full">
                <div className="p-6 pb-2 text-center">
                  <div className="relative inline-block">
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-amber-500/20 group-hover:border-amber-500/50 transition-colors duration-500">
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="absolute -bottom-1 right-2 w-7 h-7 bg-amber-600 rounded-full flex items-center justify-center border-2 border-zinc-900">
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-2 text-center space-y-3">
                  <div className="space-y-0.5">
                    <div className="text-amber-500 text-[9px] font-black uppercase tracking-widest opacity-80">
                      {faculty.subject}
                    </div>
                    <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {faculty.name}
                    </h3>
                  </div>

                  <p className="text-zinc-500 text-[11px] leading-tight line-clamp-2 px-2">
                    {faculty.expertise}
                  </p>

                  <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] font-bold text-zinc-400">
                    <Award className="w-3.5 h-3.5 text-amber-500/60" />
                    {faculty.experience} Experience
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  index === i ? 'w-6 bg-amber-600' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
