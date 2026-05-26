import type { SOPDoc } from "./meta-ads";

const automaticsalesProjectCaeSOP: SOPDoc = {
  slug: "automaticsales-project-cae",
  title: "Project Reference — CAE",
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
            "CAE is a multi-programme project running several webinar products under one AS sub-account. The legacy name for the whole account is CAE. Each programme inside it has its own prefix.",
        },
        {
          type: "table",
          headers: ["Detail", "Value"],
          rows: [
            ["Account name", "CAE (legacy)"],
            ["WABA number", "011-1334 5862"],
            ["Webinar format", "2-day webinar (Days 1 and 2 run on consecutive days)"],
            ["Webinar time", "8:00 PM each day"],
          ],
        },
        {
          type: "bold-text",
          content: "Programme prefixes inside CAE:",
        },
        {
          type: "table",
          headers: ["Prefix", "Programme", "Notes"],
          rows: [
            ["PD", "Predictable Destiny", "Main programme — currently the most active"],
            ["ZWWM", "Zi Wei Wealth Mastery", ""],
            ["LTF", "Low Ticket Funnel", ""],
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

    // ─── 03 ZOOM SETUP ───────────────────────────────────────────────────────
    {
      id: "zoom-setup",
      title: "Zoom Setup Reference",
      blocks: [
        {
          type: "text",
          content:
            "CAE runs a 2-day webinar format, which requires a recurring Zoom meeting. When creating a new session, use the saved personal template for Predictable Destiny.",
        },
        {
          type: "image",
          url: "/sop-assets/zoom-template-cae.png",
          alt: "Zoom meeting creation page showing CAE personal templates including Predictable Destiny 2-Day Live Event and 3-Day Live Event options",
        },
        {
          type: "table",
          headers: ["Field", "Value"],
          rows: [
            ["Template to select", "[Predictable Destiny] 2-Day Live Event (current default)"],
            ["Date", "Day 1 of the webinar series — CHECK THREE TIMES"],
            ["Time", "8:00 PM"],
            ["Duration", "4 hours"],
            ["Recurring meeting", "Enabled — set end date to the last day of the series"],
            ["End date for 2-day webinar", "Day 2 (e.g. if Day 1 is June 1, end date is June 2)"],
            ["Registration", "Enabled"],
            ["Password", "Simple and memorable (e.g. 8888)"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Other templates available",
          content:
            "The CAE account also has saved templates for the 3-day format, VIP Bonus Day, and Future of Selling Online. Use the correct template for the webinar format you are running. If you are unsure which to use, ask whoever is managing the project.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Recurring meeting end date",
          content:
            "For a 2-day webinar starting June 1, the end date is June 2. For a 3-day webinar starting June 1, the end date is June 3. The end date is simply the last day of that session series. The format of each series can change between sessions — confirm the number of days with your project manager before setting up.",
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
            "CAE runs a 2-day webinar, so the reminder sequence spans both days. Leads register once and receive reminders for both Day 1 and Day 2. Each message has a marketing and utility version except the webinar-day messages.",
        },
        {
          type: "table",
          headers: ["Message", "Timing", "Template type"],
          rows: [
            ["Confirmation", "Immediately on registration", "Marketing + Utility"],
            ["Reminder 1", "24 hours before Day 1", "Marketing + Utility"],
            ["Reminder 2 — Day 1", "1 hour before Day 1 (8:00 PM)", "Marketing only"],
            ["On the dot — Day 1", "At Day 1 start time (8:00 PM)", "Marketing only"],
            [
              "Push Day 1 (last resort only)",
              "15–20 min AFTER Day 1 starts — only when PM requests it",
              "Marketing only — no utility fallback",
            ],
            ["Reminder 3 — Day 2", "1 hour before Day 2 (8:00 PM)", "Marketing only"],
            ["On the dot — Day 2", "At Day 2 start time (8:00 PM)", "Marketing only"],
            [
              "Push Day 2 (last resort only)",
              "15–20 min AFTER Day 2 starts — only when PM requests it",
              "Marketing only — no utility fallback",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "WABA cost forecast — CAE",
          content:
            "For WABA cost forecasting, use 6 messages per lead (Confirmation, 24hrb4, 1hrb4 Day1, On-the-dot Day1, 1hrb4 Day2, On-the-dot Day2). Do not include the two optional push messages in the forecast. Formula: projected leads × 6 × USD 0.085.",
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
            ["CAE Webinar Next Date", "2025 Dec 1"],
            ["CAE Webinar Next Date Range", "1st Dec – 3rd Dec"],
            ["CAE Webinar Next Day 1", "1st Dec"],
            ["CAE Webinar Next Day 2", "2nd Dec"],
            ["CAE Webinar Next Webinar ID", "83674571175 (no spaces — see warning below)"],
            ["CAE Webinar Next Zoom Link", "https://zoom.us/j/..."],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Zoom ID: no spaces",
          content:
            "Enter the Zoom Meeting ID with no spaces (e.g. 83674571175, not 836 4957 1175). A space will break the auto-registration webhook.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Date Range format",
          content:
            "CAE Webinar Next Date Range is used in reminder messages that reference the full session period. Format it as shown: '1st Dec – 3rd Dec' using an en-dash (–), not a hyphen (-). Match the ordinal suffix to the day (1st, 2nd, 3rd, 4th, etc.).",
        },
      ],
    },
  ],
};

export default automaticsalesProjectCaeSOP;
