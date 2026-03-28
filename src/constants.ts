import { Course, Topper, Testimonial, FAQ, Batch, CurrentAffairsItem, Faculty } from './types';

export const COURSES: Course[] = [
  {
    id: 'prelims-mastery',
    title: 'Prelims Mastery 2026',
    description: 'Comprehensive coverage of GS & CSAT with focus on high-yield topics and elimination techniques.',
    duration: '6 Months',
    price: '₹24,999',
    features: ['Daily MCQs', 'Weekly Mock Tests', 'Current Affairs Analysis', 'Personal Mentorship'],
    category: 'Prelims'
  },
  {
    id: 'foundation-batch',
    title: 'UPSC Foundation 2027 (PCM)',
    description: 'Complete GS + CSAT + Optional guidance. From NCERT basics to advanced answer writing.',
    duration: '18 Months',
    price: '₹89,999',
    features: ['NCERT to Advanced', 'Mains Answer Writing', 'Personalized Strategy', 'Interview Guidance'],
    recommended: true,
    category: 'Foundation'
  },
  {
    id: 'mains-intensive',
    title: 'Mains Intensive 2025',
    description: 'Focused answer writing, GS enrichment, and Ethics & Essay mastery for Mains 2025.',
    duration: '4 Months',
    price: '₹19,999',
    features: ['Daily Answer Writing', 'Case Study Workshops', 'Ethics Mastery', 'Essay Guidance'],
    category: 'Mains'
  },
  {
    id: 'optional-subjects',
    title: 'Optional Subjects (PSIR/History/Geo)',
    description: 'In-depth coverage of optional subjects with previous year question analysis.',
    duration: '5 Months',
    price: '₹29,999',
    features: ['Comprehensive Notes', 'Test Series Included', 'Special Focus on Maps/Diagrams', 'Expert Faculty'],
    category: 'Optional'
  }
];

export const BATCHES: Batch[] = [
  { id: '1', course: 'Foundation Batch (English)', date: 'April 15, 2026', time: '8:00 AM - 11:00 AM', mode: 'Hybrid' },
  { id: '2', course: 'Foundation Batch (Hindi)', date: 'April 20, 2026', time: '4:00 PM - 7:00 PM', mode: 'Hybrid' },
  { id: '3', course: 'Prelims Crash Course', date: 'May 01, 2026', time: '11:30 AM - 2:30 PM', mode: 'Online' },
  { id: '4', course: 'Mains Test Series', date: 'June 10, 2026', time: 'Flexible', mode: 'Hybrid' },
];

export const CURRENT_AFFAIRS: CurrentAffairsItem[] = [
  { id: '1', title: 'The Impact of AI on Global Governance', category: 'Editorial', date: 'Mar 28, 2026', summary: 'Analysis of how artificial intelligence is reshaping international relations and domestic policy frameworks.' },
  { id: '2', title: 'India-ASEAN Relations: A New Era', category: 'International Relations', date: 'Mar 27, 2026', summary: 'Exploring the strategic and economic implications of the latest summit between India and ASEAN nations.' },
  { id: '3', title: 'Climate Change and Food Security in India', category: 'Environment', date: 'Mar 26, 2026', summary: 'Investigating the challenges posed by erratic weather patterns on agricultural productivity in South Asia.' },
  { id: '4', title: 'Constitutional Validity of Recent Bills', category: 'Polity', date: 'Mar 25, 2026', summary: 'A deep dive into the legal and constitutional aspects of the newly introduced legislative measures.' },
];

export const TOPPERS: Topper[] = [
  {
    id: '1',
    name: 'Ananya Singh',
    rank: 'AIR 5',
    year: '2024',
    image: 'https://picsum.photos/seed/topper1/400/500',
    story: 'Ravindra IAS provided the structured guidance I needed for my optional. The mentorship was life-changing.'
  },
  {
    id: '2',
    name: 'Rahul Verma',
    rank: 'AIR 12',
    year: '2024',
    image: 'https://picsum.photos/seed/topper2/400/500',
    story: 'The focus on current affairs and daily answer writing at Ravindra IAS helped me clear in my first attempt.'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    rank: 'AIR 28',
    year: '2023',
    image: 'https://picsum.photos/seed/topper3/400/500',
    story: 'The mock interviews were incredibly realistic. They helped me overcome my anxiety and perform well.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Vikram Aditya',
    role: 'Aspirant',
    text: 'The best platform for UPSC. The mentors are always available and the content is top-notch.',
    image: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: '2',
    name: 'Meera Kapoor',
    role: 'Aspirant',
    text: 'I love the interactive quiz flow. It helped me find the perfect course for my preparation level.',
    image: 'https://picsum.photos/seed/user2/100/100'
  },
  {
    id: '3',
    name: 'Siddharth Jain',
    role: 'Aspirant',
    text: 'The AI counselor is surprisingly helpful. It answered all my queries about the syllabus and strategy.',
    image: 'https://picsum.photos/seed/user3/100/100'
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'When do the new batches start?',
    answer: 'New batches for Foundation and Prelims start on the 1st and 15th of every month.'
  },
  {
    question: 'Do you provide study material in Hindi?',
    answer: 'Yes, we provide comprehensive study material and classes in both English and Hindi.'
  },
  {
    question: 'Is there a scholarship program?',
    answer: 'Yes, we conduct a scholarship test (RIAS-ST) every quarter. Top performers get up to 100% fee waiver.'
  },
  {
    question: 'Can I attend demo classes?',
    answer: 'Absolutely! You can sign up for a 3-day free demo period to experience our teaching methodology.'
  }
];

export const FACULTIES: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Ravindra Singh',
    subject: 'Polity & Governance',
    expertise: 'Indian Constitution, Public Policy',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop',
    experience: '15+ Years'
  },
  {
    id: '2',
    name: 'Prof. Anshul Bhardwaj',
    subject: 'History & Culture',
    expertise: 'Modern Indian History, Art & Architecture',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop',
    experience: '12+ Years'
  },
  {
    id: '3',
    name: 'Ms. Shruti Sharma',
    subject: 'Geography & Environment',
    expertise: 'Physical Geography, Ecology, Disaster Management',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&auto=format&fit=crop',
    experience: '10+ Years'
  },
  {
    id: '4',
    name: 'Mr. Rahul Verma',
    subject: 'Ethics & Integrity',
    expertise: 'Case Studies, Moral Philosophy',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&h=500&auto=format&fit=crop',
    experience: '8+ Years'
  },
  {
    id: '5',
    name: 'Dr. Meera Kapoor',
    subject: 'Economy',
    expertise: 'Macroeconomics, Fiscal Policy',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop',
    experience: '14+ Years'
  },
  {
    id: '6',
    name: 'Capt. Siddharth Jain',
    subject: 'Internal Security',
    expertise: 'National Security, Border Management',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop',
    experience: '20+ Years'
  }
];
