import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Youtube, Send, MapPin, Phone, Mail, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react';

const QUICK_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'Courses', to: '/courses' },
  { name: 'Results', to: '/results' },
  { name: 'Resources', to: '/resources' },
  { name: 'About Us', to: '/about' },
];

const COURSES_LINKS = [
  'Prelims Mastery 2026',
  'UPSC Foundation 2027',
  'Mains Intensive 2025',
  'Optional Subjects',
];

const SOCIAL = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setIsSubscribed(true);
      setEmail('');
    } catch {
      // Optimistic success for demo
      setIsSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-zinc-950 overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 pt-20 pb-16">
          {/* Brand column - wider */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  RAVINDRA <span className="gradient-text">IAS</span>
                </span>
                <div className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] font-bold">Academy for Excellence</div>
              </div>
            </Link>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Empowering aspirants with the right strategy, mentorship, and content to crack the world's toughest exam — since 2018.
            </p>

            {/* Social links */}
            <div className="flex gap-2.5">
              {SOCIAL.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-600/5 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2.5">
              {[
                { Icon: Phone, text: '+91 98765 43210' },
                { Icon: Mail, text: 'contact@ravindraias.com' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors cursor-pointer group">
                  <Icon className="w-4 h-4 text-amber-500/70 group-hover:text-amber-500 transition-colors shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-sm mb-6 uppercase tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(item => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 text-zinc-500 text-sm hover:text-amber-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Centers */}
          <div>
            <h4 className="text-white font-black text-sm mb-6 uppercase tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Centers
            </h4>
            <ul className="space-y-5 text-zinc-500 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold text-sm mb-0.5">New Delhi</div>
                  <p className="text-xs leading-relaxed">Old Rajinder Nagar, New Delhi - 110060</p>
                  <a href="#" className="mt-1.5 flex items-center gap-1 text-amber-500 text-[11px] hover:text-amber-400 transition-colors">
                    Get Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold text-sm mb-0.5">Chennai</div>
                  <p className="text-xs leading-relaxed">Anna Nagar, Chennai - 600040</p>
                  <a href="#" className="mt-1.5 flex items-center gap-1 text-amber-500 text-[11px] hover:text-amber-400 transition-colors">
                    Get Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-black text-sm mb-6 uppercase tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-5 leading-relaxed">Get daily UPSC updates and current affairs in your inbox.</p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-500/8 border border-green-500/20 rounded-xl text-green-400 text-sm font-bold text-center"
              >
                ✓ Thanks for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
                >
                  {loading ? 'Subscribing...' : <><Send className="w-4 h-4" /> Subscribe</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs">
          <p>© 2026 Ravindra IAS Academy. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link key={item} to="#" className="hover:text-zinc-400 transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
