import type { SOPDoc } from "./meta-ads";

const automaticsalesSessionUpdateSOP: SOPDoc = {
  slug: "automaticsales-session-update",
  title: "AutomaticSales — Session Update",
  department: "AutomaticSales",
  sections: [
    // ─── 01 WHAT AND WHEN ────────────────────────────────────────────────────
    {
      id: "what-and-when",
      title: "What Is This and When Do You Do It?",
      blocks: [
        {
          type: "text",
          content:
            "Our webinars run on a recurring schedule — weekly or biweekly depending on the project. A 'session' is one instance of the webinar (for single-day webinars) or one series of consecutive days (for multi-day webinars like CAE's 2-day format). Before every new session, you need to update the integration: the Zoom session details, dates, links, and any other session-specific values in AutomaticSales.",
        },
        {
          type: "callout",
          variant: "rule",
          title: "The golden rule",
          content:
            "Always update before you start running ads for the next session. Once ads are live, leads are already entering the funnel and will receive whatever values are currently set in AS.",
        },
        {
          type: "text",
          content:
            "The Auto Integration Update is a scheduled workflow inside AS that automatically pushes all your Next values live at a preset time. Make sure all your Next value updates are complete before this automation fires — once it runs, whatever is in your Next values becomes the live session data.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Finding the Auto Integration Update schedule",
          content:
            "Go to Automations in the project's AS sub-account and search for 'Auto Integration Update'. Open it and check when the timer is set to fire. The schedule varies per project. You are allowed to adjust the timing if you judge it necessary.",
        },
      ],
    },

    // ─── 02 NEXT / CURRENT SYSTEM ────────────────────────────────────────────
    {
      id: "next-current-system",
      title: "The Next / Current Custom Values System",
      blocks: [
        {
          type: "text",
          content:
            "AS uses a two-tier custom value system for each project. This is the most important concept to understand before making any updates.",
        },
        {
          type: "table",
          headers: ["Tier", "Example name", "What it is"],
          rows: [
            [
              "Next",
              "RDP Next Zoom Link",
              "The values you manually update before each session. These are staging values — not yet live in the system.",
            ],
            [
              "Current",
              "RDP Current Zoom Link",
              "The values actively used across all funnels, reminders, and automations. These are what leads actually see and receive.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "When the Auto Integration Update automation fires, it copies every 'Next' value into its matching 'Current' value. That single action is what pushes all your updates live across the entire system at once.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Never edit Current values directly",
          content:
            "In normal operation, always update the Next values and let the automation handle the switch. Only edit Current values directly in an emergency — see the recovery section at the bottom of this page.",
        },
        {
          type: "image",
          url: "/sop-assets/as-custom-values.png",
          alt: "Custom Values settings page in AS — update all values that have 'Next' in their name",
        },
      ],
    },

    // ─── 03 ZOOM ACCESS TIERS ────────────────────────────────────────────────
    {
      id: "zoom-access-tiers",
      title: "Zoom Access and the Calendar Sheet",
      blocks: [
        {
          type: "text",
          content:
            "Zoom session creation is handled differently depending on your current status:",
        },
        {
          type: "table",
          headers: ["Status", "Your responsibility"],
          rows: [
            [
              "Confirmed staff",
              "Create the Zoom session yourself by following Step 1 below. Zoom credentials are shared by Stanley — if you do not have them, ask him.",
            ],
            [
              "Probation / temporary staff",
              "Stanley creates the Zoom session and enters all details into the Calendar Google Sheet for your project. Your job is to read from that sheet and use those values when updating AS in Step 2. You do not touch Zoom directly.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "The Calendar Google Sheet is a per-project spreadsheet containing the Zoom link, meeting ID, and passcode for each upcoming session. If you are on probation, this sheet is your source of truth.",
        },
        {
          type: "image",
          url: "/sop-assets/calendar-gsheet-cae.png",
          alt: "CAE Calendar Google Sheet showing Zoom link, meeting ID, and passcode for each session",
        },
        {
          type: "image",
          url: "/sop-assets/calendar-gsheet-drjasmine.png",
          alt: "Dr Jasmine Calendar Google Sheet showing Zoom session details per session",
        },
      ],
    },

    // ─── 04 STEP 1 — ZOOM ────────────────────────────────────────────────────
    {
      id: "step1-zoom",
      title: "Step 1 — Set Up Zoom (Confirmed Staff Only)",
      blocks: [
        {
          type: "callout",
          variant: "info",
          title: "Probation / temporary staff: skip to Step 2",
          content:
            "If you are on probation or a temporary placement, Stanley handles the Zoom setup. Check the Calendar Google Sheet for your project and go directly to Step 2.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Log into the shared Zoom account (credentials from Stanley).",
            "Start creating a new Zoom webinar or meeting for your project.",
            "In the Template field, select the saved template for your project. Each project has its own saved template — it pre-fills the correct settings so you do not need to configure everything from scratch.",
            "Change the date — CHECK THIS THREE TIMES before saving.",
            "Change the time to 8:00 PM — CHECK THIS THREE TIMES.",
            "Change the duration to 4 hours.",
            "CAE only: enable recurring meeting and set the end date to the last day of the webinar series. For a 2-day webinar starting June 1, the end date is June 2. For a 3-day webinar starting June 1, the end date is June 3.",
            "Switch on the Registration setting.",
            "Set the password to something simple and memorable (e.g. 8888).",
            "Save the Zoom session.",
          ],
        },
        {
          type: "image",
          url: "/sop-assets/zoom-template-rdp.png",
          alt: "Zoom meeting creation page showing the Template dropdown with the project's saved personal template selected",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Wrong date = wrong reminders for every lead",
          content:
            "A date error in Zoom means every automated reminder (WhatsApp and email) will contain the wrong information. This is why we check it three times. Always cross-reference against the project schedule or marketing brief before saving.",
        },
      ],
    },

    // ─── 05 STEP 2 — CUSTOM VALUES ───────────────────────────────────────────
    {
      id: "step2-custom-values",
      title: "Step 2 — Update 'Next' Custom Values in AS",
      blocks: [
        {
          type: "text",
          content:
            "Go to the project's AS sub-account → Settings → Custom Values. Update every value that has the word 'Next' in its name. These are the staging values that will be pushed live when the Auto Integration Update fires.",
        },
        {
          type: "image",
          url: "/sop-assets/as-custom-values.png",
          alt: "Custom Values settings page — scroll through and update all values with 'Next' in the name",
        },
        {
          type: "callout",
          variant: "info",
          title: "Project-specific custom value names",
          content:
            "The exact custom value names (and their required formats) vary per project. The full reference list for your project is on your project reference page — RDP or CAE.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Zoom ID: no spaces",
          content:
            "The Zoom Meeting ID must be entered with no spaces (e.g. 83674571175, not 836 4957 1175). A space in this field will break the auto-registration webhook and leads will not be registered for Zoom.",
        },
      ],
    },

    // ─── 06 STEP 3 — VERIFY ──────────────────────────────────────────────────
    {
      id: "step3-verify",
      title: "Step 3 — Verify",
      blocks: [
        {
          type: "text",
          content:
            "After completing all updates, run through these checks. Use your own name, email, and phone number to submit a test lead — you need to receive the Zoom confirmation, the WhatsApp message, and our own email to verify everything is working. The funnel URL for your specific marketer link will be given to you during project onboarding.",
        },
        {
          type: "list",
          items: [
            "Date is correct on the Landing Page and TQ Page.",
            "Zoom registration confirmation email received directly from Zoom — open it and confirm the date and Zoom link are correct for the new session.",
            "Our system's confirmation email (from AS) received with the correct date.",
            "WhatsApp confirmation message received with the correct date.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "About the Zoom link in messages",
          content:
            "The Zoom link does not appear in the WhatsApp or email confirmation messages sent at registration. It is included starting from the 24-hours-before reminder. The Zoom registration confirmation email (sent directly from Zoom itself) is the best way to verify the link is pointing to the correct new session.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Always verify before running ads",
          content:
            "Complete all four checks before launching ads for the new session. If something is wrong, you want to catch it before real leads enter the funnel. After verifying, your test entry will appear in your Ads Tracking Sheet — this is expected and can be ignored or deleted.",
        },
      ],
    },

    // ─── 08 INTEGRATION CHECKLIST ────────────────────────────────────────────
    {
      id: "integration-checklist",
      title: "Integration Update Checklist",
      blocks: [
        {
          type: "text",
          content:
            "After completing all four steps, mark off each item in the Integration Update Checklist sheet. Each project has its own tab in this shared sheet. Ticking the checkbox for each step confirms you have completed it for this session — this is how Stanley and the team know the update has been done.",
        },
        {
          type: "callout",
          variant: "rule",
          title: "Always tick off the checklist",
          content:
            "Do not consider the session update complete until the checklist is fully ticked for your project and session. This is the official sign-off that the integration is ready.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Integration Checklist Sheet",
          content:
            "Access the checklist here: https://docs.google.com/spreadsheets/d/1slAUXJGG_kJcFZS36swxrmp7UX_peBY8e1qE8jB3VCs",
        },
      ],
    },

    // ─── 09 STEP 4 — NOTIFY THE GROUP ────────────────────────────────────────
    {
      id: "step4-notify-group",
      title: "Step 4 — Notify the Group",
      blocks: [
        {
          type: "text",
          content:
            "After completing the integration update and ticking off the checklist, send a message to the project WhatsApp group with all the relevant links for this session. Include every link that applies to this project — different projects have different page setups. This gives the whole team a single reference point before ads go out.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Include every link relevant to this project",
          content:
            "The standard links are Landing Page, TQ Page, and Zoom. But some projects also have OTO pages between the landing page and TQ page, multiple WhatsApp communities, upsell pages, or other steps in the funnel. Include all of them. If you are not sure which links apply, check the project's Master Sheet.",
        },
        {
          type: "bold-text",
          content: "Template — copy and fill in:",
        },
        {
          type: "list",
          items: [
            "[Project] [Session dates] [Your name]",
            "Landing Page link: [URL]",
            "[OTO Page link: [URL]] — include if the project has one",
            "TQ Page link: [URL]",
            "Zoom link: [URL]",
            "[WhatsApp community link: [URL]] — include if the project uses one",
            "[Any other relevant links for this project]",
          ],
        },
        {
          type: "bold-text",
          content: "Example (filled in):",
        },
        {
          type: "list",
          items: [
            "CAE 2 Day Webinar (25–26 May) Stanley",
            "Landing Page link: https://predictabledestiny.com/rsvp-2d-j",
            "TQ Page link: https://predictabledestiny.com/confirmation-2d-j",
            "Zoom link: https://predictabledestiny.com/zoom",
            "WhatsApp community link: https://predictabledestiny.com/comm",
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Always include your name",
          content:
            "Add your name at the end of the header line so the team knows who ran this update and who to contact if anything looks wrong.",
        },
      ],
    },

    // ─── 10 EMERGENCY RECOVERY ───────────────────────────────────────────────
    {
      id: "emergency-recovery",
      title: "Emergency — Missed the Auto-Reset Deadline",
      blocks: [
        {
          type: "callout",
          variant: "warning",
          title: "What happens if the automation fires first",
          content:
            "If the Auto Integration Update automation fires before you finish updating the Next values, it copies your outdated Next values into Current. This means the live system — reminders, funnels, Zoom registration — is running on wrong session information.",
        },
        {
          type: "text",
          content: "Recovery steps:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Contact Stanley immediately so he is aware of the situation.",
            "Go to AS sub-account → Settings → Custom Values.",
            "Manually update the Current values directly with the correct session information.",
            "Run the Step 3 verification checks again to confirm everything is correct.",
            "Tick off the checklist once recovery is confirmed.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The only exception to the 'never edit Current' rule",
          content:
            "Direct edits to Current values are only ever done as an emergency recovery. In normal operation, always go through the Next values and let the automation handle the switch.",
        },
      ],
    },
  ],
};

export default automaticsalesSessionUpdateSOP;
