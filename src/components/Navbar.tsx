import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, GraduationCap } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Results', path: '/results' },
  { name: 'Current Affairs', path: '/current-affairs' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
];

export const Navbar = ({ user }: { user: any }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); }
    catch (error) { console.error('Login failed', error); }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-zinc-900">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={cn(
          'fixed top-0.5 left-0 right-0 z-50 transition-all duration-500 px-6 py-3',
          isScrolled
            ? 'glass border-b border-white/5 shadow-2xl shadow-black/30'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="relative w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/40 overflow-hidden"
            >
              <GraduationCap className="w-6 h-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/30 to-transparent" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                RAVINDRA <span className="gradient-text">IAS</span>
              </span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em] mt-0.5">
                Academy for Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  'relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 group',
                  isActive
                    ? 'text-amber-500'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-amber-600/10 rounded-lg border border-amber-600/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-zinc-900/60 p-1 pr-3 rounded-full border border-zinc-800"
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border-2 border-amber-500"
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-white truncate max-w-[90px]">{user.displayName}</span>
                  <button onClick={() => signOut(auth)} className="text-[10px] text-zinc-500 hover:text-amber-400 text-left transition-colors">
                    Sign Out
                  </button>
                </div>
              </motion.div>
            ) : (
              <Button
                variant="primary"
                onClick={handleLogin}
                className="hidden sm:flex px-5 py-2.5 text-xs font-bold rounded-xl shadow-lg shadow-amber-900/30"
              >
                <LogIn className="w-3.5 h-3.5" />
                Enroll Now
              </Button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1 border-t border-zinc-800 mt-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => cn(
                        'block px-4 py-3 text-base font-bold rounded-xl transition-colors',
                        isActive
                          ? 'text-amber-500 bg-amber-600/10 border border-amber-600/20'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      )}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                {!user && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="mt-2"
                  >
                    <Button variant="primary" onClick={handleLogin} className="w-full">
                      Enroll Now
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
