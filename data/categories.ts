export interface Category {
  slug: string;
  name: string;
  department: string;
  description: string;
  // Tailwind color accent for the card (used in CSS classes)
  accent: string;         // e.g. 'brand'
  accentHex: string;      // literal hex for inline styles
  accentBg: string;       // tailwind bg class for icon container
}

export const CATEGORIES: Category[] = [
  {
    slug: 'media-buying',
    name: 'Media Buying',
    department: 'Marketing',
    description: 'Meta Ads setup, campaign structure, testing phases, and scaling strategy.',
    accent: 'brand',
    accentHex: '#8b7ff8',
    accentBg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    slug: 'image-ads',
    name: 'Straight to Kill — Image Ads',
    department: 'Creative',
    description: 'High-conversion image ad strategy, design specs, and copy frameworks.',
    accent: 'cyan',
    accentHex: '#06d6a0',
    accentBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    slug: 'sales-closing',
    name: 'Sales Closing',
    department: 'Sales',
    description: 'Consultative sales process, objection handling, and closing techniques.',
    accent: 'orange',
    accentHex: '#f97316',
    accentBg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    slug: 'content-creation',
    name: 'Content Creation',
    department: 'Creative',
    description: 'Video production workflow, scriptwriting, editing guidelines, and publishing.',
    accent: 'pink',
    accentHex: '#ec4899',
    accentBg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    slug: 'client-onboarding',
    name: 'Client Onboarding',
    department: 'Operations',
    description: 'Step-by-step client intake, access handover, and first-week checklist.',
    accent: 'sky',
    accentHex: '#0ea5e9',
    accentBg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    department: 'Support',
    description: 'Inbox rhythm, 24-hour reply window (WABA), reminders, and FAQ — turn chats into show-ups.',
    accent: 'rose',
    accentHex: '#f43f5e',
    accentBg: 'bg-rose-500/10 border-rose-500/20',
  },
];
