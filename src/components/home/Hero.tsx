import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, ArrowRight, Play, CheckCircle2, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import heroBgImage from '../../assets/hero_bg.png';

const FLOATING_BADGES = [
  { icon: CheckCircle2, title: 'Daily Answer Writing', sub: 'Expert Evaluated', color: 'from-green-500/20 to-green-500/5', border: 'border-green-500/20', text: 'text-green-400', delay: 0 },
  { icon: Award, title: 'AIR 5 — 2024', sub: 'Ananya Singh', color: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400', delay: 2 },
  { icon: Users, title: '1000+ Selections', sub: 'Since 2018', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-400', delay: 4 },
];

const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const DEMO_VIDEO_URL = 'https://www.youtube.com/watch?v=EngW7tLk6R8';

export const Hero = () => {
  const scrollTo = useScrollToSection();
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      } as any
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-24 overflow-x-hidden overflow-y-visible bg-grid">
      {/* Ambient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-amber-600/8 rounded-full blur-[140px] animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-amber-600/4 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <span className="badge badge-amber text-xs gap-2">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              India's Most Trusted UPSC Platform
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1
              className="text-5xl md:text-[68px] font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Crack UPSC with{' '}
              <span className="gradient-text-animated">
                India's Top
              </span>
              <br className="hidden sm:block" /> Mentors
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="text-zinc-400 text-xl max-w-xl leading-relaxed">
            Transform your preparation with structured guidance, personalized mentorship, and a proven strategy that has produced{' '}
            <span className="text-white font-semibold">1000+ IAS officers.</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              className="px-8 py-4 text-base font-bold rounded-2xl shadow-xl shadow-amber-900/30 group animate-pulse-glow"
              onClick={() => scrollTo('enroll')}
            >
              Enroll Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              className="px-8 py-4 text-base font-bold rounded-2xl border-zinc-700"
              onClick={() => navigate('/courses')}
            >
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </div>
              Explore Courses
            </Button>
          </motion.div>
          <motion.p variants={itemVariants} className="-mt-2">
            <button
              type="button"
              onClick={() => window.open(DEMO_VIDEO_URL, '_blank', 'noopener,noreferrer')}
              className="text-sm text-zinc-500 hover:text-amber-400 font-semibold underline-offset-4 hover:underline transition-colors"
            >
              Watch a 2‑min class experience →
            </button>
          </motion.p>

          {/* Social proof */}
          <motion.div variants={itemVariants} className="flex items-center gap-6 pt-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://i.pravatar.cc/80?img=${i + 10}`} alt="" className="w-9 h-9 rounded-full border-2 border-zinc-900 object-cover" />
              ))}
            </div>
            <div className="text-sm">
              <div className="text-white font-bold">
                <Counter target={1000} suffix="+" /> Selections
              </div>
              <div className="text-zinc-500 text-xs">in the last 3 years</div>
            </div>
          </motion.div>

          {/* Mini stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-2">
            {[
              { value: 5000, suffix: '+', label: 'Students' },
              { value: 50, suffix: '+', label: 'Expert Mentors' },
              { value: 92, suffix: '%', label: 'Satisfaction' },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 backdrop-blur-sm">
                <div className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-zinc-500 text-xs mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — 3D image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block max-w-xl xl:max-w-none mx-auto w-full py-6 overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          style={{ perspective: 1000 }}
        >
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform' }} 
            className="relative overflow-visible"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.8)] group transform-gpu isolate ring-1 ring-white/10">
              <img
                src={heroBgImage}
                alt="Ravindra IAS Hero Image"
                className="w-full aspect-[4/5] min-h-[480px] max-h-[720px] object-cover object-center transition-transform duration-1000 group-hover:scale-[1.05] will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />

              <div className="absolute inset-0 z-20 pointer-events-none">
                {FLOATING_BADGES.map((badge, i) => (
                  <motion.div
                    key={badge.title}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: badge.delay * 0.08 }}
                    className={`pointer-events-auto absolute max-w-[calc(100%-1.5rem)] sm:max-w-[220px] p-3.5 sm:p-4 glass rounded-2xl border ${badge.border} shadow-2xl backdrop-blur-xl ${
                      i === 0 ? 'top-6 right-6 sm:top-8 sm:right-8' :
                      i === 1 ? 'left-6 top-[40%] -translate-y-1/2 sm:left-8' :
                      'bottom-[8.5rem] right-6 sm:bottom-[10rem] sm:right-8'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className={`p-1.5 bg-gradient-to-br ${badge.color} rounded-lg border ${badge.border} shrink-0`}>
                        <badge.icon className={`w-4 h-4 ${badge.text}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-[11px] sm:text-xs font-bold leading-tight">{badge.title}</div>
                        <div className="text-zinc-500 text-[10px] truncate sm:whitespace-normal">{badge.sub}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute z-30 bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-4 sm:p-5 glass rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg">
                    AIR 1
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-bold text-sm truncate">Shruti Sharma</div>
                    <div className="text-zinc-400 text-xs">UPSC CSE 2021 Topper</div>
                  </div>
                </div>
                <p className="text-zinc-300 text-xs italic leading-relaxed line-clamp-3 sm:line-clamp-none">
                  &ldquo;The mentorship at Ravindra IAS was the cornerstone of my preparation strategy.&rdquo;
                </p>
              </div>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-br from-amber-600/10 to-transparent rounded-[48px] blur-2xl -z-10 pointer-events-none" aria-hidden />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-600 text-xs uppercase tracking-widest font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-zinc-700 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-amber-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
