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
          content: "When you reply, you are working toward these four goals, in this order of importance:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Show up: get them to attend the Zoom.",
            "Community: get them into the WhatsApp group.",
            "Enquiries: answer every question that comes in.",
            "Closing: least traffic on this WhatsApp for closing-type questions, but still watch this channel during Zoom closing when it comes up.",
          ],
        },
      ],
    },
    {
      id: "workspace",
      title: "Where you work",
      blocks: [
        {
          type: "bold-text",
          content: "Step A (screenshot 1 below)",
        },
        {
          type: "text",
          content: "Open Chats, go to the Unread tab, and reply from there.",
        },
        {
          type: "image",
          url: "/sop/customer-support/team-inbox-unread.png",
          alt: "Screenshot 1: Chats and Unread tab (your reply queue).",
        },
        {
          type: "bold-text",
          content: "Step B (screenshot 2 below)",
        },
        {
          type: "text",
          content:
            "After you have replied to everyone in this pass, use Select all, then Mark as read. Clear Unread fully every day.",
        },
        {
          type: "image",
          url: "/sop/customer-support/team-inbox-mark-read.png",
          alt: "Screenshot 2: Select all, then Actions, then Mark as read.",
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
            "You can only reply inside the 24-hour window, so reply within that time. After 24 hours you cannot message that lead anymore in that thread (WABA works that way).",
            "Avoid replying around midnight; most people are already asleep.",
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
          headers: ["#", "Area", "What it means"],
          rows: [
            ["1", "Show up", "Get them to attend the Zoom."],
            ["2", "Community", "Get them into the WhatsApp community."],
            ["3", "Enquiries", "Answer every enquiry."],
            [
              "4",
              "Closing",
              "Least common on this WhatsApp for closing questions, but still check here during Zoom closing when it comes up.",
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
            "Take note: aim to reply every few hours (for example 10:30am, 1pm, 3pm, 6pm, 9pm, latest 11:30pm).",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Times you cannot miss",
          content:
            "Know when reminders go out. People usually reply right after reminders. Be online around those times.",
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
          content: "Example flow for Dr Jasmine’s funnel:",
        },
        {
          type: "bold-text",
          content: "~3 days before (what time? Check when reminders go out.)",
        },
        {
          type: "image",
          url: "/sop/customer-support/template-hba1c-checkin.png",
          alt: "Example: HbA1c reminder message (~3 days before).",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "They will ask about their HbA1c level.",
            "Usually, just reply with \"Understood👍 / Got it👍\".",
            "If someone goes deeper than HbA1c, you can reply something like \"Understood 👍 we will talk more about that during the workshop\".",
            "Overall, the reply should make sense and bring them back to the workshop.",
            "Avoid answering questions that are too deep or too sensitive; usually just steer them back to the workshop or webinar.",
          ],
        },
        {
          type: "bold-text",
          content: "~2 days before (what time? Check when reminders go out.)",
        },
        {
          type: "image",
          url: "/sop/customer-support/template-struggle-checkin.png",
          alt: "Example: struggle / before we go live reminder (~2 days before).",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "We will ask about their struggle.",
            "Usually, just reply with \"Understood👍 / Got it👍\", BUT do not reuse the exact same wording you already used, or it will sound robotic or fake.",
          ],
        },
      ],
    },
    {
      id: "when-stuck",
      title: "If you don’t know or are not sure how to reply",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Always try to draft a sample reply first (use ChatGPT to catch grammar). Do not expect leaders to write it for you word for word, or you will never learn.",
            "After you draft it, ask a leader if it is the correct answer.",
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
          content: "Always check the correct link before you reply; we alternate links every week.",
        },
        {
          type: "callout",
          variant: "info",
          title: "If I can’t attend / not free, how?",
          content:
            "Tell them the next session date and ask if they can attend. Once they confirm, reinvite them (ask Stanley how) to the next webinar session. If they cannot give a clear yes or no, or they keep dragging, get them into the WhatsApp community first.",
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
