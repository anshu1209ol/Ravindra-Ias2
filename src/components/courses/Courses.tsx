import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { COURSES } from '../../constants';
import { cn } from '../../lib/utils';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Prelims:    { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20' },
  Foundation: { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  Mains:      { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  Optional:   { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/20' },
};

export const Courses = () => {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <section id="courses" className="py-28 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          accent="Our Programs"
          title="Premium Learning Paths"
          subtitle="Tailored programs designed to take you from basics to the final interview list — your journey, your pace."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course, i) => {
            const catColor = CATEGORY_COLORS[course.category] ?? CATEGORY_COLORS['Prelims'];
            const isHov = hovered === course.id;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setHovered(course.id)}
                onHoverEnd={() => setHovered(null)}
                className={cn(
                  'group relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-400',
                  course.recommended
                    ? 'bg-gradient-to-b from-amber-600/15 via-zinc-900 to-zinc-900 border-amber-500/40 shadow-xl shadow-amber-900/20'
                    : 'bg-zinc-900/70 border-zinc-800/70 hover:border-amber-500/30',
                  isHov ? 'shadow-2xl shadow-black/40 -translate-y-2' : ''
                )}
                style={{ transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease' }}
              >
                {/* Recommended badge */}
                {course.recommended && (
                  <div className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                )}
                {course.recommended && (
                  <div className="flex justify-center pt-4">
                    <span className="flex items-center gap-1.5 px-4 py-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                      <Sparkles className="w-3 h-3" /> Recommended
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-7 space-y-5">
                  {/* Category */}
                  <span className={cn('badge text-[10px]', catColor.bg, catColor.text, catColor.border)}>
                    {course.category}
                  </span>

                  {/* Title + Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {course.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{course.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 flex-1">
                    {course.features.map((f, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -8, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-2.5 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-5 border-t border-zinc-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                          <Clock className="w-3 h-3" /> Duration
                        </div>
                        <div className="text-white font-bold text-sm">{course.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Fee</div>
                        <div className="text-xl font-black gradient-text" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {course.price}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={course.recommended ? 'primary' : 'outline'}
                      className="w-full py-3 text-sm font-bold rounded-xl group/btn"
                    >
                      Explore Course
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
