import type { SOPDoc } from "./meta-ads";

const automaticsalesProjectRdpSOP: SOPDoc = {
  slug: "automaticsales-project-rdp",
  title: "Project Reference — Dr Jasmine (RDP)",
  department: "AutomaticSales",
  sections: [
    // ─── 01 PROJECT OVERVIEW ─────────────────────────────────────────────────
    {
      id: "project-overview",
      title: "Project Overview",
      blocks: [
        {
          type: "text",
          content:
            "Dr Jasmine is a health programme project running under the Reverse Diabetes Programme (RDP). The prefix for all AS assets in this project is RDP.",
        },
        {
          type: "table",
          headers: ["Detail", "Value"],
          rows: [
            ["Project name", "Dr Jasmine"],
            ["Programme", "Reverse Diabetes Programme"],
            ["AS prefix", "RDP"],
            ["WABA number", "011-5695 8295"],
            ["Webinar format", "Single-day webinar, weekly or biweekly schedule"],
            ["Webinar time", "8:00 PM"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Google Sheets for this project",
          content:
            "When you are onboarded to this project, you will be given access to the project's Master Sheet. This sheet contains links to all other sheets (Ads Tracking Sheet, Calendar Sheet), as well as a record of all tags and custom value names used in AS for this project. Refer to it as your source of truth for project-specific links.",
        },
      ],
    },

    // ─── 02 GOOGLE SHEETS REFERENCE ──────────────────────────────────────────
    {
      id: "google-sheets",
      title: "Google Sheets Reference",
      blocks: [
        {
          type: "table",
          headers: ["Sheet", "What it is for", "Who uses it"],
          rows: [
            [
              "Master Sheet",
              "Central reference for all links, tags, and custom value names used in AS for this project.",
              "Everyone working on this project — given during onboarding",
            ],
            [
              "Ads Tracking Sheet",
              "Tracks ads performance, spending, daily leads, UTM data, and funnel metrics. This is the primary performance dashboard for marketers.",
              "Marketers — covered during marketing onboarding",
            ],
            [
              "Calendar Sheet",
              "Stanley's sheet for recording upcoming Zoom session details (link, meeting ID, passcode). Probation staff read from this when doing the session update.",
              "Probation staff (read-only) and Stanley (maintains it)",
            ],
            [
              "Integration Checklist",
              "Step-by-step session update checklist. Tick off each step after completing it for each session.",
              "Operators — link: https://docs.google.com/spreadsheets/d/1slAUXJGG_kJcFZS36swxrmp7UX_peBY8e1qE8jB3VCs",
            ],
          ],
        },
      ],
    },

    // ─── 03 ZOOM TEMPLATE ────────────────────────────────────────────────────
    {
      id: "zoom-template",
      title: "Zoom Setup Reference",
      blocks: [
        {
          type: "text",
          content:
            "When creating a new Zoom session for the RDP project, use the saved personal template. This pre-fills the correct meeting settings so you do not need to configure everything from scratch.",
        },
        {
          type: "image",
          url: "/sop-assets/zoom-template-rdp.png",
          alt: "Zoom meeting creation page showing the Template dropdown with the RDP personal template '[Reversing Diabetes Workshop] 1-Day Live Event'",
        },
        {
          type: "table",
          headers: ["Field", "Value"],
          rows: [
            ["Template to select", "[Reversing Diabetes Workshop] 1-Day Live Event"],
            ["Date", "Next webinar date — CHECK THREE TIMES"],
            ["Time", "8:00 PM"],
            ["Duration", "4 hours"],
            ["Registration", "Enabled"],
            ["Password", "Simple and memorable (e.g. 8888)"],
          ],
        },
      ],
    },

    // ─── 04 WHATSAPP REMINDER SEQUENCE ───────────────────────────────────────
    {
      id: "reminder-sequence",
      title: "WhatsApp Reminder Sequence",
      blocks: [
        {
          type: "text",
          content:
            "The following is the current WhatsApp reminder sequence for the RDP project. Every message has both a marketing and utility version — the only exception is the optional push message, which is marketing only. Always verify the exact timings in the Reminder Workflow inside the RDP sub-account, as these may be tuned over time.",
        },
        {
          type: "table",
          headers: ["Message", "Timing", "Template type"],
          rows: [
            ["Confirmation", "Immediately on registration", "Marketing + Utility"],
            ["Reminder 1", "3 days before — 10:00 AM", "Marketing + Utility"],
            ["Reminder 2", "2 days before — 10:00 AM", "Marketing + Utility"],
            ["Reminder 3", "24 hours before", "Marketing + Utility"],
            ["Reminder 4", "50 minutes before", "Marketing + Utility"],
            ["On the dot", "At webinar start time (8:00 PM)", "Marketing + Utility"],
            [
              "Push message (last resort only)",
              "15–20 min AFTER webinar starts — only when PM requests it due to low show-up",
              "Marketing only — no utility fallback",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "WABA cost forecast — RDP",
          content:
            "For WABA cost forecasting, use 6 messages per lead (Confirmation through On-the-dot). Do not include the push message in the forecast. Formula: projected leads × 6 × USD 0.085.",
        },
      ],
    },

    // ─── 05 CUSTOM VALUES REFERENCE ──────────────────────────────────────────
    {
      id: "custom-values",
      title: "Custom Values Reference",
      blocks: [
        {
          type: "text",
          content:
            "These are the 'Next' custom values you update in AS during the session update (Step 2). Update every value in this table before the Auto Integration Update fires.",
        },
        {
          type: "table",
          headers: ["Custom Value Name", "Format / Example"],
          rows: [
            [
              "RDP Next Community Link",
              "https://chat.whatsapp.com/GIeZraLi4FU...",
            ],
            ["RDP Next Webinar Date", "2026 Mar 30"],
            ["RDP Next Zoom ID", "83674571175 (no spaces — see warning below)"],
            [
              "RDP Next Zoom Link",
              "https://topasiaedu.zoom.us/meeting/register/...",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Zoom ID: no spaces",
          content:
            "Enter the Zoom Meeting ID with no spaces (e.g. 83674571175, not 836 4957 1175). A space will break the auto-registration webhook.",
        },
      ],
    },

    // ─── 06 COUNTDOWN CODE BUG ───────────────────────────────────────────────
    {
      id: "countdown-code-bug",
      title: "Dr Jasmine Landing Page — Countdown Code Fix",
      blocks: [
        {
          type: "callout",
          variant: "warning",
          title: "Known bug — must be fixed every session",
          content:
            "The Dr Jasmine landing page has a custom countdown timer. There is a known bug where the countdown code cannot read the date from AS custom values. Every session, you must manually update the date directly inside the countdown code block in the funnel builder.",
        },
        {
          type: "bold-text",
          content: "How to fix it:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Open the Dr Jasmine landing page in the AS funnel builder.",
            "Find the custom code block that contains the countdown timer.",
            "Inside the code, search for the line: var webinarDate =",
            "Change the date value in that line to match the new session date. The format is: \"YYYY Mon DD H:MM AM/PM\" (e.g. \"2026 Jun 08 8:00 PM\") or just \"YYYY Mon DD\" if no time is needed.",
            "Save the code block and republish the funnel page.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The line to look for",
          content:
            "Search the code block for: var webinarDate = \"2026 ...\"\n\nThe surrounding context looks like this:\n\n  // Example:\n  // \"2026 Mar 11 8:00 PM\"\n  // or \"2026 Mar 11\"\n  var webinarDate = \"2026 May 25 8:00 PM\";\n\nChange only the date string on the var webinarDate line. Do not modify anything else in the code block.",
        },
      ],
    },
  ],
};

export default automaticsalesProjectRdpSOP;
