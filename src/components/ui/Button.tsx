import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-900/25 border border-amber-500/30',
    secondary: 'bg-zinc-800/80 hover:bg-zinc-700 text-white border border-zinc-700/80 hover:border-zinc-600',
    outline: 'bg-transparent border-2 border-amber-500/70 text-amber-400 hover:bg-amber-600 hover:text-white hover:border-amber-600',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/70',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
