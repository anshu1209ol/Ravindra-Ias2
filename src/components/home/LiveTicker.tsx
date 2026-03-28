import React from 'react';
import { Zap } from 'lucide-react';

const TICKER_ITEMS = [
  '🎯 New Batch Starting April 15th',
  '🏆 RIAS Scholarship Test — Registration Open',
  '📊 15+ Selections in UPSC CSE 2024 Interview List',
  '📚 Free Mock Test Series Live Now',
  '🎓 Mains Intensive Batch Starting June 10th',
  '✅ 1000+ Successful Selections Since 2018',
  '📝 Daily Current Affairs Updated at 8 AM IST',
];

export const LiveTicker = () => (
  <div className="relative bg-gradient-to-r from-amber-600/20 via-amber-600/10 to-amber-600/20 border-t border-amber-600/25 py-2.5 overflow-hidden">
    {/* Left fade overlay */}
    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
    {/* Right fade overlay */}
    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

    {/* Live badge */}
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 bg-red-500 rounded-full px-2.5 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      <span className="text-[10px] font-extrabold text-white uppercase tracking-widest">Live</span>
    </div>

    <div className="ticker-wrapper pl-32">
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 mr-16 text-amber-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
          <Zap className="w-3 h-3 fill-amber-400 shrink-0" />
          {item}
        </span>
      ))}
    </div>
  </div>
);
