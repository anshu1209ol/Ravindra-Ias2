import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export const CourseFinder = () => {
  const scrollTo = useScrollToSection();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const questions = [
    { q: 'What is your current preparation stage?', options: ['Beginner (Zero knowledge)', 'Intermediate (Know basics)', 'Advanced (Mains/Interview level)'] },
    { q: 'When are you planning to appear for UPSC?', options: ['2025 (Last minute)', '2026 (Full cycle)', '2027+ (Long term focus)'] },
    { q: 'What is your primary focus right now?', options: ['GS Foundation', 'Mains Answer Writing', 'Interview Preparation'] },
  ];

  const handleOption = (opt: string) => {
    const newAnswers = [...answers, opt];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(questions.length); // Result state
      }, 1500);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setIsAnalyzing(false);
  };

  return (
    <section id="course-finder" className="py-28 relative overflow-hidden bg-zinc-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-[48px] p-10 md:p-20 text-center space-y-10 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-800/50">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400" 
              initial={{ width: 0 }}
              animate={{ width: `${(step / questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-12 space-y-6"
              >
                <div className="w-20 h-20 border-4 border-amber-600/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
                <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Analyzing your profile...</h3>
                <p className="text-zinc-500">Finding the perfect learning path for your success.</p>
              </motion.div>
            ) : step < questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/10 border border-amber-600/20 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    Step {step + 1} of {questions.length}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {questions[step].q}
                  </h3>
                </div>

                <div className="grid gap-4 max-w-2xl mx-auto">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleOption(opt)}
                      className="group p-6 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl text-left text-zinc-300 font-bold hover:border-amber-500/50 hover:bg-amber-600/10 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span className="text-lg">{opt}</span>
                      <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="space-y-10 py-4"
              >
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-green-500/20 rounded-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-amber-500 font-black uppercase tracking-[0.2em] text-xs">
                    <Sparkles className="w-4 h-4" /> Recommendation Found
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    UPSC Foundation 2027
                  </h3>
                  <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
                    Based on your profile, we recommend our <span className="text-white font-black">Comprehensive Foundation Batch</span> to build your base across all GS subjects.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    variant="primary"
                    className="px-10 py-4 text-base shadow-xl shadow-amber-900/40"
                    type="button"
                    onClick={() => scrollTo('enroll', { courseId: 'foundation-batch' })}
                  >
                    Enroll in this Course
                  </Button>
                  <Button variant="secondary" className="px-10 py-4 text-base" type="button" onClick={reset}>
                    <RotateCcw className="w-4 h-4" /> Retake Plan Quiz
                  </Button>
                </div>

                {/* Micro stat */}
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest pt-8">
                  94% of beginners chose this path in 2025
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background sparkles */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
