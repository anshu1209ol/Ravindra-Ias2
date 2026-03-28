import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PageLoader() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const hide = () => setVisible(false);
    const t = window.setTimeout(hide, 900);
    if (document.readyState === 'complete') {
      window.setTimeout(hide, 650);
    } else {
      window.addEventListener('load', () => window.setTimeout(hide, 400), { once: true });
    }
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-zinc-950"
          aria-busy="true"
          aria-label="Loading"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-900/40 shimmer" />
            <div className="space-y-2">
              <div className="h-3 w-40 rounded-full bg-zinc-800 shimmer" />
              <div className="h-3 w-28 rounded-full bg-zinc-800/80 shimmer" />
            </div>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-amber-500"
                animate={{ opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
