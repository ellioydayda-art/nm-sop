export type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'bold-text'; content: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip' | 'rule'; title?: string; content: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'steps'; steps: { label: string; result?: string; items: string[] }[] }
  | { type: 'video'; url: string; title: string }
  | { type: 'image'; url: string; alt: string }
  | { type: 'naming'; rows: { label: string; pattern: string; example?: string }[] }
  | { type: 'divider' };

export interface SOPSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface SOPDoc {
  slug: string;
  title: string;
  department: string;
  sections: SOPSection[];
}

const metaAdsSOP: SOPDoc = {
  slug: 'media-buying',
  title: 'Media Buying SOP',
  department: 'Marketing',
  sections: [
    // ─── 1. OVERVIEW & METRICS ───────────────────────────────────────────────
    {
      id: 'overview',
      title: 'Overview & Key Metrics',
      blocks: [
        {
          type: 'text',
          content:
            'The key of media buying is to get an audience to purchase from you. The metrics below are general indicators to help a business owner achieve target sales. Actual benchmarks vary by industry — treat these as a starting baseline.',
        },
        {
          type: 'table',
          headers: ['Metric', 'Target', 'Notes'],
          rows: [
            ['CPR (Cost Per Result)', '≤ RM20', 'Cost per lead/register'],
            ['Register Rate', '> 10%', 'Leads who actually register'],
            ['ROAS (Return on Ad Spend)', '≥ 5×', 'Revenue ÷ ad spend'],
          ],
        },
      ],
    },

    // ─── 2. CRITICAL RULES — MEDIA BUYER ACCOUNTABILITY ──────────────────────
    {
      id: 'critical-rules',
      title: 'Critical Rules — Media Buyer Accountability',
      blocks: [
        {
          type: 'callout',
          variant: 'warning',
          title: 'Non-negotiable — read before anything else',
          content:
            'These rules are mandatory for every media buyer on every active project. They exist so leadership, ops, and sales can trust the numbers and react fast. Skipping reporting is not a small mistake — it causes wrong budget calls, wrong scaling, and wrong webinar prep.',
        },
        {
          type: 'bold-text',
          content: 'Rule 1 — Update ad spend in Google Sheet, then notify WhatsApp (every working day)',
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'Why this is critical',
          content:
            'Meta does not finalise spend straight away. Ads Manager figures can still change for 3–5 days while Meta reconciles. The team plans from the Google Sheet — if the sheet is stale, everyone decides on wrong numbers.',
        },
        {
          type: 'steps',
          steps: [
            {
              label: 'When to update',
              items: [
                'Minimum: once every working day while ads are live',
                'When you notice Meta has revised spend on prior days (common within the 3–5 day window)',
              ],
            },
            {
              label: 'What to do in Google Sheet',
              items: [
                'Open the correct project spend tracker (right tab / ad account)',
                'Pull latest spend from Ads Manager for the date range your team uses (usually yesterday)',
                'Update the sheet so it reflects Meta as closely as possible',
                'Note the date and time you last synced (so others know how fresh the data is)',
                'Do not wait until finance or the accountant asks you — if you wait, you slow down the whole process and you will get a warning',
              ],
            },
            {
              label: 'Notify the team in WhatsApp',
              result: 'Sheet updated + team informed',
              items: [
                'After saving the sheet, post in the project WhatsApp group — same day, every time',
                'Do not assume anyone will open the sheet on their own. The WhatsApp message is part of the job.',
              ],
            },
          ],
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'Meta 3–5 day spend delay',
          content:
            'Treat Ads Manager as provisional until reconciliation settles. If Meta later changes prior days and the difference is material (rough guide: RM100+ or it affects ROAS / scaling decisions), update the sheet again and send a follow-up WhatsApp message.',
        },
        {
          type: 'divider',
        },
        {
          type: 'bold-text',
          content: 'Rule 2 — Daily ads spent record to Google Sheet',
        },
        {
          type: 'callout',
          variant: 'rule',
          content:
            'Every working day while ads are live: record the latest ads spend in the project Google Sheet before end of day — no exceptions. Use the best available numbers from Ads Manager even if Meta may still adjust them over the next 3–5 days; refresh the sheet when Meta reconciles.',
        },
        {
          type: 'bold-text',
          content: 'Rule 3 — Always update your respective leader',
        },
        {
          type: 'callout',
          variant: 'rule',
          content:
            'After you update the sheet and post in the project WhatsApp group, always inform your respective project leader the same day (DM or direct tag) so they know the numbers are current. If spend, delivery, or the account looks unusual, tell the leader immediately — not only the group chat.',
        },
        {
          type: 'divider',
        },
        {
          type: 'table',
          headers: ['Rule', 'One-line summary'],
          rows: [
            ['1 — Sheet + WhatsApp', 'Update latest ad spend in Google Sheet; ping WhatsApp after every update'],
            ['2 — Daily GSheet record', 'Record ads spend in Google Sheet every working day'],
            ['3 — Leader update', 'Always update your respective leader after each sheet update'],
          ],
        },
      ],
    },

    // ─── 3. BUILD FB PAGE ────────────────────────────────────────────────────
    {
      id: 'build-fb-page',
      title: 'Build Your Facebook Page',
      blocks: [
        {
          type: 'text',
          content:
            'Before running any ads, your Facebook Page must look credible. An empty or sparse page looks scammy and will hurt ad performance.',
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'Page Requirements',
          content:
            'A minimum of 3 value posts (content video or image) · Profile picture uploaded · Cover photo uploaded',
        },
        {
          type: 'callout',
          variant: 'tip',
          content:
            'Post content that provides genuine value to your target audience before you start running ads. This builds social proof for anyone who clicks through from your ad.',
        },
      ],
    },

    // ─── 4. BUSINESS MANAGER — CONCEPTS ─────────────────────────────────────
    {
      id: 'business-manager-concepts',
      title: 'Business Manager — Concepts & Rules',
      blocks: [
        {
          type: 'text',
          content:
            'Facebook Business Manager (Meta Business Suite) is the central hub that houses your ad accounts, pages, pixels, and team access. Every project must run through a Business Account — never your personal account.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'New Member Onboarding Checklist',
          content:
            '1. Complete the assigned external course · 2. Read all internal SOPs · 3. On Day 1: create a Business Manager account dedicated to your project',
        },
        {
          type: 'bold-text',
          content: "Do's & Don'ts when setting up a new Business Manager",
        },
        {
          type: 'table',
          headers: ['Topic', 'Rule'],
          rows: [
            ['BM scope', '1 Business Manager = 1 Project'],
            ['Credit card', 'Use a different card per project (ideal). Add payment at the specific ad account level.'],
            ['FB Page', 'If the BM goes down, create a new page. 1 product = 1 page.'],
            ['Domain', 'Never reuse the same domain across BMs'],
            ['Ad creative', "If a BM ad account is disabled and you have proven creatives, repost and rerun them in the new account"],
          ],
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'Account Structure Best Practice',
          content:
            '1 BM → multiple ad accounts → 1 ad account per funnel/strategy. Always have at least 2 admins in every BM account.',
        },
      ],
    },

    // ─── 5. SETUP STEP-BY-STEP ───────────────────────────────────────────────
    {
      id: 'setup-step-by-step',
      title: 'Setup: Business Manager & Ad Account',
      blocks: [
        {
          type: 'steps',
          steps: [
            {
              label: 'A — Create Business Manager',
              result: 'Business Manager account created',
              items: [
                'Go to business.facebook.com',
                'Click "Create Account"',
                'Enter: Business Name, Your Name, Business Email',
                'Click Submit',
              ],
            },
            {
              label: 'B — Verify Email',
              result: 'Account activated',
              items: [
                'Check your email inbox',
                'Open the Facebook verification email',
                'Click "Confirm Now"',
              ],
            },
            {
              label: 'C — Add Business Details (Optional)',
              result: 'Business profile completed',
              items: [
                'Go to Business Settings → Business Info',
                'Fill in: Business Address, Phone Number, Website',
              ],
            },
            {
              label: 'D — Create Ads Account',
              result: 'Ads account created',
              items: [
                'In Business Settings → Accounts → Ad Accounts',
                'Click Add → Create a New Ad Account',
                'Enter: Ad Account Name, Time Zone, Currency',
                'Click Next → Select "My Business"',
                'Assign yourself full access',
              ],
            },
            {
              label: 'E — Add Payment Method',
              result: 'Ads account ready to run ads',
              items: [
                'Go to Ad Account Settings → Payment Settings',
                'Click Add Payment Method',
                'Enter card or payment details',
              ],
            },
            {
              label: 'F — Assign People & Roles',
              result: 'Team access configured',
              items: [
                'Business Settings → Users → People → Add',
                'Enter the team member email',
                'Assign role: Employee (limited) or Admin (full)',
              ],
            },
          ],
        },
      ],
    },

    // ─── 6. META PIXEL — CREATE & INSTALL IN AS ──────────────────────────────
    {
      id: 'meta-pixel-setup',
      title: 'Meta Pixel — Create & Install in AS',
      blocks: [
        {
          type: 'text',
          content:
            'After your Business Manager and ad account are ready, create the Meta pixel for the project and install it into Automatic Sales (funnel events and Conversion API). Complete this before launching GT1 campaigns so leads and conversions track correctly.',
        },
        {
          type: 'video',
          url: 'https://assets.cdn.filesafe.space/F0KfE1AF2e9vOaHGH2Ym/media/6a1ffa7485f563c78d767183.mp4',
          title: 'How to Create Pixel & Install into AS',
        },
      ],
    },

    // ─── 7. CREATIVE GUIDELINES ──────────────────────────────────────────────
    {
      id: 'creative-guidelines',
      title: 'Creative Guidelines',
      blocks: [
        {
          type: 'callout',
          variant: 'rule',
          title: 'Default: Video Ads',
          content:
            '99% of the time we use video ads only. Video ads have longer lifespans and outperform images in most scenarios.',
        },
        {
          type: 'text',
          content:
            'Image ads are used only as a fallback when you have no more video "bullets" and need to quickly launch something. Generate an image ad to keep the account active while new video is produced.',
        },
        {
          type: 'bold-text',
          content: 'Video Ad Specs',
        },
        {
          type: 'list',
          items: [
            'Format: Vertical (Reels/Stories size — 9:16)',
            'Duration: maximum 1 minute 15 seconds',
          ],
        },
        {
          type: 'bold-text',
          content: 'Image Ad Specs',
        },
        {
          type: 'list',
          items: ['Resolution: 1080 × 1080 px', 'Ratio: 1:1 (square)'],
        },
        {
          type: 'bold-text',
          content: 'Anatomy of a Facebook Ad',
        },
        {
          type: 'image',
          url: 'https://adespresso.com/wp-content/uploads/2020/01/5-steps-high-performing-Fb-ads-1.png',
          alt: 'Anatomy of a Facebook Ad showing Primary Text, Image/Video, Headline, Description and Call to Action',
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'CTA',
          content: 'Always use "Learn More" as the Call to Action button. No exceptions.',
        },
      ],
    },

    // ─── 8. ADS MANAGER STRUCTURE ────────────────────────────────────────────
    {
      id: 'ads-manager-structure',
      title: 'Ads Manager Structure',
      blocks: [
        {
          type: 'text',
          content:
            'Facebook Ads are organised in three levels. Understanding this hierarchy is critical before setting up any campaign.',
        },
        {
          type: 'table',
          headers: ['Campaign Level', 'Ad Set Level', 'Ads Level'],
          rows: [
            [
              'Objective (what you want Meta to optimise for)',
              'User Profile / Demographic\n• Need & Wants\n• Characteristics\n• Behaviour',
              'The content the audience will see\n• Content\n• Testimonial\n• Advertisement\n• Photo / Video / Live',
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Webinar campaigns',
          content: 'When running a webinar, set the campaign Objective to "Lead".',
        },
      ],
    },

    // ─── 9. NAMING CONVENTIONS ───────────────────────────────────────────────
    {
      id: 'naming-conventions',
      title: 'Naming Conventions',
      blocks: [
        {
          type: 'text',
          content:
            'Consistent naming makes it easy to diagnose performance and manage multiple campaigns. Follow these exact patterns.',
        },
        {
          type: 'naming',
          rows: [
            {
              label: 'Campaign',
              pattern: 'GT[#]_[targeting name]_[CBO/ABO]_[video/image]_[country]',
              example: 'GT1_InterestFitness_ABO_video_MY',
            },
            {
              label: 'Ad Set',
              pattern: 'GT[#]_[targeting name]_[creative label]_[video/image]_[FB/IG]_[country]',
              example: 'GT1_InterestFitness_VSL01_video_FB_MY',
            },
            {
              label: 'Ad',
              pattern: 'GT[#]_[targeting name]_[creative label]_[video/image]_[FB/IG]_[country]',
              example: 'GT1_InterestFitness_VSL01_video_FB_MY',
            },
            {
              label: 'UTM',
              pattern: 'TBC',
            },
          ],
        },
      ],
    },

    // ─── 10. TESTING PHASE GT1 ────────────────────────────────────────────────
    {
      id: 'gt1-testing',
      title: 'GT1 — Test Audience (Testing Phase)',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Purpose of GT1',
          content:
            'GT1 = Test Interest. The goal is to find which audience interests actually generate leads. Use one consistent ad creative across all ad sets.',
        },
        {
          type: 'bold-text',
          content: 'GT1 Structure',
        },
        {
          type: 'list',
          items: [
            'Budget method: ABO (Ad Set Budget Optimisation)',
            'Starting budget per ad set: RM40/day',
            'Structure: 1 Campaign → minimum 3 Ad Sets → 1 Ad per Ad Set',
            'Each Ad Set targets a different interest',
            'Use the same single ad creative across all Ad Sets',
          ],
        },
        {
          type: 'bold-text',
          content: 'GT1 Rules',
        },
        {
          type: 'list',
          items: [
            'Every GT campaign must run at least 3 ads at all times. GT1 is no exception: the GT1 campaign must always contain a minimum of 3 ads. The same minimum applies to GT2 and GT3.',
            'If an ad set has zero leads within 24 hours — turn it off immediately',
            'Once minimum 3 ad sets prove leads for 2 consecutive days → eligible to open GT2',
            'Upload new ads daily for effective testing',
          ],
        },
      ],
    },

    // ─── 11. SCALING PHASE GT2 ────────────────────────────────────────────────
    {
      id: 'gt2-scaling',
      title: 'GT2 — Test Best Ads (Scaling Phase)',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Purpose of GT2',
          content:
            'GT2 = Test Ads. Take the winning interests from GT1 and find which ad creative performs best at higher budget.',
        },
        {
          type: 'list',
          items: [
            'Minimum 3 ads in this GT2 campaign at all times (same rule as GT1 and GT3: no GT campaign below 3 ads).',
            'Duplicate the winning ad sets from GT1',
            'Switch budget method to CBO (Campaign Budget Optimisation)',
            'Starting budget: RM200 (good starting point) — maximum RM400',
            'Budget breakdown: 1 ad = RM40, so RM200 supports 5 ads simultaneously',
          ],
        },
      ],
    },

    // ─── 12. SCALING PHASE GT3 ───────────────────────────────────────────────
    {
      id: 'gt3-scaling',
      title: 'GT3 — Full Scale (Scaling Phase)',
      blocks: [
        {
          type: 'bold-text',
          content: 'GT3 Entry Requirements',
        },
        {
          type: 'list',
          items: [
            'Best performing interest confirmed from GT2',
            'ROAS 3 achieved',
          ],
        },
        {
          type: 'bold-text',
          content: 'GT3 Steps',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Duplicate the campaign from GT2',
            'Keep at least 3 ads running in this GT3 campaign (required for every GT phase, same as GT1 and GT2).',
            'Eliminate poor-performing interests — keep only GREEN LIGHT audiences',
            'Set budget method to CBO (Campaign Budget Optimisation)',
            'Double the GT2 budget',
            'Launch and monitor',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content:
            '"GREEN LIGHT" means the audience has proven consistent lead delivery at acceptable CPR. If in doubt, keep it — eliminating too aggressively at GT3 can starve the algorithm.',
        },
      ],
    },

    // ─── 13. DAILY ACTIVITIES ────────────────────────────────────────────────
    {
      id: 'daily-activities',
      title: 'Daily Facebook Page Activities',
      blocks: [
        {
          type: 'text',
          content:
            'These tasks must be completed every day the account is active to maintain engagement and protect ad performance.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Monitor all post comments. If there are negative comments — HIDE them (do NOT delete).',
            'Check post likes and invite those users to Like the Facebook Page.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Important: Hide, Never Delete',
          content:
            'Deleting negative comments can trigger Facebook review and damage account health. Always use "Hide Comment" instead.',
        },
      ],
    },

    // ─── 14. TOOLS & RESOURCES ───────────────────────────────────────────────
    {
      id: 'tools-resources',
      title: 'Tools & Resources',
      blocks: [
        {
          type: 'bold-text',
          content: 'Meta Pixel Helper — Test Your Pixel',
        },
        {
          type: 'text',
          content:
            'Use the Meta Pixel Helper Chrome extension to verify that your pixel is firing correctly on your funnel pages. Install it from the Chrome Web Store (search "Meta Pixel Helper" by Facebook).',
        },
        {
          type: 'bold-text',
          content: 'Traffic & Media Buying Tutorial',
        },
        {
          type: 'video',
          url: 'https://assets.cdn.filesafe.space/dSuVe41bmz6z8NIbMuxc/media/69ef8a8ed31f44bbd81dabc9.mp4',
          title: 'Traffic & Media Buying — Part 1',
        },
        {
          type: 'video',
          url: 'https://assets.cdn.filesafe.space/dSuVe41bmz6z8NIbMuxc/media/69ef8a8ed31f44bbd81dabd1.mp4',
          title: 'Traffic & Media Buying — Part 2',
        },
      ],
    },
  ],
};

export default metaAdsSOP;
