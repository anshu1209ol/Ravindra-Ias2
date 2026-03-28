import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, GraduationCap, Sun, Moon } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { useTheme } from '../context/ThemeContext';

type NavItem =
  | { name: string; to: string }
  | { name: string; sectionId: string };

const navItems: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'Courses', to: '/courses' },
  { name: 'Mentors', sectionId: 'mentors' },
  { name: 'Results', to: '/results' },
  { name: 'Current Affairs', to: '/current-affairs' },
  { name: 'Resources', to: '/resources' },
];

export const Navbar = ({ user }: { user: any }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const location = useLocation();
  const scrollToSection = useScrollToSection();
  const { theme, toggleTheme } = useTheme();

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
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleSectionNav = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const renderNavItem = (item: NavItem) => {
    if ('sectionId' in item) {
      const isActive = location.pathname === '/' && location.hash === `#${item.sectionId}`;
      return (
        <button
          key={item.name}
          type="button"
          onClick={() => handleSectionNav(item.sectionId)}
          className={cn(
            'relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 text-left w-full lg:w-auto',
            isActive ? 'text-amber-500' : 'text-zinc-400 hover:text-white'
          )}
        >
          {isActive && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-amber-600/10 rounded-lg border border-amber-600/20"
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </button>
      );
    }

    const pathActive =
      item.to === '/'
        ? location.pathname === '/' && !location.hash
        : location.pathname === item.to;

    return (
      <Link
        key={item.name}
        to={item.to}
        className={cn(
          'relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 group',
          pathActive ? 'text-amber-500' : 'text-zinc-400 hover:text-white'
        )}
      >
        {pathActive && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 bg-amber-600/10 rounded-lg border border-amber-600/20"
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          />
        )}
        <span className="relative z-10">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
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
          isScrolled ? 'glass border-b border-white/5 shadow-2xl shadow-black/30' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
              <span
                className="text-xl font-black text-white tracking-tight"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                RAVINDRA <span className="gradient-text">IAS</span>
              </span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em] mt-0.5">
                Academy for Excellence
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">{navItems.map(renderNavItem)}</div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

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
                  <button
                    type="button"
                    onClick={() => signOut(auth)}
                    className="text-[10px] text-zinc-500 hover:text-amber-400 text-left transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign in
              </button>
            )}

            <Button
              variant="primary"
              onClick={() => scrollToSection('enroll')}
              className="hidden sm:flex px-5 py-2.5 text-xs font-bold rounded-xl shadow-lg shadow-amber-900/30"
            >
              Enroll Now
            </Button>

            <button
              type="button"
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
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {'sectionId' in item ? (
                      <button
                        type="button"
                        onClick={() => handleSectionNav(item.sectionId)}
                        className={cn(
                          'w-full block px-4 py-3 text-base font-bold rounded-xl transition-colors text-left',
                          location.hash === `#${item.sectionId}`
                            ? 'text-amber-500 bg-amber-600/10 border border-amber-600/20'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        )}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block px-4 py-3 text-base font-bold rounded-xl transition-colors',
                          (item.to === '/'
                            ? location.pathname === '/' && !location.hash
                            : location.pathname === item.to)
                            ? 'text-amber-500 bg-amber-600/10 border border-amber-600/20'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="mt-2 flex flex-col gap-2"
                >
                  {!user && (
                    <Button variant="secondary" onClick={handleLogin} className="w-full">
                      <LogIn className="w-4 h-4" />
                      Sign in with Google
                    </Button>
                  )}
                  <Button variant="primary" onClick={() => { scrollToSection('enroll'); setIsMobileMenuOpen(false); }} className="w-full">
                    Enroll Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
