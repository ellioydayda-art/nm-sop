import type { SOPDoc } from "./meta-ads";

const customerSupportSOP: SOPDoc = {
  slug: "customer-support",
  title: "Customer Support SOP",
  department: "Support",
  sections: [
    {
      id: "mission",
      title: "Your mission",
      blocks: [
        {
          type: "text",
          content:
            "You are the front line between curious leads and a packed Zoom room. This playbook turns inbox chaos into a clear rhythm: reply fast, sound human, and steer everyone toward show-up, community, and the next right step.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Golden thread",
          content:
            "Every reply should feel helpful and alive — not scripted. Vary short affirmatives so replies never feel copy-pasted.",
        },
      ],
    },
    {
      id: "workspace",
      title: "Where you work",
      blocks: [
        {
          type: "steps",
          steps: [
            {
              label: "Open the right queue",
              items: [
                "Tap Chats in the app.",
                "Switch to the Unread tab — that is your priority lane.",
                "Work messages until you have cleared the queue for the pass.",
              ],
              result: "You are always answering the newest unanswered thread first.",
            },
            {
              label: "Close the loop daily",
              items: [
                "After you have replied to everything (or all you can for this pass), use Select all.",
                "Tap Mark as read so the queue resets clean.",
              ],
              result: "Inbox zero every day — nothing hides in Unread overnight.",
            },
          ],
        },
        {
          type: "image",
          url: "/sop/customer-support/team-inbox-unread.png",
          alt: "Chats (left) → Team Inbox with the Unread tab selected — work this queue first.",
        },
        {
          type: "image",
          url: "/sop/customer-support/team-inbox-mark-read.png",
          alt: "After a pass: select threads → Actions → Mark as read (then clear Unread for the day).",
        },
      ],
    },
    {
      id: "reply-rules",
      title: "Reply rules",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "Know when a reply is optional versus when you must reply.",
            "Conversations must get a reply within 24 hours — treat that as a hard SLA.",
            "Skip blasting messages around midnight; most people are asleep — queue it for morning.",
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "SLA",
          content: "If a thread is still open, assume it needs an answer before the 24-hour clock runs out.",
        },
      ],
    },
    {
      id: "goals",
      title: "What “winning” looks like",
      blocks: [
        {
          type: "text",
          content: "Stack-rank what you are trying to achieve in every conversation:",
        },
        {
          type: "table",
          headers: ["Priority", "Outcome"],
          rows: [
            ["1 · Show up", "Get them to attend the Zoom / webinar."],
            ["2 · Community", "Get them into the WhatsApp community."],
            ["3 · Enquiries", "Answer every question clearly and quickly."],
            ["4 · Closing", "Lowest priority inside the AS app — nurture trust first."],
          ],
        },
      ],
    },
    {
      id: "cadence",
      title: "Check-in rhythm",
      blocks: [
        {
          type: "text",
          content:
            "Aim to sweep Unread several times per day so reminders never land into silence. Anchor passes around natural break points.",
        },
        {
          type: "table",
          headers: ["Suggested pass", "Notes"],
          rows: [
            ["Morning (example 10:30)", "Clear overnight messages; set tone for the day."],
            ["Midday blocks (1pm, 3pm)", "Catch lunch-hour replies and reminder waves."],
            ["Evening (6pm, 9pm)", "Peak curiosity after work — stay sharp."],
            ["Last sweep (~11:30pm)", "Optional cap before quiet hours; do not spam after midnight."],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Reminder spikes",
          content:
            "When automated reminders go out, expect a burst of replies. Plan to be online shortly after those sends — that is when show-up intent is hottest.",
        },
      ],
    },
    {
      id: "reminder-playbook",
      title: "Reminder playbook (example: Dr Jasmine)",
      blocks: [
        {
          type: "text",
          content:
            "Workshop funnels often run on a countdown. Match your tone to the day — short affirmatives are fine, but rotate wording so it never feels robotic.",
        },
        {
          type: "steps",
          steps: [
            {
              label: "About three days before",
              items: [
                "Leads may be asked about HbA1c (or similar health markers) — confirm timing with your lead if unsure.",
                "Default tone: brief acknowledgement, e.g. “Understood” or “Got it” — warm, not clinical.",
                "If someone goes deep on medical detail, acknowledge and bridge: you will cover nuance live in the workshop.",
                "Avoid solving sensitive medical topics in chat — steer back to the session.",
              ],
              result: "They feel heard, but the workshop stays the hero.",
            },
          ],
        },
        {
          type: "image",
          url: "/sop/customer-support/template-hba1c-checkin.png",
          alt: "Example reminder message: HbA1c check-in (what leads may receive a few days out).",
        },
        {
          type: "steps",
          steps: [
            {
              label: "About two days before",
              items: [
                "Leads may share struggles — same short affirmative style.",
                "Do not repeat the exact same phrase you used on the earlier touch — mix synonyms and sentence shape.",
              ],
              result: "Consistency without sounding like a bot.",
            },
          ],
        },
        {
          type: "image",
          url: "/sop/customer-support/template-struggle-checkin.png",
          alt: "Example reminder message: struggle / “before we go live” prompt — expect replies after this send.",
        },
      ],
    },
    {
      id: "when-stuck",
      title: "When you are unsure",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Draft a sample reply first (use any writing assistant for grammar polish).",
            "Send that draft to a leader for a yes/no or tweak — do not wait for them to write it for you.",
            "Log the approved pattern so the next similar question is faster.",
          ],
        },
      ],
    },
    {
      id: "faq",
      title: "FAQ quick hits",
      blocks: [
        {
          type: "callout",
          variant: "info",
          title: "WhatsApp community link",
          content:
            "Links rotate weekly — always open the current master link from your internal doc before pasting. Never guess from memory.",
        },
        {
          type: "callout",
          variant: "info",
          title: "“I cannot attend”",
          content:
            "Share the next session date. Ask if that works. If they confirm, re-invite them to that webinar (ask Stanley or your lead for the exact re-invite flow if you have not done it yet).",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Vague or dragging answers",
          content:
            "If they will not commit yes/no, invite them into the WhatsApp community first — lower friction, keeps momentum.",
        },
        {
          type: "callout",
          variant: "info",
          title: "“Where is Dr Jasmine’s clinic?”",
          content:
            "Dr Jasmine is based in KL, but the team does not take walk-ins. Position the online workshop as the best first step.",
        },
      ],
    },
  ],
};

export default customerSupportSOP;
