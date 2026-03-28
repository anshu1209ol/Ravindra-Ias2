export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  recommended?: boolean;
  category: 'Prelims' | 'Mains' | 'Interview' | 'Foundation' | 'Optional';
}

export interface Topper {
  id: string;
  name: string;
  rank: string;
  year: string;
  image: string;
  story: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Batch {
  id: string;
  course: string;
  date: string;
  time: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
}

export interface CurrentAffairsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
}

export interface Faculty {
  id: string;
  name: string;
  subject: string;
  expertise: string;
  image: string;
  experience: string;
}
