import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const CONTENT: Record<
  string,
  { title: string; body: string[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Ravindra IAS Academy (“we”, “us”) respects your privacy. This policy explains how we collect and use information when you use our website and services.',
      'We collect information you provide (name, email, phone) when you request counselling or enroll. We use it to respond to you, deliver programs, and improve our services.',
      'We do not sell your personal data. We may use trusted vendors for hosting, email, and analytics under appropriate agreements.',
      'You may request access, correction, or deletion of your personal data by contacting contact@ravindraias.com.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'By using the Ravindra IAS website and enrolling in our programs, you agree to these terms.',
      'Course fees, schedules, and deliverables are communicated at enrollment. Refunds, if applicable, follow the policy shared in your enrollment communication.',
      'Content provided (notes, videos, tests) is for personal use only and may not be redistributed.',
      'We may update these terms; continued use after changes constitutes acceptance.',
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    body: [
      'We use essential cookies to operate the site (for example, preferences such as theme).',
      'We may use analytics cookies to understand how visitors use our pages so we can improve them. You can control cookies through your browser settings.',
      'For questions, email contact@ravindraias.com.',
    ],
  },
};

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' | 'cookies' }) {
  const page = CONTENT[kind];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[70vh] pt-28 pb-20 px-6 max-w-2xl mx-auto"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      <h1 className="text-4xl font-black text-white mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {page.title}
      </h1>
      <div className="space-y-4 text-zinc-400 leading-relaxed text-sm">
        {page.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-12 text-zinc-600 text-xs">Last updated: March 2026</p>
    </motion.main>
  );
}
