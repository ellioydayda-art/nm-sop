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
            "Main goals when you reply: (1) increase show-up — get them to the Zoom, (2) get them into the WhatsApp community, (3) handle every enquiry, (4) closing — least in the AS app, but still handle when it comes up.",
        },
      ],
    },
    {
      id: "workspace",
      title: "Where you work",
      blocks: [
        {
          type: "bold-text",
          content: "A — see screenshot 1",
        },
        {
          type: "text",
          content: "Click on \"Chats\" → look at the \"Unread\" tab → reply from there.",
        },
        {
          type: "image",
          url: "/sop/customer-support/team-inbox-unread.png",
          alt: "Screenshot 1: Chats and Unread tab (your reply queue).",
        },
        {
          type: "bold-text",
          content: "B — see screenshot 2",
        },
        {
          type: "text",
          content:
            "Once you have gone through all / replied all, tick \"Select all\" and \"Mark as Read\". Make sure to clear everything every day.",
        },
        {
          type: "image",
          url: "/sop/customer-support/team-inbox-mark-read.png",
          alt: "Screenshot 2: Select all → Actions → Mark as Read.",
        },
      ],
    },
    {
      id: "reply-rules",
      title: "Reply rules",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Know when to reply.",
            "Know when you must reply.",
            "You can only reply inside the 24-hour window — so you must reply within that time. After 24 hours, you cannot reply to that lead anymore (WABA works that way).",
            "Avoid replying during midnight — most people are already asleep.",
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "24-hour window (WABA)",
          content:
            "WhatsApp Business API (WABA) only lets you message inside the allowed window. If it goes past 24 hours without a reply from you, you lose the chance to message that lead in that thread.",
        },
      ],
    },
    {
      id: "goals",
      title: "What you are pushing for",
      blocks: [
        {
          type: "table",
          headers: ["Priority", "What it means"],
          rows: [
            ["1 · Show up", "Get them to attend the Zoom."],
            ["2 · Community", "Get them to join the WhatsApp community."],
            ["3 · Enquiries", "Answer every enquiry."],
            [
              "4 · Closing",
              "Least in the AS app — seldom got people contacting through this WhatsApp to ask closing stuff. Still gotta check here during the Zoom closing when it comes up.",
            ],
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
            "Take note: aim to reply every few hours (e.g. 10:30am, 1pm, 3pm, 6pm, 9pm, latest 11:30pm).",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Times you cannot miss",
          content:
            "Know when the reminders are sent out — usually people will reply when reminders are sent out. Be ready around those times.",
        },
        {
          type: "table",
          headers: ["Suggested pass", "Notes"],
          rows: [
            ["Morning (example 10:30)", "Clear overnight messages."],
            ["Midday (1pm, 3pm)", "Catch replies after reminders."],
            ["Evening (6pm, 9pm)", "High reply volume after work."],
            ["Latest ~11:30pm", "Optional last sweep; do not blast at midnight."],
          ],
        },
      ],
    },
    {
      id: "reminder-playbook",
      title: "Reminder playbook (example: Dr Jasmine)",
      blocks: [
        {
          type: "text",
          content: "For Dr Jasmine’s case as an example:",
        },
        {
          type: "bold-text",
          content: "~3 days before (what time? — check when reminders go out)",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "They will ask about their HbA1c level.",
            "Usually, just reply with \"Understood👍 / Got it👍\".",
            "If got people that talk more than the HbA1c, we could reply something like \"Understood 👍 we will talk more about that during the workshop\".",
            "Overall the reply gotta make sense, and drive them back to the workshop.",
            "Avoid answering questions that’s too deep / sensitive — anything usually will just drive back to workshop / webinar.",
          ],
        },
        {
          type: "image",
          url: "/sop/customer-support/template-hba1c-checkin.png",
          alt: "Example: HbA1c reminder message (~3 days before).",
        },
        {
          type: "bold-text",
          content: "~2 days before (what time? — check when reminders go out)",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "They will ask about their struggle.",
            "Usually, just reply with \"Understood👍 / Got it👍\", BUT take note — don’t reply back to the same word that you’ve replied previously, or else it’s very robot / fake.",
          ],
        },
        {
          type: "image",
          url: "/sop/customer-support/template-struggle-checkin.png",
          alt: "Example: struggle / before we go live reminder (~2 days before).",
        },
      ],
    },
    {
      id: "when-stuck",
      title: "If you don’t know / not sure how to reply",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Always try to craft a sample reply first (use ChatGPT to avoid grammar errors) — don’t expect leaders to give you a direct answer or else you will never learn.",
            "After crafting, ask leaders if it’s a correct answer.",
          ],
        },
      ],
    },
    {
      id: "faq",
      title: "Common FAQ",
      blocks: [
        {
          type: "callout",
          variant: "info",
          title: "How to join the WhatsApp community?",
          content: "Always check the correct link before reply, as we alternate links every week.",
        },
        {
          type: "callout",
          variant: "info",
          title: "If I can’t attend / not free, how?",
          content:
            "Tell them the next round date, whether they can attend? Once they confirm, reinvite them (ask Stanley how) to the next webinar session. If they can’t give a clear answer, whether can or cannot, or keep on drag, then get them to join the WhatsApp community first.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Where is Dr Jasmine clinic?",
          content:
            "Hi, Dr Jasmine is based in KL. However, we don’t accept walk-ins. The best place to start is through this online workshop.",
        },
      ],
    },
  ],
};

export default customerSupportSOP;
