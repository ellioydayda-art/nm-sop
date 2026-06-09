export interface Category {
  slug: string;
  name: string;
  department: string;
  description: string;
  /** When true, the SOP is shown as archived / not in active use. */
  inactive?: boolean;
  /** Short label on dashboard card to tell similar SOPs apart (e.g. "AI Prompt"). */
  cardLabel?: string;
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
    inactive: true,
    description: 'Consultative sales process, objection handling, and closing techniques.',
    accent: 'orange',
    accentHex: '#f97316',
    accentBg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    slug: 'content-creation',
    name: 'Content Creation',
    department: 'Creative',
    inactive: true,
    description: 'Video production workflow, scriptwriting, editing guidelines, and publishing.',
    accent: 'pink',
    accentHex: '#ec4899',
    accentBg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    slug: 'client-onboarding',
    name: 'Client Onboarding',
    department: 'Operations',
    inactive: true,
    description: 'Step-by-step client intake, access handover, and first-week checklist.',
    accent: 'sky',
    accentHex: '#0ea5e9',
    accentBg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    department: 'Support',
    description: 'How we handle customer chats, reminders, and common questions.',
    accent: 'rose',
    accentHex: '#f43f5e',
    accentBg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    slug: 'whatsapp-community-value-posts',
    name: 'Dr Jasmine · Value Post Prompt',
    cardLabel: 'AI Writing',
    department: 'Community',
    description: 'Copy-paste AI prompt for WhatsApp value posts: frameworks, hooks, tone, workflow, and topic rotation.',
    accent: 'green',
    accentHex: '#25D366',
    accentBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    slug: 'whatsapp-community-dr-jasmine-show-up',
    name: 'Dr Jasmine · Show Up Sequence',
    cardLabel: '6 Messages',
    department: 'Community',
    description: 'Pre-webinar reminder sequence: when to send, custom values, images, and copy-paste templates for each step.',
    accent: 'teal',
    accentHex: '#075E54',
    accentBg: 'bg-teal-800/10 border-teal-800/20',
  },
];
