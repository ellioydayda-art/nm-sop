import type { SOPDoc } from './meta-ads';

const contentCreationSOP: SOPDoc = {
  slug: 'content-creation',
  title: 'Content Creation SOP',
  department: 'Creative',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'text',
          content:
            'This SOP covers the content production pipeline — from ideation to published asset. Every piece of content should serve a specific purpose in the marketing funnel.',
        },
      ],
    },
    {
      id: 'content-types',
      title: 'Content Types & Purpose',
      blocks: [
        {
          type: 'table',
          headers: ['Content Type', 'Funnel Stage', 'Primary Goal'],
          rows: [
            ['Education video (60-90s)', 'Top of funnel', 'Build awareness & trust'],
            ['Testimonial video', 'Mid funnel', 'Social proof & credibility'],
            ['Ad creative (VSL)', 'All stages', 'Drive clicks & leads'],
            ['Behind the scenes', 'Top of funnel', 'Humanise the brand'],
            ['Result showcase', 'Mid-bottom', 'Proof of transformation'],
          ],
        },
      ],
    },
    {
      id: 'production-workflow',
      title: 'Production Workflow',
      blocks: [
        {
          type: 'steps',
          steps: [
            {
              label: 'A — Ideation & Brief',
              items: [
                'Define the target pain point or desire this content addresses',
                'Identify the hook (first 3 seconds must capture attention)',
                'Write a brief: hook, key message, CTA',
              ],
            },
            {
              label: 'B — Script / Shot List',
              items: [
                'Write script for talking-head videos (memorise, do not read)',
                'Create shot list for B-roll or production shoots',
                'Keep under 90 seconds for organic; under 75s for ad creative',
              ],
            },
            {
              label: 'C — Record',
              items: [
                'Shoot vertical (9:16) for Reels/TikTok/Stories',
                'Good lighting — ring light or natural window light minimum',
                'Record 3 variations of the hook for testing',
              ],
            },
            {
              label: 'D — Edit',
              items: [
                'Remove silences and filler words',
                'Add captions (always — 85% of video watched muted)',
                'Add brand elements: lower third, outro, watermark',
                'Export: 1080×1920 MP4, H.264, under 500MB',
              ],
            },
            {
              label: 'E — Review & Publish',
              result: 'Content live',
              items: [
                'Internal review: check captions, branding, message clarity',
                'Upload to platform scheduler or ad account',
                'Log in content tracker with date, platform, and performance KPIs',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hooks',
      title: 'Hook Frameworks',
      blocks: [
        {
          type: 'text',
          content:
            'The hook is the most critical part of any video. If you lose them in the first 3 seconds, the rest does not matter.',
        },
        {
          type: 'table',
          headers: ['Hook Type', 'Example'],
          rows: [
            ['Bold claim', '"I made RM80k in 30 days without a single sales call."'],
            ['Question', '"Why are 90% of Meta ads actually losing money?"'],
            ['Contrast/Shock', '"Stop doing this if you want your ads to actually work."'],
            ['Story open', '"3 years ago I was RM200k in debt. Here\'s what changed everything."'],
            ['Listicle', '"5 things your media buyer will never tell you."'],
          ],
        },
      ],
    },
  ],
};

export default contentCreationSOP;
