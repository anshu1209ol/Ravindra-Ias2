import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Tag } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { CURRENT_AFFAIRS } from '../../constants';
import { useNavigate } from 'react-router-dom';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Editorial':               { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'International Relations': { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20' },
  'Environment':             { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/20' },
  'Polity':                  { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
};

export const CurrentAffairs = () => {
  const navigate = useNavigate();

  return (
  <section id="current-affairs" className="py-28 relative overflow-hidden">
    <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-purple-600/4 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
        <div className="flex-1">
          <SectionHeading
            centered={false}
            accent="Stay Updated"
            title="Daily Current Affairs"
            subtitle="Latest news and editorials curated for UPSC CSE — analysed by our expert team."
          />
        </div>
        <Button
          variant="outline"
          className="mb-4 shrink-0 px-6 py-3"
          type="button"
          onClick={() => navigate('/current-affairs')}
        >
          View Archive <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CURRENT_AFFAIRS.map((item, i) => {
          const cat = CATEGORY_COLORS[item.category] ?? { bg: 'bg-zinc-800', text: 'text-zinc-400', border: 'border-zinc-700' };
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative p-7 bg-zinc-900/70 border border-zinc-800/60 rounded-[28px] hover:border-amber-500/25 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <span className={`badge text-[10px] ${cat.bg} ${cat.text} ${cat.border}`}>
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                <span className="text-zinc-500 text-xs font-medium">{item.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-snug line-clamp-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {item.title}
              </h3>

              {/* Summary */}
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6">{item.summary}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-zinc-800/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-[9px] font-black text-white shadow-sm">
                    RI
                  </div>
                  <span className="text-zinc-500 text-xs">Ravindra IAS Editorial</span>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ x: 3 }}
                  onClick={() => navigate('/current-affairs')}
                  className="flex items-center gap-1.5 text-amber-500 hover:text-amber-400 font-bold text-xs transition-colors"
                >
                  Read Full <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-500/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
  );
};
