import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export function FinalCta() {
  const scrollTo = useScrollToSection();

  return (
    <section id="final-cta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-zinc-950 to-blue-900/25 animate-gradient bg-[length:200%_200%]" />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[900px] w-[90vw] max-w-[900px] h-[380px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-600/10 text-amber-400 text-xs font-black uppercase tracking-widest"
        >
          <Clock className="w-3.5 h-3.5" />
          Spring batch — limited seats this week
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Your rank is built in the next{' '}
          <span className="gradient-text-animated">90 days</span> of discipline.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Book a free counselling call, get a personalised roadmap, and join a cohort designed for
          serious aspirants — not hopeful guessing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Button
            variant="primary"
            className="px-10 py-4 text-base rounded-2xl shadow-xl shadow-amber-900/40 btn-glow animate-pulse-glow"
            onClick={() => scrollTo('enroll')}
          >
            <Sparkles className="w-5 h-5" />
            Enroll Now — Free Counselling
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="secondary" className="px-8 py-4 text-base rounded-2xl" onClick={() => scrollTo('courses')}>
            Explore Courses
          </Button>
        </motion.div>

        <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest">
          Avg. response under 24h • No spam • Counselor-led onboarding
        </p>
      </div>
    </section>
  );
}
