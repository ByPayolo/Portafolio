// src/data/projects.ts
// Tipos y datos de los proyectos del portfolio de Paolo Mata

export interface Project {
  /** Main card title */
  title: string;
  /** Short subtitle / tagline */
  subtitle: string;
  /** Detailed description shown on the card */
  description: string;
  /** Tech stack (badges) */
  tags: string[];
  /** Current project status */
  status: 'In development' | 'Completed' | 'Live demo' | 'Paused' | 'En desarrollo' | 'Completado' | 'Demo viva' | 'Pausado';
  /** Status badge color */
  statusColor: 'emerald' | 'indigo' | 'amber' | 'slate';
  /** Live demo URL (optional) */
  demoUrl?: string;
  /** GitHub repo URL (optional) */
  repoUrl?: string;
  /** Emoji or icon */
  icon: string;
  /** Card gradient colors (Tailwind classes) */
  gradient: string;
  /** Preferred device type (desktop, mobile) */
  type?: 'desktop' | 'mobile';
  /** List of key features */
  features?: string[];
}

export const projects: Project[] = [
  {
    title: 'Huellitas Seguras',
    subtitle: 'Mobile app for animal health and wellness',
    description:
      'Pet-tracking mobile application built with Local-First architecture (SQLite). Test the UI, status filtering, and real-time reminder creation.',
    tags: ['React Native', 'Expo', 'SQLite', 'NativeWind'],
    status: 'Live demo',
    statusColor: 'emerald',
    demoUrl: '/demos/huellitas/index.html',
    repoUrl: 'https://github.com',
    icon: '🐾',
    gradient: 'from-amber-600/20 via-orange-600/10 to-rose-600/10',
  },

  {
    title: 'EasyWay Virtual Platform',
    subtitle: 'LMS & Academic Management Platform for Language Academies',
    description:
      'Comprehensive educational management system with decoupled architecture. Features live attendance tracking, N:M academic assignments for administrators, and a virtual classroom for students.',
    tags: ['NestJS', 'React 19', 'TypeORM', 'MySQL', 'RBAC'],
    status: 'Live demo',
    statusColor: 'emerald',
    demoUrl: '/demos/easyway/index.html',
    repoUrl: 'https://github.com/tu-usuario/easyway-lms',
    icon: '🎓',
    gradient: 'from-blue-600/20 via-indigo-600/10 to-violet-600/10',
    type: 'desktop',
  },

  {
    title: 'Rockola Team',
    subtitle: 'Real-Time Collaborative Jukebox & Social Music Platform',
    description:
      'Real-time collaborative music web platform. Transforms any venue into a digital jukebox where guests suggest and vote on songs from their phones.',
    tags: ['React 19', 'Express 5', 'Firebase Realtime', 'InnerTube API'],
    status: 'Live demo',
    statusColor: 'emerald',
    demoUrl: 'https://rockola-web.onrender.com/',
    repoUrl: 'https://github.com/tu-usuario/rockola-web',
    icon: '🎵',
    gradient: 'from-amber-600/20 via-orange-600/10 to-red-600/10',
    type: 'desktop',
    features: [
      'Democratic Voting & Live Prioritization Algorithm',
      'Dual-Role Experience: Host View and Guest View',
      'YouTube Search with No Quota Limits via InnerTube',
      'Real-Time Multi-Device Sync powered by Firebase'
    ]
  }
];