import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Target,
  Calendar,
  BookOpen,
  Wifi,
  Layers,
  MapPinned,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { COURSES } from '../../constants';
import { cn } from '../../lib/utils';
import { useScrollToSection } from '../../hooks/useScrollToSection';

const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; border: string; bar: string; outcomeBg: string }
> = {
  Prelims: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    bar: 'from-blue-500 via-sky-500 to-blue-600',
    outcomeBg: 'from-blue-500/10 to-transparent border-blue-500/20',
  },
  Foundation: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    bar: 'from-amber-500 via-amber-400 to-amber-600',
    outcomeBg: 'from-amber-500/12 to-transparent border-amber-500/25',
  },
  Mains: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    bar: 'from-purple-500 via-violet-500 to-purple-600',
    outcomeBg: 'from-purple-500/10 to-transparent border-purple-500/25',
  },
  Optional: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    bar: 'from-emerald-500 via-green-500 to-teal-600',
    outcomeBg: 'from-emerald-500/10 to-transparent border-emerald-500/25',
  },
};

const MODE_ICON = {
  Online: Wifi,
  Hybrid: Layers,
  Offline: MapPinned,
} as const;

export const Courses = () => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const scrollTo = useScrollToSection();

  return (
    <section id="courses" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          accent="Our Programs"
          title="Premium Learning Paths"
          subtitle="Tailored programs designed to take you from basics to the final interview list — your journey, your pace."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {COURSES.map((course, i) => {
            const catColor = CATEGORY_COLORS[course.category] ?? CATEGORY_COLORS['Prelims'];
            const isHov = hovered === course.id;
            const ModeIcon = MODE_ICON[course.mode];
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
                    : 'bg-zinc-900/70 border-zinc-800/70 hover:border-zinc-600/80',
                  isHov ? 'shadow-2xl shadow-black/40 -translate-y-2' : ''
                )}
                style={{ transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease' }}
              >
                {/* Category palette bar */}
                <div
                  className={cn(
                    'h-1.5 w-full bg-gradient-to-r shrink-0',
                    catColor.bar
                  )}
                />

                {course.recommended && (
                  <div className="flex justify-center pt-4">
                    <span className="flex items-center gap-1.5 px-4 py-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className={cn('flex flex-col flex-1 p-6 sm:p-7 space-y-4', !course.recommended && 'pt-6')}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('badge text-[10px]', catColor.bg, catColor.text, catColor.border)}>
                      {course.category}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border',
                        catColor.bg,
                        catColor.text,
                        catColor.border
                      )}
                    >
                      <ModeIcon className="w-3 h-3" />
                      {course.mode}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className="text-lg sm:text-xl font-black text-white leading-tight"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{course.description}</p>
                  </div>

                  <div className="flex items-start gap-2 text-[11px] text-zinc-500 leading-snug">
                    <Calendar className={cn('w-3.5 h-3.5 shrink-0 mt-0.5', catColor.text)} />
                    <span>{course.schedule}</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                    <Users className={cn('w-4 h-4 shrink-0 mt-0.5', catColor.text)} />
                    <div>
                      <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Best for</span>
                      <p className="mt-0.5">{course.idealFor}</p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'rounded-xl border px-3.5 py-3 bg-gradient-to-br',
                      catColor.outcomeBg
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Target className={cn('w-4 h-4 shrink-0 mt-0.5', catColor.text)} />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Outcome</span>
                        <p className="text-zinc-200 text-xs leading-relaxed mt-1">{course.outcome}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">What&apos;s included</span>
                    <div className="space-y-2">
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
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Curriculum focus</span>
                    <div className="space-y-2">
                      {course.curriculum.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400 leading-snug">
                          <BookOpen className={cn('w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80', catColor.text)} />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {course.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg bg-zinc-950/60 border border-zinc-800/80 px-2 py-2 text-center"
                      >
                        <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-tight leading-tight">
                          {s.label}
                        </div>
                        <div className={cn('text-sm font-black mt-0.5', catColor.text)} style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-4 mt-auto">
                    <div className="flex items-center justify-between gap-3">
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
                      type="button"
                      onClick={() => scrollTo('enroll', { courseId: course.id })}
                    >
                      Enroll in this course
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-20 max-w-2xl mx-auto text-center space-y-6 p-10 rounded-[32px] glass border border-zinc-800/80"
        >
          <p className="text-zinc-400 text-sm leading-relaxed">
            Not sure which program fits your timeline? Book a free counselling call — we&apos;ll map the fastest path to your rank.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" type="button" className="px-8 py-3 rounded-xl" onClick={() => scrollTo('enroll')}>
              Book free counselling
            </Button>
            <Button variant="outline" type="button" className="px-8 py-3 rounded-xl" onClick={() => scrollTo('course-finder')}>
              Take the 1‑min quiz
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
