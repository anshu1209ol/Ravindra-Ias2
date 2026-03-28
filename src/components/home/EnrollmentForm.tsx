import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, CheckCircle2, Loader2, Shield, Clock, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { COURSES } from '../../constants';
import { db, collection, addDoc } from '../../lib/firebase';

const TRUST_BADGES = [
  { icon: Shield, label: '100% Secure', sub: 'Your data is safe' },
  { icon: Clock, label: '24h Response', sub: 'Counselor calls back fast' },
  { icon: Award, label: 'Trusted by 5000+', sub: 'Successful aspirants' },
];

const INPUT_CLASS =
  'w-full bg-zinc-800/70 border border-zinc-700/60 rounded-xl px-4 py-3.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500/40 transition-all duration-200';

export const EnrollmentForm = ({ user }: { user: any }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) { alert('Please sign in to enroll.'); return; }
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      uid: user.uid,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      courseId: formData.get('course'),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, 'enrollments'), data);
      setIsSuccess(true);
    } catch (error) {
      console.error('Enrollment failed', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div>
            <span className="badge badge-amber mb-4">Start Today</span>
            <h2
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mt-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Ready to Start Your{' '}
              <span className="gradient-text-animated">Success Story?</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Join thousands of successful aspirants. Fill out the form and our senior counselor will reach out within 24 hours.
          </p>

          {/* Contact info */}
          <div className="space-y-4">
            {[
              { Icon: Phone, label: '+91 98765 43210' },
              { Icon: Mail, label: 'contact@ravindraias.com' },
              { Icon: MapPin, label: 'Old Rajinder Nagar, New Delhi' },
            ].map(({ Icon, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-zinc-300 group"
              >
                <div className="w-11 h-11 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-amber-500/30 group-hover:bg-amber-600/10 transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-medium">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {TRUST_BADGES.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60"
              >
                <b.icon className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <div className="text-white text-xs font-bold">{b.label}</div>
                <div className="text-zinc-500 text-[10px] mt-0.5">{b.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 via-transparent to-amber-600/10 rounded-[44px] blur-xl" />
          <div className="relative bg-zinc-900/90 border border-zinc-800/70 p-8 md:p-12 rounded-[36px] shadow-2xl backdrop-blur-sm">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-center space-y-6 py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto border border-green-500/25"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-3xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Application Received!
                </h3>
                <p className="text-zinc-400">Our counselor will call you shortly. Check your email for updates.</p>
                <Button variant="secondary" onClick={() => setIsSuccess(false)}>
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Apply for Free Counselling
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input name="name" required type="text" placeholder="e.g. Rahul Kumar" className={INPUT_CLASS} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                    <input name="email" required type="email" placeholder="you@email.com" className={INPUT_CLASS} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Phone Number</label>
                    <input name="phone" required type="tel" placeholder="+91 00000 00000" className={INPUT_CLASS} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Course Interest</label>
                    <select name="course" required className={INPUT_CLASS + ' cursor-pointer'}>
                      {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-base font-bold rounded-2xl mt-2 shadow-xl shadow-amber-900/30"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    : 'Apply Now — It\'s Free'}
                </Button>

                <p className="text-center text-zinc-600 text-xs">
                  By applying, you agree to our{' '}
                  <span className="text-zinc-500 hover:text-amber-500 cursor-pointer transition-colors">Terms & Privacy Policy</span>.
                  No spam, ever.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
