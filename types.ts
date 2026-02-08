
export enum Specialization {
  ACCOUNTING = 'accounting',
  DIGITAL_MARKETING = 'digital_marketing',
  PROJECT_MANAGEMENT = 'project_management',
  BUSINESS_DEVELOPMENT = 'business_development',
  ENTREPRENEURSHIP = 'entrepreneurship',
  FINANCE = 'finance',
  INVESTMENT = 'investment'
}

export type Language = 'ar' | 'en';

export interface Course {
  id: string;
  title: string;
  duration: string;
}

export interface Level {
  id: number;
  title: string;
  modules: string[]; // Module 1, Module 2, Module 3
}

export interface User {
  id: string;
  name: string;
  email: string;
  selectedSpecialization?: Specialization;
  level: number;
  completedTasks: { title: string; feedback: string; score: number }[];
  portfolio: any[];
  assessmentScore?: number;
  language: Language;
}

export interface SpecializationInfo {
  id: Specialization;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  responsibilities: { ar: string; en: string }; // ماذا يفعل في الشركة؟
  demand2026: { ar: string; en: string };
  careerPath: { ar: string[]; en: string[] };
  skills: string[];
  roadmap: Level[];
}
