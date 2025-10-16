import { AppType, FEATURE_SUMMARY_DESCRIPTIONS } from './data';
// --- TYPE DEFINITIONS ---
export interface TechStackGroup {
  category: string;
  items: string[];
}
export interface TimelineTask {
  name: string;
  range: [number, number]; // [startDay, endDay]
  duration: number;
}
export interface TreemapDataItem {
  name: string;
  size: number;
}
// --- CONSTANTS ---
const HOURLY_RATE = 75;
const HOURS_PER_WEEK = 40;
const HOURS_PER_DAY = 8;
const AI_MULTIPLIER = 0.25; // 75% reduction
const COMPLEXITY_MULTIPLIERS = {
  Low: 1.0,
  Medium: 1.5,
  High: 2.5,
  'Very High': 4.0,
};
const FEATURE_HOURS = {
  auth: 40,
  payments: 60,
  realtime: 80,
  ai: 100,
  analytics: 30,
  storage: 30,
  email: 20,
  video: 90,
  search: 50,
  userManagement: 60,
  notifications: 40,
  cms: 30,
  adminPanel: 80,
};
const SERVICE_COSTS = {
  database: { Supabase: 25, Firebase: 25, MongoDB: 57, PlanetScale: 39 },
  hosting: { Vercel: 20, Netlify: 19, Railway: 10, Render: 19, Cloudflare: 20 },
  platform: { Lovable: 29, Replit: 20, Dazl: 25, Bolt: 20, Cursor: 0 },
  auth: { Clerk: 25, Auth0: 23, Custom: 0 },
  payments: { Stripe: 0, PayPal: 0, LemonSqueezy: 50 },
  realtime: { Supabase: 0, Firebase: 0, Pusher: 49, Ably: 49 },
  ai: { OpenAI: 20, Anthropic: 20, Cohere: 0, Cloudflare: 5 },
  analytics: { Plausible: 9, Mixpanel: 20, GoogleAnalytics: 0 },
  storage: { S3: 20, Cloudinary: 99, Uploadcare: 20, R2: 5 },
  email: { Resend: 0, SendGrid: 19, Mailgun: 35, EmailJS: 0 },
  video: { Mux: 20, Twilio: 50, Vimeo: 20, Agora: 49 },
  search: { Algolia: 50, MeiliSearch: 30 },
  userManagement: { Basic: 0, Advanced: 0 },
  notifications: { Firebase: 0, OneSignal: 99 },
  cms: { Sanity: 99, Contentful: 39, Strapi: 0 },
  adminPanel: { Basic: 0, Advanced: 0 },
};
// --- TASK DEFINITIONS ---
const BASE_TASKS = [
  { id: 'setup', name: 'Project Setup & Architecture', hours: 20, description: 'Initial project configuration and architectural planning, accelerated by AI-powered boilerplate generation and dependency analysis.', deliverables: ['Version control (Git) repository setup', 'CI/CD pipeline configuration (e.g., GitHub Actions)', 'Initial cloud environment setup', 'Code quality tools integration (Linting, Formatting)'] },
  { id: 'design', name: 'UI/UX Design & Frontend', hours: 100, description: 'Designing the user interface and experience, with AI assistance in component generation, theme creation, and responsive layout validation.', deliverables: ['High-fidelity mockups for key screens (3-5 screens)', 'Interactive prototype for user flow validation', 'Component library with 10-15 reusable components', 'Responsive design for mobile, tablet, and desktop'] },
  { id: 'backend', name: 'Backend & Database', hours: 120, description: 'Building the server-side logic and database schema. AI tools assist in generating boilerplate code for APIs, data models, and validation logic.', deliverables: ['Database schema with 5-8 tables including relationships', '8-12 RESTful API endpoints (GET, POST, PUT, DELETE)', 'Server-side validation and error handling middleware', 'API documentation with request/response examples'] },
  { id: 'testing', name: 'Testing & Quality Assurance', hours: 40, description: 'Ensuring application stability and performance through automated and manual testing, with AI generating test cases and scenarios.', deliverables: ['Unit and integration test suites (70%+ coverage)', 'End-to-end tests for critical user flows', 'Performance and load testing reports', 'Bug tracking and resolution process'] },
  { id: 'deployment', name: 'Deployment & Documentation', hours: 20, description: 'Deploying the application to production and creating comprehensive documentation for maintenance and future development.', deliverables: ['Production deployment to selected hosting platform', 'Domain and DNS configuration', 'Setup of monitoring and logging services', 'Developer and user documentation'] },
];
const FEATURE_TASKS = {
  auth: { id: 'auth', name: 'Authentication', hours: FEATURE_HOURS.auth, description: 'Implementing secure user sign-up, login, and session management.', deliverables: ['Email/password and social login (e.g., Google)', 'Protected routes and API endpoints', 'Password reset and account recovery flows', 'User profile management page'] },
  payments: { id: 'payments', name: 'Payment Integration', hours: FEATURE_HOURS.payments, description: 'Integrating a payment gateway for processing transactions and managing subscriptions.', deliverables: ['Checkout flow for one-time or recurring payments', 'Webhook integration for payment events', 'Customer portal for managing subscriptions', 'Secure handling of payment information (PCI compliance)'] },
  realtime: { id: 'realtime', name: 'Real-time Features', hours: FEATURE_HOURS.realtime, description: 'Adding real-time functionality like live chat or notifications using WebSockets or similar tech.', deliverables: ['Real-time messaging component', 'Live notifications system', 'Presence indicators (online/offline status)', 'Scalable real-time backend infrastructure'] },
  ai: { id: 'ai', name: 'AI Feature Integration', hours: FEATURE_HOURS.ai, description: 'Integrating large language models or other AI services to provide intelligent features.', deliverables: ['API integration with a third-party AI service (e.g., OpenAI)', 'AI-powered chatbot or content generation feature', 'Prompt engineering and management system', 'Usage tracking and cost management for AI services'] },
  analytics: { id: 'analytics', name: 'Analytics Setup', hours: FEATURE_HOURS.analytics, description: 'Integrating an analytics platform to track user behavior and application performance.', deliverables: ['Analytics provider SDK integration', 'Tracking for key user events and funnels', 'Custom dashboard for visualizing metrics', 'Compliance with privacy regulations (e.g., GDPR)'] },
  storage: { id: 'storage', name: 'File Storage', hours: FEATURE_HOURS.storage, description: 'Implementing file upload and storage capabilities using a cloud storage provider.', deliverables: ['Secure file upload endpoint', 'Integration with a cloud storage service (e.g., R2, S3)', 'Image optimization and transformation', 'Access control for stored files'] },
  email: { id: 'email', name: 'Email Services', hours: FEATURE_HOURS.email, description: 'Setting up transactional email services for notifications, confirmations, and other communications.', deliverables: ['Integration with an email delivery service (e.g., Resend)', 'Email templates for various transaction types', 'Email sending and tracking functionality', 'DNS configuration for email deliverability (SPF, DKIM)'] },
  video: { id: 'video', name: 'Video Processing', hours: FEATURE_HOURS.video, description: 'Implementing video upload, processing, and streaming features.', deliverables: ['Video upload and transcoding pipeline', 'Adaptive bitrate streaming for different network conditions', 'Secure video player integration', 'Content delivery network (CDN) setup for video assets'] },
  search: { id: 'search', name: 'Search Implementation', hours: FEATURE_HOURS.search, description: 'Integrating a powerful and fast search service for application data.', deliverables: ['Backend integration with search service (e.g., Algolia)', 'Frontend search UI with instant results', 'Indexing and data synchronization logic', 'Faceted search and filtering capabilities'] },
  userManagement: { id: 'userManagement', name: 'User Management', hours: FEATURE_HOURS.userManagement, description: 'Implementing roles, permissions, and user group management.', deliverables: ['Role-based access control (RBAC) system', 'Admin interface for managing user roles', 'Permissions checks on API endpoints and UI components', 'Audit logs for user actions'] },
  notifications: { id: 'notifications', name: 'Push Notifications', hours: FEATURE_HOURS.notifications, description: 'Setting up push notifications to engage users on web and mobile.', deliverables: ['Integration with a push notification service (e.g., FCM)', 'User opt-in/opt-out for notifications', 'Backend logic for triggering notifications', 'Frontend handling of received notifications'] },
  cms: { id: 'cms', name: 'CMS Integration', hours: FEATURE_HOURS.cms, description: 'Connecting a headless CMS for dynamic content management.', deliverables: ['API integration with a headless CMS (e.g., Sanity)', 'Frontend components for rendering CMS content', 'Webhooks for automatic content updates', 'Schema definition and content modeling in the CMS'] },
  adminPanel: { id: 'adminPanel', name: 'Admin Panel', hours: FEATURE_HOURS.adminPanel, description: 'Building a comprehensive admin panel for managing application data and users.', deliverables: ['Secure admin login and dashboard', 'CRUD interfaces for key data models', 'Data visualization and reporting tools', 'Moderation and user management tools'] },
};
// --- TECH STACK DEFINITIONS ---
const TECH_STACK_MAP = {
  frontend: { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  backend: { category: 'Backend', items: ['Node.js', 'Hono', 'Cloudflare Workers'] },
  database: {
    category: 'Database',
    Supabase: 'Supabase (PostgreSQL)',
    Firebase: 'Firebase (Firestore)',
    MongoDB: 'MongoDB Atlas',
    PlanetScale: 'PlanetScale (MySQL)',
  },
  hosting: {
    category: 'Hosting',
    Vercel: 'Vercel',
    Netlify: 'Netlify',
    Railway: 'Railway',
    Render: 'Render',
    Cloudflare: 'Cloudflare Pages',
  },
  auth: { category: 'Authentication', items: ['Clerk', 'Auth0', 'Custom JWT'] },
  payments: { category: 'Payments', items: ['Stripe', 'PayPal', 'Lemon Squeezy'] },
  realtime: { category: 'Real-time', items: ['Supabase Realtime', 'Firebase', 'Pusher', 'Ably'] },
  ai: { category: 'AI & Machine Learning', items: ['OpenAI GPT-4', 'Anthropic Claude', 'Cloudflare Workers AI'] },
  analytics: { category: 'Analytics', items: ['Plausible', 'Mixpanel', 'Google Analytics'] },
  storage: { category: 'File Storage', items: ['R2', 'AWS S3', 'Cloudinary'] },
  email: { category: 'Email Services', items: ['Resend', 'SendGrid', 'Mailgun'] },
  video: { category: 'Video Services', items: ['Mux', 'Twilio Video', 'Vimeo'] },
  search: { category: 'Search', items: ['Algolia', 'MeiliSearch'] },
  userManagement: { category: 'User Management', items: ['Custom RBAC'] },
  notifications: { category: 'Push Notifications', items: ['Firebase (FCM)', 'OneSignal'] },
  cms: { category: 'CMS', items: ['Sanity', 'Contentful', 'Strapi'] },
  adminPanel: { category: 'Admin Panel', items: ['Custom Panel'] },
};
// --- SCALING LOGIC ---
const getUserScalingFactor = (users: number): number => {
  if (users <= 1000) return 1.0;
  if (users <= 10000) return 1.0 + (users - 1000) / 9000 * 1.5; // Linear scale up to 2.5x
  if (users <= 50000) return 2.5 + (users - 10000) / 40000 * 2.5; // Linear scale up to 5x
  return 5.0 + (users - 50000) / 50000 * 5.0; // Linear scale up to 10x
};
// --- CALCULATION LOGIC ---
export function calculateEstimate(app: AppType, config: Record<string, any>, selectedFeatures: string[]) {
  // 1. Calculate Development Hours
  const baseHours = ((app.devTime[0] + app.devTime[1]) / 2) * HOURS_PER_WEEK;
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[app.complexity];
  let featureHours = 0;
  selectedFeatures.forEach(featureId => {
    if (featureId in FEATURE_HOURS) {
      featureHours += FEATURE_HOURS[featureId as keyof typeof FEATURE_HOURS];
    }
  });
  const totalTraditionalHours = (baseHours * complexityMultiplier) + featureHours;
  const totalVibeHours = totalTraditionalHours * AI_MULTIPLIER;
  const devTimeWeeks = Math.ceil(totalVibeHours / HOURS_PER_WEEK);
  // 2. Calculate Costs
  const devCost = totalVibeHours * HOURLY_RATE;
  const scalingFactor = getUserScalingFactor(config.users || 5000);
  const platformCost = SERVICE_COSTS.platform[config.platform as keyof typeof SERVICE_COSTS.platform] || 0;
  const dbCost = (SERVICE_COSTS.database[config.database as keyof typeof SERVICE_COSTS.database] || 0) * scalingFactor;
  const hostingCost = (SERVICE_COSTS.hosting[config.hosting as keyof typeof SERVICE_COSTS.hosting] || 0) * scalingFactor;
  let servicesCost = 0;
  selectedFeatures.forEach(featureId => {
    const serviceConfig = config[featureId];
    if (featureId in SERVICE_COSTS && serviceConfig) {
      const costMap = SERVICE_COSTS[featureId as keyof typeof SERVICE_COSTS];
      if (typeof costMap === 'object' && costMap !== null && serviceConfig in costMap) {
        let cost = (costMap as Record<string, number>)[serviceConfig] || 0;
        if (['realtime', 'storage', 'ai', 'video', 'email'].includes(featureId)) {
          cost *= scalingFactor;
        }
        servicesCost += cost;
      }
    }
  });
  const monthlyCost = platformCost + dbCost + hostingCost + servicesCost;
  const firstYearCost = devCost + (monthlyCost * 12);
  // 3. Generate Task Breakdown
  const devTasks = [...BASE_TASKS];
  selectedFeatures.forEach(featureId => {
    if (featureId in FEATURE_TASKS) {
      devTasks.push(FEATURE_TASKS[featureId as keyof typeof FEATURE_TASKS]);
    }
  });
  // 4. Generate Tech Stack
  const techStack: TechStackGroup[] = [TECH_STACK_MAP.frontend, TECH_STACK_MAP.backend];
  const dbStackItem = TECH_STACK_MAP.database[config.database as keyof typeof TECH_STACK_MAP.database];
  if (dbStackItem) techStack.push({ category: 'Database', items: [dbStackItem] });
  const hostingStackItem = TECH_STACK_MAP.hosting[config.hosting as keyof typeof TECH_STACK_MAP.hosting];
  if (hostingStackItem) techStack.push({ category: 'Hosting', items: [hostingStackItem] });
  selectedFeatures.forEach(featureId => {
    const serviceConfig = config[featureId];
    if (serviceConfig) {
      const stackCategory = TECH_STACK_MAP[featureId as keyof typeof TECH_STACK_MAP];
      if (stackCategory) {
        let items: string[] = [];
        if ('items' in stackCategory && Array.isArray(stackCategory.items)) {
          items = stackCategory.items;
        } else if (typeof stackCategory === 'object' && 'category' in stackCategory && serviceConfig in stackCategory) {
          const itemValue = (stackCategory as any)[serviceConfig];
          if (typeof itemValue === 'string') {
            items = [itemValue];
          }
        }
        if (items.length > 0) {
          const existingCategory = techStack.find(c => c.category === stackCategory.category);
          if (existingCategory) {
            existingCategory.items.push(...items);
          } else {
            techStack.push({ category: stackCategory.category, items });
          }
        }
      }
    }
  });
  // 5. Generate Timeline (Realistic Gantt Chart Logic)
  let timeline: TimelineTask[] = [];
  let currentDay = 1;
  const getTaskDuration = (task: { hours: number }) => Math.ceil((task.hours * AI_MULTIPLIER) / HOURS_PER_DAY);
  // Stage 1: Setup (Sequential)
  const setupTask = devTasks.find(t => t.id === 'setup')!;
  const setupDuration = getTaskDuration(setupTask);
  timeline.push({ name: setupTask.name, range: [currentDay, currentDay + setupDuration - 1], duration: setupDuration });
  currentDay += setupDuration;
  // Stage 2: Core Development (Parallel)
  const coreDevTasks = devTasks.filter(t => ['design', 'backend'].includes(t.id));
  let coreDevStageDuration = 0;
  coreDevTasks.forEach(task => {
    const duration = getTaskDuration(task);
    timeline.push({ name: task.name, range: [currentDay, currentDay + duration - 1], duration });
    coreDevStageDuration = Math.max(coreDevStageDuration, duration);
  });
  currentDay += coreDevStageDuration;
  // Stage 3: Feature Integration (Parallel)
  const featureDevTasks = devTasks.filter(t => !['setup', 'design', 'backend', 'testing', 'deployment'].includes(t.id));
  let featureStageDuration = 0;
  if (featureDevTasks.length > 0) {
    featureDevTasks.forEach(task => {
      const duration = getTaskDuration(task);
      timeline.push({ name: task.name, range: [currentDay, currentDay + duration - 1], duration });
      featureStageDuration = Math.max(featureStageDuration, duration);
    });
    currentDay += featureStageDuration;
  }
  // Stage 4: Finalization (Sequential)
  const finalizationTasks = devTasks.filter(t => ['testing', 'deployment'].includes(t.id));
  finalizationTasks.forEach(task => {
    const duration = getTaskDuration(task);
    timeline.push({ name: task.name, range: [currentDay, currentDay + duration - 1], duration });
    currentDay += duration;
  });
  timeline.sort((a, b) => a.range[0] - b.range[0]);
  // 6. Generate Treemap Data (for Bar Chart)
  const treemapData: TreemapDataItem[] = [
    { name: 'Development', size: devCost },
    { name: 'Platform', size: platformCost * 12 },
    { name: 'Database', size: dbCost * 12 },
    { name: 'Hosting', size: hostingCost * 12 },
    { name: 'APIs & Services', size: servicesCost * 12 },
  ].filter(item => item.size > 0);
  // 7. Generate Feature Summary
  const featureSummary = devTasks
    .map(task => FEATURE_SUMMARY_DESCRIPTIONS[task.id])
    .filter(Boolean); // Filter out any undefined descriptions
  return {
    firstYearCost,
    devTime: [Math.max(1, devTimeWeeks - 1), devTimeWeeks + 1] as [number, number],
    monthlyCost,
    costBreakdown: {
      development: { total: devCost, tasks: devTasks.map(t => ({...t, hours: Math.round(t.hours * AI_MULTIPLIER)})) },
      platform: platformCost,
      database: dbCost,
      hosting: hostingCost,
      services: servicesCost,
    },
    techStack,
    timeline,
    treemapData,
    featureSummary,
  };
}
export type CalculationResults = ReturnType<typeof calculateEstimate>;