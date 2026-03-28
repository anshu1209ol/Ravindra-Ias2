import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, Star, BookOpen, TrendingUp } from 'lucide-react';

const STATS = [
  { label: 'Total Selections', value: 1000, suffix: '+', icon: Trophy, color: 'from-amber-500/20 to-amber-600/5', iconColor: 'text-amber-500', glow: 'rgba(217,119,6,0.2)' },
  { label: 'Active Students', value: 5000, suffix: '+', icon: Users, color: 'from-blue-500/20 to-blue-600/5', iconColor: 'text-blue-400', glow: 'rgba(59,130,246,0.2)' },
  { label: 'Expert Mentors', value: 50, suffix: '+', icon: Star, color: 'from-purple-500/20 to-purple-600/5', iconColor: 'text-purple-400', glow: 'rgba(168,85,247,0.2)' },
  { label: 'Mock Tests', value: 200, suffix: '+', icon: BookOpen, color: 'from-green-500/20 to-green-600/5', iconColor: 'text-green-400', glow: 'rgba(34,197,94,0.2)' },
  { label: 'Success Rate', value: 92, suffix: '%', icon: TrendingUp, color: 'from-rose-500/20 to-rose-600/5', iconColor: 'text-rose-400', glow: 'rgba(244,63,94,0.2)' },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          const duration = 2200;
          const startTime = performance.now();
          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasStarted]);

  return <div ref={ref}>{count}{suffix}</div>;
};

export const Stats = () => (
  <section id="trust" className="py-20 relative overflow-hidden">
    {/* Section divider */}
    <div className="section-divider absolute top-0 left-0 right-0" />
    <div className="section-divider absolute bottom-0 left-0 right-0" />

    {/* Subtle background */}
    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-zinc-950" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="group relative text-center p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 backdrop-blur-sm cursor-default transition-all duration-300"
            style={{ boxShadow: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${stat.glow}`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            {/* Icon */}
            <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>

            {/* Count */}
            <div
              className="text-3xl md:text-4xl font-black text-white mb-1"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>

            {/* Label */}
            <div className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
              {stat.label}
            </div>

            {/* Hover glow overlay */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none`} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
