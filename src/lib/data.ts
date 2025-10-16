import {
  BarChart, Bot, Briefcase, Building2, Calendar, Camera, Car, CheckSquare,
  Cloud, Code, Cog, CreditCard, Database, Dna, DollarSign, Download,
  Edit, Feather, FileText, Film, Gamepad2, Globe, HeartPulse, Home,
  Image, Layers, LayoutDashboard, LifeBuoy, Link, Lock, Mail, Map,
  MessageSquare, Mic, Music, Package, Palette, PenTool, Phone, PieChart,
  Pin, Plane, Puzzle, Receipt, Rocket, School, Search, Server, Settings,
  Share2, Shield, ShoppingCart, Smartphone, Sparkles, Star, Store,
  Tag, Target, TestTube, Text, ThumbsUp, Ticket, Wrench, Train, Trash,
  TrendingUp, Truck, Upload, User, Users, Video, Wallet, Warehouse,
  Wifi, Wind, Zap, Bell, type LucideIcon, MapPin, BarChartBig
} from 'lucide-react';
// --- TYPE DEFINITIONS ---
export type Question = {
  id: string;
  label: string;
  type: 'select' | 'slider' | 'checkbox' | 'group';
  icon?: LucideIcon; // Added for feature questions
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue: any;
  unit?: string;
  condition?: (config: Record<string, any>) => boolean;
};
export type AppType = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  complexity: 'Low' | 'Medium' | 'High' | 'Very High';
  devTime: [number, number]; // [minWeeks, maxWeeks]
  questions: Question[];
};
export type AppCategory = {
  name: string;
  apps: AppType[];
  relatedCategories?: string[];
};
// --- COMMON CONFIGURATION ---
export const commonQuestions: Question[] = [
  {
    id: 'platform',
    label: 'Development Platform',
    type: 'select',
    options: [
      { value: 'Lovable', label: 'Lovable' },
      { value: 'Replit', label: 'Replit' },
      { value: 'Dazl', label: 'Dazl' },
      { value: 'Bolt', label: 'Bolt' },
      { value: 'Cursor', label: 'Cursor' },
    ],
    defaultValue: 'Lovable',
  },
  {
    id: 'database',
    label: 'Database Service',
    type: 'select',
    options: [
      { value: 'Supabase', label: 'Supabase (PostgreSQL)' },
      { value: 'Firebase', label: 'Firebase (NoSQL)' },
      { value: 'MongoDB', label: 'MongoDB Atlas (NoSQL)' },
      { value: 'PlanetScale', label: 'PlanetScale (MySQL)' },
    ],
    defaultValue: 'Supabase',
  },
  {
    id: 'hosting',
    label: 'Hosting Platform',
    type: 'select',
    options: [
      { value: 'Vercel', label: 'Vercel' },
      { value: 'Netlify', label: 'Netlify' },
      { value: 'Railway', label: 'Railway' },
      { value: 'Render', label: 'Render' },
      { value: 'Cloudflare', label: 'Cloudflare Pages' },
    ],
    defaultValue: 'Vercel',
  },
  {
    id: 'users',
    label: 'Expected Monthly Users',
    type: 'slider',
    min: 100,
    max: 100000,
    step: 100,
    defaultValue: 5000,
    unit: 'users/month',
  },
];
export const featureQuestions: Question[] = [
  {
    id: 'auth',
    label: 'Authentication',
    type: 'select',
    icon: Lock,
    defaultValue: 'Clerk',
    options: [
      { value: 'Clerk', label: 'Clerk' },
      { value: 'Auth0', label: 'Auth0' },
      { value: 'Custom', label: 'Custom JWT' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    type: 'select',
    icon: CreditCard,
    defaultValue: 'Stripe',
    options: [
      { value: 'Stripe', label: 'Stripe' },
      { value: 'PayPal', label: 'PayPal' },
      { value: 'LemonSqueezy', label: 'Lemon Squeezy' },
    ],
  },
  {
    id: 'realtime',
    label: 'Real-time Features',
    type: 'select',
    icon: Zap,
    defaultValue: 'Supabase',
    options: [
      { value: 'Supabase', label: 'Supabase Realtime' },
      { value: 'Firebase', label: 'Firebase Realtime DB' },
      { value: 'Pusher', label: 'Pusher' },
      { value: 'Ably', label: 'Ably' },
    ],
  },
  {
    id: 'ai',
    label: 'AI/ML Integration',
    type: 'select',
    icon: Bot,
    defaultValue: 'OpenAI',
    options: [
      { value: 'OpenAI', label: 'OpenAI GPT-4' },
      { value: 'Anthropic', label: 'Anthropic Claude' },
      { value: 'Cohere', label: 'Cohere' },
      { value: 'Cloudflare', label: 'Cloudflare Workers AI' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    type: 'select',
    icon: BarChart,
    defaultValue: 'Plausible',
    options: [
      { value: 'Plausible', label: 'Plausible' },
      { value: 'Mixpanel', label: 'Mixpanel' },
      { value: 'GoogleAnalytics', label: 'Google Analytics' },
    ],
  },
  {
    id: 'storage',
    label: 'File Storage',
    type: 'select',
    icon: Database,
    defaultValue: 'R2',
    options: [
      { value: 'S3', label: 'AWS S3' },
      { value: 'R2', label: 'Cloudflare R2' },
      { value: 'Cloudinary', label: 'Cloudinary' },
      { value: 'Uploadcare', label: 'Uploadcare' },
    ],
  },
  {
    id: 'email',
    label: 'Email Service',
    type: 'select',
    icon: Mail,
    defaultValue: 'Resend',
    options: [
      { value: 'Resend', label: 'Resend' },
      { value: 'SendGrid', label: 'SendGrid' },
      { value: 'Mailgun', label: 'Mailgun' },
      { value: 'EmailJS', label: 'EmailJS (Client-side)' },
    ],
  },
  {
    id: 'video',
    label: 'Video Streaming',
    type: 'select',
    icon: Film,
    defaultValue: 'Mux',
    options: [
      { value: 'Mux', label: 'Mux' },
      { value: 'Vimeo', label: 'Vimeo' },
      { value: 'Twilio', label: 'Twilio Video' },
      { value: 'Agora', label: 'Agora' },
    ],
  },
  {
    id: 'search',
    label: 'Search',
    type: 'select',
    icon: Search,
    defaultValue: 'Algolia',
    options: [
      { value: 'Algolia', label: 'Algolia' },
      { value: 'MeiliSearch', label: 'MeiliSearch' },
    ],
  },
  {
    id: 'userManagement',
    label: 'User Management',
    type: 'select',
    icon: Users,
    defaultValue: 'Basic',
    options: [
      { value: 'Basic', label: 'Basic Roles' },
      { value: 'Advanced', label: 'Advanced Permissions' },
    ],
  },
  {
    id: 'notifications',
    label: 'Push Notifications',
    type: 'select',
    icon: Bell,
    defaultValue: 'Firebase',
    options: [
      { value: 'Firebase', label: 'Firebase (FCM)' },
      { value: 'OneSignal', label: 'OneSignal' },
    ],
  },
  {
    id: 'cms',
    label: 'CMS Integration',
    type: 'select',
    icon: FileText,
    defaultValue: 'Sanity',
    options: [
      { value: 'Sanity', label: 'Sanity' },
      { value: 'Contentful', label: 'Contentful' },
      { value: 'Strapi', label: 'Strapi (Self-hosted)' },
    ],
  },
  {
    id: 'adminPanel',
    label: 'Admin Panel',
    type: 'select',
    icon: Shield,
    defaultValue: 'Basic',
    options: [
      { value: 'Basic', label: 'Basic CRUD' },
      { value: 'Advanced', label: 'Advanced Dashboard' },
    ],
  },
];
// --- APP CATEGORIES & TYPES ---
export const appCategories: AppCategory[] = [
  {
    name: 'Simple SaaS Apps',
    apps: [
      { id: 'dashboard-saas', name: 'Dashboard SaaS', description: 'Data visualization and management tool.', icon: LayoutDashboard, complexity: 'Medium', devTime: [4, 8], questions: [
        ...featureQuestions.filter(q => ['auth', 'analytics', 'email', 'adminPanel'].includes(q.id)),
      ]},
      { id: 'crm-lite', name: 'CRM Lite', description: 'Simple customer relationship management.', icon: Users, complexity: 'Medium', devTime: [6, 10], questions: [
        ...featureQuestions.filter(q => ['auth', 'storage', 'email', 'userManagement'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Productivity & Personal', 'Business & Utilities'],
  },
  {
    name: 'Productivity & Personal',
    apps: [
      { id: 'todo-app', name: 'Advanced To-Do App', description: 'Task management with collaboration features.', icon: CheckSquare, complexity: 'Low', devTime: [2, 4], questions: [
        ...featureQuestions.filter(q => ['auth', 'realtime', 'notifications'].includes(q.id)),
      ]},
      { id: 'note-taking-app', name: 'Note-Taking App', description: 'Rich text editor with organization.', icon: FileText, complexity: 'Medium', devTime: [3, 6], questions: [
        ...featureQuestions.filter(q => ['auth', 'storage', 'search'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Simple SaaS Apps', 'Health & Wellness'],
  },
  {
    name: 'E-commerce & Payments',
    apps: [
      { id: 'ecommerce-store', name: 'E-commerce Store', description: 'Online marketplace for physical goods.', icon: Store, complexity: 'High', devTime: [8, 16], questions: [
        ...featureQuestions.filter(q => ['auth', 'payments', 'storage', 'email', 'analytics', 'search', 'adminPanel'].includes(q.id)),
      ]},
      { id: 'booking-platform', name: 'Booking Platform', description: 'Service or event reservation system.', icon: Calendar, complexity: 'High', devTime: [10, 20], questions: [
        ...featureQuestions.filter(q => ['auth', 'payments', 'email', 'realtime', 'notifications'].includes(q.id)),
      ]},
      { id: 'subscription-service', name: 'Subscription Service', description: 'Recurring payment-based content/service.', icon: Receipt, complexity: 'Medium', devTime: [6, 12], questions: [
        ...featureQuestions.filter(q => ['auth', 'payments', 'email', 'userManagement'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Business & Utilities', 'Simple SaaS Apps'],
  },
  {
    name: 'Social & Communication',
    apps: [
      { id: 'messaging-app', name: 'Messaging App', description: 'Real-time chat and communication.', icon: MessageSquare, complexity: 'High', devTime: [12, 24], questions: [
        ...featureQuestions.filter(q => ['auth', 'realtime', 'storage', 'video', 'notifications'].includes(q.id)),
      ]},
      { id: 'social-network-niche', name: 'Niche Social Network', description: 'Community platform for a specific interest.', icon: Share2, complexity: 'Very High', devTime: [16, 32], questions: [
        ...featureQuestions.filter(q => ['auth', 'realtime', 'storage', 'email', 'userManagement', 'adminPanel'].includes(q.id)),
      ]},
      { id: 'forum-platform', name: 'Forum Platform', description: 'Discussion boards and community forums.', icon: Users, complexity: 'Medium', devTime: [6, 12], questions: [
        ...featureQuestions.filter(q => ['auth', 'email', 'userManagement'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Productivity & Personal', 'Games'],
  },
  {
    name: 'Education & Learning',
    apps: [
      { id: 'online-course-platform', name: 'Online Course Platform', description: 'LMS for video courses and quizzes.', icon: School, complexity: 'High', devTime: [10, 20], questions: [
        ...featureQuestions.filter(q => ['auth', 'payments', 'video', 'storage', 'cms'].includes(q.id)),
      ]},
      { id: 'language-learning-app', name: 'Language Learning App', description: 'Interactive lessons and progress tracking.', icon: Mic, complexity: 'High', devTime: [12, 22], questions: [
        ...featureQuestions.filter(q => ['auth', 'payments', 'ai', 'notifications'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['AI Automations', 'Games'],
  },
  {
    name: 'AI Automations',
    apps: [
      { id: 'ai-chatbot', name: 'AI Chatbot Service', description: 'Customizable AI assistants for websites.', icon: Bot, complexity: 'Medium', devTime: [4, 8], questions: [
        ...featureQuestions.filter(q => ['auth', 'ai', 'analytics', 'adminPanel'].includes(q.id)),
      ]},
      { id: 'content-generator', name: 'AI Content Generator', description: 'Tool for creating text or images.', icon: Sparkles, complexity: 'High', devTime: [8, 16], questions: [
        ...featureQuestions.filter(q => ['auth', 'ai', 'payments', 'storage', 'cms'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Simple SaaS Apps', 'Education & Learning'],
  },
  {
    name: 'Games',
    apps: [
      { id: 'mobile-game-puzzle', name: 'Puzzle Mobile Game', description: 'Simple, engaging puzzle-based game.', icon: Puzzle, complexity: 'Medium', devTime: [8, 16], questions: [
        ...featureQuestions.filter(q => ['analytics', 'payments'].includes(q.id)),
      ]},
      { id: 'text-based-rpg', name: 'Text-Based RPG', description: 'Interactive fiction and role-playing.', icon: PenTool, complexity: 'Medium', devTime: [6, 12], questions: [
        ...featureQuestions.filter(q => ['auth', 'ai', 'storage'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Social & Communication', 'Education & Learning'],
  },
  {
    name: 'Websites & Landing Pages',
    apps: [
      { id: 'landing-page', name: 'Marketing Landing Page', description: 'Single-page site for a product or service.', icon: Rocket, complexity: 'Low', devTime: [1, 2], questions: [
        ...featureQuestions.filter(q => ['analytics', 'email', 'cms'].includes(q.id)),
      ]},
      { id: 'portfolio-website', name: 'Portfolio Website', description: 'Showcase for creative work.', icon: Palette, complexity: 'Low', devTime: [1, 3], questions: [
        ...featureQuestions.filter(q => ['storage', 'cms'].includes(q.id)),
      ]},
      { id: 'blog-platform', name: 'Blog Platform', description: 'Content management system for articles.', icon: Feather, complexity: 'Medium', devTime: [4, 7], questions: [
        ...featureQuestions.filter(q => ['auth', 'storage', 'email', 'cms', 'search'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Business & Utilities'],
  },
  {
    name: 'Health & Wellness',
    apps: [
      { id: 'wellness-app', name: 'Wellness App', description: 'Meditation, mood tracking, and exercises.', icon: HeartPulse, complexity: 'Medium', devTime: [6, 12], questions: [
        ...featureQuestions.filter(q => ['auth', 'analytics', 'notifications'].includes(q.id)),
      ]},
      { id: 'fitness-tracker', name: 'Fitness Tracker', description: 'Workout logging and progress monitoring.', icon: TrendingUp, complexity: 'High', devTime: [8, 18], questions: [
        ...featureQuestions.filter(q => ['auth', 'analytics', 'realtime', 'notifications'].includes(q.id)),
      ]},
      { id: 'recipe-app', name: 'Recipe App', description: 'Meal planning and recipe discovery.', icon: ShoppingCart, complexity: 'Medium', devTime: [5, 10], questions: [
        ...featureQuestions.filter(q => ['auth', 'storage', 'search'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Productivity & Personal', 'Social & Communication'],
  },
  {
    name: 'Business & Utilities',
    apps: [
      { id: 'directory-app', name: 'Directory App', description: 'A listing platform for businesses or services, like Yelp.', icon: MapPin, complexity: 'High', devTime: [10, 20], questions: [
        ...featureQuestions.filter(q => ['auth', 'payments', 'storage', 'email', 'search', 'userManagement', 'adminPanel'].includes(q.id)),
      ]},
      { id: 'data-app', name: 'Data App', description: 'Connects to data warehouses for visualization and reporting.', icon: BarChartBig, complexity: 'Very High', devTime: [12, 24], questions: [
        ...featureQuestions.filter(q => ['auth', 'analytics', 'ai', 'adminPanel'].includes(q.id)),
      ]},
    ],
    relatedCategories: ['Simple SaaS Apps', 'E-commerce & Payments'],
  },
];
export const allAppTypes = appCategories.flatMap(category => category.apps);
export const COST_BREAKDOWN_DESCRIPTIONS = {
  platform: [
    "Covers the subscription fee for your chosen development platform (e.g., Lovable, Replit).",
    "This often includes features like collaborative coding environments, built-in databases, and deployment tools.",
    "Does not typically cover usage-based costs that exceed the plan's limits."
  ],
  database: [
    "Monthly cost for your managed database service (e.g., Supabase, Firebase).",
    "This estimate is scaled based on your expected monthly users and covers data storage, reads, and writes.",
    "High-traffic applications may incur additional costs for exceeding plan limits."
  ],
  services: [
    "Combined monthly cost for all selected third-party APIs and services (e.g., authentication, payments, email).",
    "Many services have free tiers, but this estimate assumes paid plans for production use.",
    "Usage-based services (like AI and video streaming) are scaled based on expected user traffic."
  ],
  hosting: [
    "Monthly fee for the platform that serves your application to users (e.g., Vercel, Cloudflare Pages).",
    "Covers bandwidth, serverless function executions, and build minutes.",
    "This cost is scaled based on your expected monthly users to account for traffic."
  ],
};
export const FEATURE_SUMMARY_DESCRIPTIONS: Record<string, string> = {
  setup: "Automated Project Setup & CI/CD Pipeline",
  design: "Responsive UI/UX Design & Component Library",
  backend: "Scalable Backend with a RESTful API",
  testing: "Comprehensive Automated & Manual Testing",
  deployment: "Production Deployment & Cloud Configuration",
  auth: "Secure User Authentication & Profile Management",
  payments: "Payment Processing for Subscriptions or One-Time Sales",
  realtime: "Real-time Capabilities (e.g., Chat, Notifications)",
  ai: "AI-Powered Features (e.g., Chatbots, Content Generation)",
  analytics: "User Behavior & Performance Analytics",
  storage: "Cloud-Based File & Media Storage",
  email: "Transactional Email Delivery System",
  video: "Video Upload, Processing, and Streaming",
  search: "Advanced, Fast Search Functionality",
  userManagement: "Role-Based Access Control (RBAC)",
  notifications: "Web & Mobile Push Notifications",
  cms: "Headless CMS for Dynamic Content Management",
  adminPanel: "Admin Dashboard for Management & Moderation",
};