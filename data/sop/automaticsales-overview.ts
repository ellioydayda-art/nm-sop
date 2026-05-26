import type { SOPDoc } from "./meta-ads";

const automaticsalesOverviewSOP: SOPDoc = {
  slug: "automaticsales-overview",
  title: "AutomaticSales — Overview",
  department: "AutomaticSales",
  sections: [
    // ─── 01 WHAT IS AS ────────────────────────────────────────────────────────
    {
      id: "what-is-as",
      title: "What is AutomaticSales?",
      blocks: [
        {
          type: "text",
          content:
            "AutomaticSales (AS) is the platform we use to run all automation for our webinar campaigns. It is a white-labelled version of GoHighLevel (GHL) — meaning it is the same underlying software, just rebranded.",
        },
        {
          type: "text",
          content:
            "We use it as the central hub for everything a lead goes through after clicking our ad: landing pages, form submissions, WhatsApp and email reminders, Zoom registration, post-webinar follow-up, and sales tracking.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Searching for help online",
          content:
            "If you ever need to look up a tutorial or troubleshoot something, search for 'GoHighLevel' instead of 'AutomaticSales'. The platform is identical — GoHighLevel is the original name and has far more community resources.",
        },
      ],
    },

    // ─── 02 GETTING ACCESS ────────────────────────────────────────────────────
    {
      id: "getting-access",
      title: "Getting Access",
      blocks: [
        {
          type: "text",
          content:
            "Find Stanley — he will set up your access to the correct project sub-account and make sure you can log in and see what you need to see. Do not attempt to access a sub-account you have not been given permission for.",
        },
        {
          type: "text",
          content:
            "Each project lives in its own separate sub-account inside AS. This is intentional: it keeps contacts, workflows, funnels, WABA numbers, and data cleanly separated per client. A problem in one project cannot affect another.",
        },
        {
          type: "text",
          content:
            "Once you are logged in, the sub-account switcher is the dropdown in the top-left corner of the screen. It shows the name of the project you are currently in. Click it to switch to a different project if you have access to more than one.",
        },
        {
          type: "image",
          url: "/sop-assets/as-subaccount-switcher.png",
          alt: "AutomaticSales top-left corner showing the sub-account switcher dropdown with the current project name",
        },
        {
          type: "callout",
          variant: "warning",
          title: "New project",
          content:
            "Whenever you need access to a project you have not worked on before, always ask Stanley first. He will add you to the correct sub-account.",
        },
      ],
    },

    // ─── 03 KEY CONCEPTS ─────────────────────────────────────────────────────
    {
      id: "key-concepts",
      title: "Key Concepts",
      blocks: [
        {
          type: "text",
          content:
            "These terms are used throughout every AutomaticSales SOP page. Make sure you understand them before continuing.",
        },
        {
          type: "table",
          headers: ["Term", "What it means"],
          rows: [
            [
              "Contact",
              "A person stored in AS. A contact is created when someone submits a form on a funnel page. It holds their name, email, phone number, tags, and any custom field data we collect.",
            ],
            [
              "Sub-account",
              "A separate workspace inside AS for one project. Each client programme has its own sub-account with its own contacts, workflows, funnels, and settings.",
            ],
            [
              "Custom Value",
              "A reusable variable stored in AS settings — for example, the current Zoom link or webinar date. Used across funnels and automations so you only update one place and it changes everywhere. Custom values use a two-tier Next/Current system — see the Session Update page for how this works.",
            ],
            [
              "Workflow",
              "An automated sequence of actions triggered by an event (e.g. form submit, a scheduled timer). Workflows handle tagging contacts, sending them to Zoom, scheduling reminders, and more. Each workflow is built to do exactly one job.",
            ],
            [
              "Funnel",
              "The pages a lead goes through — landing page, form, and thank-you page. Built inside AS using a drag-and-drop page builder.",
            ],
            [
              "Tag",
              "A label attached to a contact. Used to segment, filter, and trigger different automations. Tags follow a lead_[firstname] naming convention — for example, lead_stanley tags all leads brought in by Stanley.",
            ],
            [
              "WABA",
              "WhatsApp Business API — how AS sends official WhatsApp messages at scale. Unlike regular WhatsApp, WABA requires message templates that are submitted and approved by WhatsApp before use. Each project has its own WABA number. A WABA ban means the number is suspended by WhatsApp and can no longer send messages — usually triggered by high spam report rates or policy violations. This is why each project uses a separate WABA number, so a problem in one project cannot affect the others.",
            ],
          ],
        },
      ],
    },

    // ─── 04 NAMING CONVENTIONS ───────────────────────────────────────────────
    {
      id: "naming-conventions",
      title: "Naming Conventions",
      blocks: [
        {
          type: "text",
          content:
            "Custom values, workflows, and funnel names use a programme shortname as a prefix. This makes it immediately clear which project something belongs to when you are working inside a sub-account.",
        },
        {
          type: "table",
          headers: ["Project", "Prefix", "Stands for"],
          rows: [
            ["Dr Jasmine", "RDP", "Reverse Diabetes Programme"],
            ["CAE", "PD", "Predictable Destiny (main programme)"],
            ["CAE", "ZWWM", "Zi Wei Wealth Mastery"],
            ["CAE", "LTF", "Low Ticket Funnel"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "CAE naming history",
          content:
            "The CAE project has multiple programmes under one sub-account, so you will see several prefixes. The 'CAE' label itself is the legacy name for the whole account — individual items inside it use PD, ZWWM, or LTF. When in doubt about which prefix belongs to which programme, ask Stanley.",
        },
      ],
    },

    // ─── 05 WEBINAR PIPELINE ─────────────────────────────────────────────────
    {
      id: "webinar-pipeline",
      title: "The Webinar Pipeline",
      blocks: [
        {
          type: "text",
          content:
            "Every project follows the same overall buyer journey. Understanding this end-to-end flow will help you see why each automation exists and what it is trying to accomplish.",
        },
        {
          type: "steps",
          steps: [
            {
              label: "Ads",
              items: [
                "The lead sees our ad on Facebook or Instagram.",
                "They click through to the funnel landing page.",
              ],
            },
            {
              label: "Landing Page → Form",
              items: [
                "The lead fills in their name, email, and phone number.",
                "On form submit, AS creates a contact and fires the Optin Workflow.",
              ],
            },
            {
              label: "Thank-You (TQ) Page",
              items: [
                "After submitting, the lead lands on the TQ page confirming their registration.",
                "Some projects show the WhatsApp community link here.",
              ],
            },
            {
              label: "WhatsApp Community (Optional)",
              items: [
                "Some projects invite leads to join a WhatsApp group.",
                "Not all projects use this — check the project reference page.",
              ],
            },
            {
              label: "Reminder Sequence",
              items: [
                "AS automatically sends a series of WhatsApp and email reminders in the days and hours leading up to the webinar.",
                "Timing and number of messages varies per project — see your project reference page.",
              ],
            },
            {
              label: "Zoom Webinar",
              items: [
                "The lead attends the live webinar on Zoom.",
                "They were auto-registered into the correct Zoom session at the moment they submitted the form.",
              ],
            },
            {
              label: "Checkout Page → Payment",
              items: [
                "During or after the webinar, leads are directed to the checkout page.",
                "Buyers are tracked and onboarded after payment.",
              ],
            },
            {
              label: "Post-Webinar Follow-Up",
              items: [
                "Leads who attended but did not buy may receive follow-up messages.",
                "This step is optional and configured differently per project.",
              ],
            },
          ],
        },
      ],
    },

    // ─── 06 ROLE TIERS ───────────────────────────────────────────────────────
    {
      id: "role-tiers",
      title: "Role Tiers",
      blocks: [
        {
          type: "text",
          content:
            "There are three role tiers in the AutomaticSales system. Each tier has different responsibilities and access. You will know which tier you are in from your onboarding — if you are unsure, ask Stanley.",
        },
        {
          type: "table",
          headers: ["Tier", "What you do"],
          rows: [
            [
              "Operator",
              "Runs the recurring session update process before each webinar: setting up Zoom, updating custom values, verifying the funnel, and handling manual blasts when needed. Most day-to-day work lives here.",
            ],
            [
              "Builder",
              "Builds and maintains the automations, workflows, templates, and funnels inside AS. Sets up new projects from scratch. Deeper technical access to the platform.",
            ],
            [
              "Senior",
              "Has access to sensitive sales data. Monitors during and post-webinar. Confirmed, non-probation staff only.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Probation",
          content:
            "Being on probation is not a role tier — it is an access status. A probation staff member may still be an Operator or Builder, but will have limited access to certain tools and credentials until confirmed. For example, probation staff do not create Zoom sessions directly — Stanley provides the session details via the Calendar Google Sheet instead.",
        },
      ],
    },

    // ─── 07 HOW TO USE THIS SOP ──────────────────────────────────────────────
    {
      id: "how-to-use-this-sop",
      title: "How to Use This SOP",
      blocks: [
        {
          type: "text",
          content:
            "The AutomaticSales SOP is split into separate pages, each covering a different level of responsibility. You will only have access to the pages relevant to your role. If you are unsure which pages apply to you, ask Stanley.",
        },
        {
          type: "table",
          headers: ["SOP Page", "Who it is for"],
          rows: [
            ["Overview (this page)", "Everyone — read this first"],
            [
              "Session Update",
              "Operators and above — the recurring checklist run before every new webinar session",
            ],
            [
              "WABA & Email",
              "Operators and above — understanding reminders, cost forecasting, fail rates, and manual blasting",
            ],
            [
              "Building Automations",
              "Builders — creating and maintaining workflows, funnels, and templates from scratch",
            ],
            [
              "Sales Tracking",
              "Senior confirmed staff only — during and post-webinar sales monitoring",
            ],
            [
              "Project: Dr Jasmine (RDP)",
              "Anyone working on the RDP project — project-specific reference card",
            ],
            [
              "Project: CAE",
              "Anyone working on the CAE project — project-specific reference card",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "How to read this SOP",
          content:
            "Read each page top to bottom the first time — it is designed as a training guide. After that, use the section sidebar to jump to specific parts when you need a refresher. The goal of these pages is that you can find the answer to 99% of your questions here without needing to ask.",
        },
      ],
    },
  ],
};

export default automaticsalesOverviewSOP;
