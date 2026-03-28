import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  accent?: string;
}

export const SectionHeading = ({ title, subtitle, centered = true, className, accent }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={cn('mb-14 space-y-4', centered ? 'text-center' : 'text-left', className)}
  >
    {accent && (
      <div className={cn('flex items-center gap-3 mb-2', centered ? 'justify-center' : 'justify-start')}>
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
        <span className="text-amber-500 text-[11px] font-black uppercase tracking-[0.25em]">{accent}</span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
      </div>
    )}

    <h2
      className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1]"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {title}
    </h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={cn('text-zinc-400 text-lg leading-relaxed', centered ? 'max-w-2xl mx-auto' : 'max-w-xl')}
      >
        {subtitle}
      </motion.p>
    )}

    {/* Animated underline */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full',
        centered ? 'mx-auto' : 'origin-left'
      )}
      style={{ originX: centered ? '50%' : '0%' }}
    />
  </motion.div>
);
