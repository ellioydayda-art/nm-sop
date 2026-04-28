import type { SOPDoc } from './meta-ads';

const clientOnboardingSOP: SOPDoc = {
  slug: 'client-onboarding',
  title: 'Client Onboarding SOP',
  department: 'Operations',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'text',
          content:
            'A seamless onboarding experience sets the tone for the entire client relationship. This SOP ensures every new client is set up correctly, expectations are aligned, and the team has everything needed to deliver results from Day 1.',
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'Onboarding Window',
          content: 'All onboarding tasks must be completed within 5 business days of the client signing.',
        },
      ],
    },
    {
      id: 'pre-onboarding',
      title: 'Pre-Onboarding Checklist',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Contract signed and payment received — confirm with finance',
            'Welcome email sent within 24 hours of signing',
            'Client assigned to an account manager',
            'Internal kickoff call scheduled with the delivery team',
          ],
        },
      ],
    },
    {
      id: 'kickoff-call',
      title: 'Kickoff Call',
      blocks: [
        {
          type: 'steps',
          steps: [
            {
              label: 'A — Introductions',
              items: ['Introduce the account manager and delivery team', 'Confirm client\'s primary point of contact'],
            },
            {
              label: 'B — Goals & KPIs',
              items: [
                'Confirm the 30/60/90 day targets agreed during sales',
                'Define what "success" looks like to the client specifically',
                'Agree on reporting frequency and format',
              ],
            },
            {
              label: 'C — Access Handover',
              result: 'All access confirmed in writing',
              items: [
                'Facebook Business Manager — add agency as partner',
                'Ad account access — employee or admin level',
                'Pixel confirmed and firing on funnel pages',
                'Google Analytics or tracking tool access (if applicable)',
                'Landing page / CRM access if needed',
              ],
            },
            {
              label: 'D — Brand Assets',
              items: [
                'Logo files (SVG/PNG)',
                'Brand colours and fonts',
                'Product photos and existing video assets',
                'Testimonials and social proof materials',
              ],
            },
            {
              label: 'E — Expectations Alignment',
              result: 'Kickoff call complete',
              items: [
                'Explain the testing phase timeline (GT1 → GT2 → GT3)',
                'Set expectations: first 2 weeks are data collection, not scaling',
                'Confirm communication channel (WhatsApp/email/Slack)',
                'Schedule first weekly check-in call',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'first-week',
      title: 'First Week Deliverables',
      blocks: [
        {
          type: 'table',
          headers: ['Day', 'Task', 'Owner'],
          rows: [
            ['Day 1', 'Welcome email + kickoff call scheduled', 'Account Manager'],
            ['Day 2', 'Access handover completed', 'Account Manager + Client'],
            ['Day 3', 'Campaign structure built in Ads Manager', 'Media Buyer'],
            ['Day 4', 'First creatives uploaded and reviewed', 'Creative Team'],
            ['Day 5', 'GT1 campaigns live', 'Media Buyer'],
          ],
        },
      ],
    },
  ],
};

export default clientOnboardingSOP;
