import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, HelpCircle, Book, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

const RESOURCES = [
  {
    title: 'Monthly Current Affairs',
    description: 'Concise monthly digest of UPSC-relevant news and analysis.',
    type: 'PDF',
    date: 'March 2026',
    icon: FileText,
    color: 'from-blue-500/15 to-blue-600/5',
    iconColor: 'text-blue-400',
    border: 'hover:border-blue-500/30',
  },
  {
    title: 'UPSC Prelims Mock Test',
    description: 'Timed mock tests designed as per latest UPSC pattern.',
    type: 'Quiz',
    date: 'Weekly',
    icon: HelpCircle,
    color: 'from-amber-500/15 to-amber-600/5',
    iconColor: 'text-amber-400',
    border: 'hover:border-amber-500/30',
  },
  {
    title: 'Ethics Case Studies',
    description: 'Real-world case studies specifically for GS Paper 4.',
    type: 'PDF',
    date: 'Feb 2026',
    icon: Book,
    color: 'from-purple-500/15 to-purple-600/5',
    iconColor: 'text-purple-400',
    border: 'hover:border-purple-500/30',
  },
  {
    title: 'NCERT Summary Notes',
    description: 'Chapter-wise summaries of all important NCERTs.',
    type: 'PDF',
    date: 'All Subjects',
    icon: FileText,
    color: 'from-green-500/15 to-green-600/5',
    iconColor: 'text-green-400',
    border: 'hover:border-green-500/30',
  },
];

export const Resources = () => (
  <section id="resources" className="py-28 bg-zinc-950 relative overflow-hidden">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute inset-0 bg-grid opacity-30" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
        <div className="flex-1">
          <SectionHeading
            centered={false}
            accent="Free Resources"
            title="Study Material & Downloads"
            subtitle="Expert-curated notes, tests, and current affairs to supercharge your preparation."
          />
        </div>
        <Button variant="outline" className="mb-4 shrink-0">
          All Resources <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RESOURCES.map((res, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`group relative p-6 bg-zinc-900/70 border border-zinc-800/60 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ${res.border}`}
          >
            {/* Icon */}
            <div className={`inline-flex p-3 bg-gradient-to-br ${res.color} rounded-xl mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
              <res.icon className={`w-5 h-5 ${res.iconColor}`} />
            </div>

            {/* Type badge */}
            <div className="absolute top-5 right-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-md">
                {res.type}
              </span>
            </div>

            <h4 className="text-white font-bold mb-1.5 group-hover:text-amber-400 transition-colors text-base leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {res.title}
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">{res.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-zinc-600 text-xs">{res.date}</span>
              <motion.button
                whileHover={{ scale: 1.15, rotate: -8 }}
                className="w-8 h-8 rounded-lg bg-zinc-800 group-hover:bg-amber-600 border border-zinc-700 group-hover:border-amber-500 flex items-center justify-center transition-all duration-300"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </motion.button>
            </div>

            {/* Bottom gradient reveal */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${res.color.replace('/15', '/60').replace('/5', '/30')} scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
