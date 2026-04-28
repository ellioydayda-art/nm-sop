import type { SOPDoc } from './meta-ads';

const salesClosingSOP: SOPDoc = {
  slug: 'sales-closing',
  title: 'Sales Closing SOP',
  department: 'Sales',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'text',
          content:
            'This SOP covers the end-to-end consultative sales process — from first contact to signed deal. The goal is consistent, predictable close rates through a repeatable framework.',
        },
        {
          type: 'table',
          headers: ['Metric', 'Target'],
          rows: [
            ['Show rate (booked → attended)', '> 70%'],
            ['Close rate (attended → paid)', '> 30%'],
            ['Follow-up cycles', '3 touchpoints minimum'],
          ],
        },
      ],
    },
    {
      id: 'pre-call',
      title: 'Pre-Call Preparation',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Review the lead\'s registration form answers 10 minutes before the call',
            'Research their business/industry if possible',
            'Set your environment — quiet room, camera on, good lighting',
            'Have the proposal/pricing ready but not visible until needed',
          ],
        },
      ],
    },
    {
      id: 'call-framework',
      title: 'Call Framework',
      blocks: [
        {
          type: 'steps',
          steps: [
            {
              label: 'A — Build Rapport (2-3 min)',
              items: ['Small talk, confirm their name/business', 'Confirm time available for the call'],
            },
            {
              label: 'B — Set the Agenda (1 min)',
              items: [
                'Tell them what you\'ll cover and what you need from them',
                '"By the end of this call, you\'ll know exactly if we can help you and how."',
              ],
            },
            {
              label: 'C — Discovery (10-15 min)',
              items: [
                'Current situation: where are they now?',
                'Desired outcome: where do they want to be?',
                'Pain: what happens if nothing changes?',
                'Previous attempts: what have they tried?',
                'Budget/timeline: are they serious about moving?',
              ],
            },
            {
              label: 'D — Present the Solution (5-8 min)',
              items: [
                'Connect their specific pain to your solution — use their own words',
                'Show the transformation, not the features',
                'Present the investment last, after the value is clear',
              ],
            },
            {
              label: 'E — Handle Objections',
              items: [
                'Acknowledge → Isolate → Resolve',
                '"Is price the only thing stopping you, or is there something else?"',
                'Never argue — ask questions to reveal the real concern',
              ],
            },
            {
              label: 'F — Close',
              result: 'Decision made (yes or clear next step)',
              items: [
                'Assumptive close: "So let\'s get you started — shall we process via card or bank transfer?"',
                'If not ready: lock in a specific follow-up date/time before hanging up',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'objections',
      title: 'Common Objections & Responses',
      blocks: [
        {
          type: 'table',
          headers: ['Objection', 'Response Framework'],
          rows: [
            ['"I need to think about it"', '"Of course — what specifically do you need to think through? Let me address that now."'],
            ['"Too expensive"', '"Compared to what? If this gets you [result], what would that be worth to you?"'],
            ['"I need to ask my partner"', '"Great — can we get them on a call now, or schedule a 3-way call this week?"'],
            ['"Not the right time"', '"When would be the right time? What needs to change for that to happen?"'],
          ],
        },
      ],
    },
    {
      id: 'follow-up',
      title: 'Follow-Up Protocol',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Same day: send a recap message with a summary of what was discussed',
            'Day 2: follow-up with a relevant case study or testimonial',
            'Day 5: final follow-up with a clear deadline or limited offer',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'No ghosting',
          content:
            'If a lead goes silent after 3 touchpoints, send one final message: "I\'ll close your file if I don\'t hear back by [date]. No hard feelings — just want to give you a clear decision." This often triggers a response.',
        },
      ],
    },
  ],
};

export default salesClosingSOP;
