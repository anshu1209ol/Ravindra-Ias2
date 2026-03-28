import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../constants';

export const Testimonials = () => {
  const [active, setActive] = React.useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Auto-advance
  React.useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/30 to-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-600/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          accent="Testimonials"
          title="What Our Students Say"
          subtitle="Real stories from real aspirants who trusted Ravindra IAS for their UPSC journey."
        />

        {/* Featured carousel */}
        <div className="relative max-w-3xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="p-10 bg-zinc-900/80 border border-zinc-800/70 rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-8">
                <Quote className="w-12 h-12 text-amber-500/10 fill-amber-500/10" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => (
                  <motion.div key={s} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: s * 0.05 }}>
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </motion.div>
                ))}
              </div>

              <p className="text-zinc-200 text-xl leading-relaxed italic mb-8 font-medium">
                "{TESTIMONIALS[active].text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={TESTIMONIALS[active].image}
                    alt={TESTIMONIALS[active].name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/40"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900" />
                </div>
                <div>
                  <div className="text-white font-bold text-base">{TESTIMONIALS[active].name}</div>
                  <div className="text-amber-500 text-sm font-semibold">{TESTIMONIALS[active].role}</div>
                </div>
              </div>

              {/* Subtle grid overlay */}
              <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none rounded-[32px]" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  animate={{ width: i === active ? 24 : 8, backgroundColor: i === active ? '#d97706' : '#3f3f46' }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 flex items-center justify-center text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setActive(i)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                active === i
                  ? 'bg-amber-600/10 border-amber-500/40 shadow-lg shadow-amber-900/20'
                  : 'bg-zinc-900/50 border-zinc-800/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
              </div>
              <p className="text-zinc-400 text-sm italic line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-4">
                <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full border border-zinc-700 object-cover" />
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-zinc-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
