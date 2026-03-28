import React from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, CheckCircle2, Trophy, Target, Shield } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const REASONS = [
  {
    title: 'Personal Mentorship',
    desc: 'One-on-one sessions with retired IAS officers and subject matter experts.',
    icon: Users,
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-400',
    border: 'border-amber-500/15',
  },
  {
    title: 'Strategic Content',
    desc: 'Curated study material that focuses on relevance and impact over volume.',
    icon: BookOpen,
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/15',
  },
  {
    title: 'Consistency Tracking',
    desc: 'Daily targets and live progress monitoring to keep you on the right track.',
    icon: Target,
    color: 'from-green-500/20 to-green-600/5',
    iconColor: 'text-green-400',
    border: 'border-green-500/15',
  },
  {
    title: 'Proven Results',
    desc: 'A proven track record of producing top rankers consistently, every year.',
    icon: Trophy,
    color: 'from-purple-500/20 to-purple-600/5',
    iconColor: 'text-purple-400',
    border: 'border-purple-500/15',
  },
  {
    title: 'Answer Writing',
    desc: 'Daily answer writing with expert feedback — the key differentiator for Mains.',
    icon: CheckCircle2,
    color: 'from-rose-500/20 to-rose-600/5',
    iconColor: 'text-rose-400',
    border: 'border-rose-500/15',
  },
  {
    title: 'Interview Prep',
    desc: 'Realistic mock interviews conducted by ex-UPSC board members.',
    icon: Shield,
    color: 'from-cyan-500/20 to-cyan-600/5',
    iconColor: 'text-cyan-400',
    border: 'border-cyan-500/15',
  },
];

export const WhyChoose = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/20 to-zinc-950" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-amber-600/4 rounded-full blur-[100px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Left: Content */}
        <div>
          <SectionHeading
            centered={false}
            accent="Why Ravindra IAS"
            title="Built on Three Pillars of Success"
            subtitle="We don't just teach — we mentor, we strategise, and we stay with you till you make it."
          />

          <div className="grid sm:grid-cols-2 gap-5">
            {REASONS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`group p-5 rounded-2xl bg-zinc-900/50 border ${r.border} hover:border-opacity-50 transition-all duration-300 cursor-default`}
              >
                <div className={`inline-flex p-2.5 bg-gradient-to-br ${r.color} rounded-xl mb-3 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <r.icon className={`w-5 h-5 ${r.iconColor}`} />
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{r.title}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Image + stat overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main image */}
          <div className="relative rounded-[32px] overflow-hidden border border-zinc-800/60 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop"
              alt="UPSC Mentorship"
              className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </div>

          {/* Floating satisfaction card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 -left-8 p-6 glass rounded-2xl border border-amber-500/25 shadow-xl max-w-[220px]"
          >
            <div
              className="text-4xl font-black gradient-text mb-1"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              92%
            </div>
            <div className="text-zinc-300 text-sm font-medium leading-snug">
              Student satisfaction rate in our mentorship program
            </div>
            <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '92%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              />
            </div>
          </motion.div>

          {/* Floating years card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -top-6 -right-6 p-4 glass rounded-2xl border border-zinc-700/40 shadow-xl"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>8+</div>
              <div className="text-zinc-400 text-xs">Years of Excellence</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);
