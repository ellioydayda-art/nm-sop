import type { SOPDoc } from "./meta-ads";

const whatsappCommunityValuePostsSOP: SOPDoc = {
  slug: "whatsapp-community-value-posts",
  title: "WhatsApp Community — Value Posts SOP",
  department: "Community",
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "text",
          content:
            "This SOP teaches how to publish value posts inside a WhatsApp Community (or linked announcement group). The goal is to keep members engaged, build trust, and warm the audience — without turning every message into a hard sell.",
        },
        {
          type: "callout",
          variant: "info",
          title: "What is a value post?",
          content:
            "A value post gives the member something useful they can apply immediately: a tip, insight, story lesson, resource, or quick win. Promotion is allowed only in small doses and usually at the end (soft CTA), not as the whole message.",
        },
      ],
    },
    {
      id: "purpose",
      title: "Purpose & Goals",
      blocks: [
        {
          type: "list",
          items: [
            "Keep the community active so members do not mute or leave",
            "Position the brand/expert as helpful before any webinar or offer",
            "Create familiarity so reminder and sales messages feel natural later",
            "Encourage replies and reactions (signals a healthy community)",
          ],
        },
        {
          type: "table",
          headers: ["Goal", "How value posts help"],
          rows: [
            ["Trust", "Consistent useful content proves you are not only selling"],
            ["Retention", "Members stay when they learn something regularly"],
            ["Warm leads", "Engaged readers convert better on session day"],
            ["Social proof", "Screenshots of wins and questions can be reused in ads"],
          ],
        },
      ],
    },
    {
      id: "value-vs-promo",
      title: "Value vs Promotion",
      blocks: [
        {
          type: "callout",
          variant: "rule",
          title: "Default ratio",
          content:
            "Aim for at least 4 value posts for every 1 promotional post. On busy weeks before a webinar, you may post more reminders — but never let the community become a billboard only.",
        },
        {
          type: "table",
          headers: ["Value post (yes)", "Promotion (limit)"],
          rows: [
            ["One actionable tip with no link", "Register link + deadline"],
            ["Mini story + lesson learned", "Repeated same CTA all day"],
            ["FAQ answer many members ask", "Price or discount push only"],
            ["Member win spotlight (with permission)", "Long copy with no takeaway"],
            ["Short checklist or framework image", "Vague hype with no substance"],
          ],
        },
      ],
    },
    {
      id: "post-anatomy",
      title: "Anatomy of a Good Value Post",
      blocks: [
        {
          type: "steps",
          steps: [
            {
              label: "1 — Hook (first line)",
              items: [
                "One line that stops the scroll: question, bold claim, or relatable pain",
                "Keep under ~15 words when possible",
              ],
            },
            {
              label: "2 — Value body",
              items: [
                "2–5 short paragraphs OR a numbered list (easy to skim on mobile)",
                "One clear idea per post — do not cram three topics",
                "Use line breaks; avoid walls of text",
              ],
            },
            {
              label: "3 — Optional soft CTA",
              items: [
                "One line only: e.g. \"Next free session is Thursday — link in pinned message\"",
                "Skip CTA entirely on pure value days",
              ],
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Write like you are texting one person. Read aloud once — if it sounds like a brochure, rewrite shorter and simpler.",
        },
      ],
    },
    {
      id: "content-pillars",
      title: "Content Pillars (What to Post)",
      blocks: [
        {
          type: "table",
          headers: ["Pillar", "Example angle"],
          rows: [
            ["Quick tip", "\"3 signs your ad account is bleeding budget\""],
            ["Myth bust", "\"No — you do not need a huge budget to test GT1\""],
            ["Story / lesson", "\"What we changed after a RM0 lead day\""],
            ["FAQ", "\"Why is my pixel not firing? Check these 2 places first\""],
            ["Win spotlight", "Share a member result (name + screenshot with consent)"],
            ["Behind the scenes", "Prep for session, team ritual, honest process"],
            ["Countdown (light)", "\"2 days to session — here is what to prepare\""],
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Posting Workflow",
      blocks: [
        {
          type: "steps",
          steps: [
            {
              label: "A — Plan the week",
              items: [
                "Block 5–7 value post ideas in a simple doc or sheet",
                "Align 1–2 posts with upcoming webinar/session dates",
                "Assign who writes vs who publishes (can be different people)",
              ],
            },
            {
              label: "B — Draft in Notes first",
              items: [
                "Draft outside WhatsApp to avoid accidental sends",
                "Check spelling, links, and pinned-message references",
              ],
            },
            {
              label: "C — Publish in community",
              items: [
                "Post in the announcement channel / community admin view as per project setup",
                "Use one main message; use reply thread only for follow-up Q&A",
                "Pin critical links separately — do not repeat full URL in every value post",
              ],
            },
            {
              label: "D — Engage after posting",
              result: "Post complete + community warmed",
              items: [
                "Reply to questions within the same day when possible",
                "React to member messages where appropriate",
                "Save strong replies or wins for future value posts (with permission)",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "frequency",
      title: "Frequency & Timing",
      blocks: [
        {
          type: "list",
          items: [
            "Minimum: 1 value post per weekday on active communities",
            "Ideal: 1 post per day, morning or early afternoon (local audience timezone)",
            "Before a webinar week: add 1 light countdown post every 2–3 days — still lead with value",
            "Avoid posting the same CTA copy back-to-back within 24 hours",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Quiet hours",
          content:
            "Do not blast the community late at night unless the audience is explicitly overseas and approved by the project lead.",
        },
      ],
    },
    {
      id: "dos-donts",
      title: "Do's & Don'ts",
      blocks: [
        {
          type: "table",
          headers: ["Do", "Don't"],
          rows: [
            ["Short paragraphs and lists", "Copy-paste long email-style essays"],
            ["Ask one simple question to invite replies", "Fake engagement bait with no follow-up"],
            ["Credit members when sharing wins", "Share private DMs without consent"],
            ["Keep brand voice consistent per project", "Mix unrelated offers in one community"],
            ["Report abusive/spam members to lead", "Argue publicly with trolls"],
          ],
        },
      ],
    },
    {
      id: "templates",
      title: "Copy Templates",
      blocks: [
        {
          type: "bold-text",
          content: "Template A — Quick tip",
        },
        {
          type: "text",
          content:
            "Most people pause ads too early.\n\nIf your ad set spent less than 1× your target CPR and has fewer than ~1,000 impressions — give it more time before you kill it.\n\nSave this. Use it on your next GT1 review.",
        },
        {
          type: "bold-text",
          content: "Template B — Story + lesson",
        },
        {
          type: "text",
          content:
            "Yesterday a member asked why leads dropped after day 3.\n\nWe checked one thing first: did the pixel still fire on the opt-in page?\n\nTurns out the funnel was cloned and the old pixel was still connected.\n\nLesson: always verify pixel + CAPI after any funnel duplicate.",
        },
        {
          type: "bold-text",
          content: "Template C — Soft CTA before session",
        },
        {
          type: "text",
          content:
            "Quick prep for Thursday's session:\n\n1) Block 60 minutes uninterrupted\n2) Have your ad account open\n3) Write down your #1 question\n\nRegistration link is in the pinned message. See you there.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "Replace examples with project-specific language (programme name, session day, actual links). Templates are starting points, not word-for-word scripts every time.",
        },
      ],
    },
  ],
};

export default whatsappCommunityValuePostsSOP;
