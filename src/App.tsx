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

// Page enter animation wrapper
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

const HomePage = ({ user }: { user: any }) => (
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
    <FAQSection />
    <EnrollmentForm user={user} />
  </PageTransition>
);

export default function App() {
  const [user, setUser] = React.useState<any>(null);
  const location = useLocation();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans overflow-x-hidden">
        <Navbar user={user} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
            <Route path="/results" element={<PageTransition><ToppersSection /></PageTransition>} />
            <Route path="/current-affairs" element={<PageTransition><CurrentAffairs /></PageTransition>} />
            <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
            <Route path="/about" element={<PageTransition><WhyChoose /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <LiveTicker />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
