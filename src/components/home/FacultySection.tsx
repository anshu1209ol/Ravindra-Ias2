import React from 'react';
import { motion } from 'motion/react';
import { FACULTIES } from '../../constants';
import { SectionHeading } from '../ui/SectionHeading';
import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';

export const FacultySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as any
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Our Expert Faculty" 
          subtitle="Learn from the best minds in the field who have guided thousands of students to success in the Civil Services Examination."
          accent="Top Mentors"
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {FACULTIES.map((faculty) => (
            <motion.div
              key={faculty.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full glass rounded-[32px] overflow-hidden border border-zinc-800/80 hover:border-amber-500/30 transition-all duration-500 card-hover">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={faculty.image} 
                    alt={faculty.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl uppercase tracking-wider border border-white/20">
                    {faculty.experience} EXP
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest">
                      <BookOpen className="w-3 h-3" />
                      {faculty.subject}
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {faculty.name}
                    </h3>
                  </div>

                  <p className="text-zinc-500 text-sm leading-relaxed min-h-[48px]">
                    {faculty.expertise}
                  </p>

                  <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
                      <GraduationCap className="w-4 h-4 text-amber-500/70" />
                      Expert Mentor
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative neural link (glow effect) */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amber-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
