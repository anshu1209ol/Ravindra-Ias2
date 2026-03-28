import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { FAQS } from '../../constants';
import { cn } from '../../lib/utils';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const scrollTo = useScrollToSection();

  return (
    <section id="faq" className="py-28 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionHeading
          accent="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our courses and methodology."
        />

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={cn(
                  'rounded-2xl border overflow-hidden transition-all duration-300',
                  isOpen
                    ? 'border-amber-500/30 bg-gradient-to-br from-amber-600/8 to-zinc-900 shadow-lg shadow-amber-900/10'
                    : 'border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700/80'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left gap-4 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn(
                      'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300',
                      isOpen ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700'
                    )}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={cn(
                      'font-bold transition-colors text-base leading-snug',
                      isOpen ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                    )}>
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="shrink-0"
                  >
                    <ChevronDown className={cn('w-5 h-5 transition-colors', isOpen ? 'text-amber-500' : 'text-zinc-500')} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[68px] text-zinc-400 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-500 text-sm">
            Still have questions?{' '}
            <button
              type="button"
              onClick={() => scrollTo('enroll')}
              className="text-amber-500 hover:text-amber-400 font-bold underline underline-offset-2 transition-colors"
            >
              Talk to a counselor →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
