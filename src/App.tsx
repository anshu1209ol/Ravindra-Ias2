import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { auth } from './lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import ErrorBoundary from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/home/Hero';
import { Stats } from './components/home/Stats';
import { BatchSchedule } from './components/home/BatchSchedule';
import { Courses } from './components/courses/Courses';
import { CurrentAffairs } from './components/home/CurrentAffairs';
import { ToppersSection } from './components/results/ToppersSection';
import { WhyChoose } from './components/home/WhyChoose';
import { CourseFinder } from './components/courses/CourseFinder';
import { Resources } from './components/home/Resources';
import { Testimonials } from './components/home/Testimonials';
import { FAQSection } from './components/home/FAQSection';
import { EnrollmentForm } from './components/home/EnrollmentForm';
import { LiveTicker } from './components/home/LiveTicker';
import { FacultySection } from './components/home/FacultySection';
import { FinalCta } from './components/home/FinalCta';
import { ThemeProvider } from './context/ThemeContext';
import { PageLoader } from './components/PageLoader';
import AIChatbot from './components/AIChatbot';
import { LegalPage } from './pages/LegalPage';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const HomePage = ({ user }: { user: unknown }) => (
  <PageTransition>
    <Hero />
    <Stats />
    <BatchSchedule />
    <Courses />
    <CurrentAffairs />
    <ToppersSection />
    <FacultySection />
    <WhyChoose />
    <CourseFinder />
    <Resources />
    <Testimonials />
    <FinalCta />
    <FAQSection />
    <EnrollmentForm user={user} />
  </PageTransition>
);

function ScrollToHashOnRoute() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname !== '/') return;

    const run = () => {
      const id = location.hash?.replace(/^#/, '');
      if (id) {
        window.requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      }
    };

    const t = window.setTimeout(run, 80);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  const [user, setUser] = React.useState<unknown>(null);
  const location = useLocation();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <PageLoader />
        <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans overflow-x-hidden transition-colors duration-300">
          <ScrollToHashOnRoute />
          <Navbar user={user} />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
              <Route path="/results" element={<PageTransition><ToppersSection /></PageTransition>} />
              <Route path="/current-affairs" element={<PageTransition><CurrentAffairs /></PageTransition>} />
              <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
              <Route path="/about" element={<PageTransition><WhyChoose /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><LegalPage kind="privacy" /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><LegalPage kind="terms" /></PageTransition>} />
              <Route path="/cookies" element={<PageTransition><LegalPage kind="cookies" /></PageTransition>} />
            </Routes>
          </AnimatePresence>
          <LiveTicker />
          <Footer />
          <AIChatbot />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
