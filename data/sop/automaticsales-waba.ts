import type { SOPDoc } from "./meta-ads";

const automaticsalesWabaSOP: SOPDoc = {
  slug: "automaticsales-waba",
  title: "AutomaticSales — WABA & Email",
  department: "AutomaticSales",
  sections: [
    // ─── 01 WHAT IS WABA ─────────────────────────────────────────────────────
    {
      id: "what-is-waba",
      title: "What is WABA?",
      blocks: [
        {
          type: "text",
          content:
            "WABA stands for WhatsApp Business API. It is how AutomaticSales sends official WhatsApp messages to large numbers of contacts automatically.",
        },
        {
          type: "text",
          content:
            "Regular WhatsApp (the app on your phone) is for personal use — you can only send messages manually, one at a time, to people who have saved your number. WABA is completely different: it is a programmatic API that allows a business to send structured messages at scale through WhatsApp's official infrastructure.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Why templates need WhatsApp approval",
          content:
            "Because WABA can send messages to thousands of people at once, WhatsApp requires every message template to be reviewed and approved before it can be used. This protects users from spam. Once a template is approved, AS can send it automatically at any scale.",
        },
        {
          type: "bold-text",
          content: "Marketing templates vs Utility templates",
        },
        {
          type: "table",
          headers: ["Type", "Tone", "Template approval", "Message delivery rate", "When to use"],
          rows: [
            [
              "Marketing",
              "Promotional — personalised, engaging, may include offers or urgency",
              "Easier — WhatsApp approves these more readily",
              "Lower — more messages fail to deliver",
              "First attempt for every reminder message",
            ],
            [
              "Utility",
              "Transactional — reads like a service notification. No promotional language.",
              "Harder — stricter content requirements, rejections are common",
              "Higher — approved utility messages deliver more reliably",
              "Fallback if the marketing version fails to deliver",
            ],
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Each project has its own WABA number",
          content:
            "We dedicate a separate WABA number to each project. If one project's WABA gets banned — suspended by WhatsApp due to high spam reports or policy violations — it does not affect the others. The numbers for each project are on the project reference pages.",
        },
      ],
    },

    // ─── 02 WABA COST FORECASTING ────────────────────────────────────────────
    {
      id: "waba-cost-forecast",
      title: "WABA Cost Forecasting",
      blocks: [
        {
          type: "text",
          content:
            "Before the first reminder fires for a session, you need to estimate the WABA cost for that session and confirm the balance is sufficient. This prevents reminders from failing mid-sequence because the WABA account ran out of funds.",
        },
        {
          type: "callout",
          variant: "rule",
          title: "Who is responsible for this",
          content:
            "The person running ads for this project is responsible for forecasting and monitoring the WABA balance. If the balance is getting low, notify CMC with the amount that needs to be topped up.",
        },
        {
          type: "bold-text",
          content: "The formula",
        },
        {
          type: "list",
          items: [
            "Step 1 — Find your current registered lead count. Check your Ads Tracking Sheet or Webinar Tracking Sheet for the latest lead total for this session.",
            "Step 2 — Estimate how many more leads will register before the webinar: average daily new leads × number of days remaining until the webinar.",
            "Step 3 — Projected total leads = current leads + estimated new leads.",
            "Step 4 — Estimated total messages = projected total leads × number of messages in the reminder sequence (see your project reference page for the exact count).",
            "Step 5 — Estimated cost = estimated total messages × USD 0.085.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Why USD 0.085 per message",
          content:
            "The USD 0.085 rate already accounts for the marketing + utility fallback system. When a marketing message fails, AS retries with the utility version — so some contacts effectively receive two send attempts for that message. The 0.085 figure blends the cost of both attempts into a single per-message estimate, giving you a conservative forecast that covers the fallback cost.",
        },
        {
          type: "bold-text",
          content: "Worked example",
        },
        {
          type: "table",
          headers: ["Variable", "Value"],
          rows: [
            ["Current registered leads", "500"],
            ["Average daily new leads", "60"],
            ["Days remaining until webinar", "5"],
            ["Estimated new leads", "60 × 5 = 300"],
            ["Projected total leads", "500 + 300 = 800"],
            ["Messages per lead (RDP — 6 messages)", "800 × 6 = 4,800 messages"],
            ["Estimated WABA cost", "4,800 × USD 0.085 = USD 408"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Push messages are not counted",
          content:
            "Do not include the push message in your forecast. Push is a last-resort tool that may or may not be used — and it intentionally has no utility fallback. The standard reminder sequence is what you forecast for.",
        },
      ],
    },

    // ─── 03 HOW REMINDERS WORK ───────────────────────────────────────────────
    {
      id: "how-reminders-work",
      title: "How Reminders Work",
      blocks: [
        {
          type: "text",
          content:
            "After a lead submits the registration form, they are automatically enrolled into the Reminder Workflow. This workflow schedules all WhatsApp and email reminders leading up to the webinar — you do not need to do anything manually for reminders to go out.",
        },
        {
          type: "text",
          content:
            "Each project has its own dedicated WABA number and its own reminder sequence. The general sequence template we follow across all projects is:",
        },
        {
          type: "table",
          headers: ["Step", "Timing"],
          rows: [
            ["Confirmation message", "Immediately on registration"],
            ["Reminder 1", "3 days before — 10:00 AM (timing varies by project)"],
            ["Reminder 2", "2 days before — 10:00 AM (timing varies by project)"],
            ["Reminder 3", "24 hours before"],
            ["Reminder 4", "50 minutes to 1 hour before"],
            ["On the dot", "At webinar start time"],
            ["Push message (last resort only)", "15–20 min AFTER webinar starts — PM must request it"],
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Push is a last-resort tool — not a standard reminder",
          content:
            "Push is only sent when show-up is unusually bad and your project manager specifically requests it. It fires 15–20 minutes after the webinar has already started. Push is completely separate from the on-the-dot message and all earlier reminders — those go out automatically regardless.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Actual timings vary per project",
          content:
            "The sequence above is the general template. Each project has its own tuned timings based on audience behaviour. The exact sequence for your project is on the project reference page (RDP or CAE). Always check the Reminder Workflow inside the project's AS sub-account for the most up-to-date schedule.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Email reminders",
          content:
            "Email reminders run in parallel with WhatsApp and are configured separately inside each project's Reminder Workflow. Check the email automation nodes within the workflow for exact timings.",
        },
      ],
    },

    // ─── 04 THREE WEBINAR-DAY MESSAGES ───────────────────────────────────────
    {
      id: "webinar-day-messages",
      title: "The Three Webinar-Day Messages",
      blocks: [
        {
          type: "text",
          content:
            "On the day of the webinar, there are three distinct message templates — each with a different purpose. It is important to understand them separately because they are easy to confuse.",
        },
        {
          type: "table",
          headers: ["Message", "When it fires", "How it fires", "Purpose"],
          rows: [
            [
              "50min / 1hr before",
              "50 minutes to 1 hour before webinar start",
              "Automatically — fires for every registered lead",
              "Final reminder to join the webinar soon",
            ],
            [
              "On the dot",
              "Exactly at webinar start time",
              "Automatically — fires for every registered lead",
              "Live alert: the webinar is starting now",
            ],
            [
              "Push message",
              "15–20 minutes AFTER the webinar has already started",
              "Manually triggered — only when show-up is bad and your PM requests it",
              "Last-resort attempt to bring in late attendees",
            ],
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Push has no utility fallback — intentionally",
          content:
            "Push does not have a utility fallback version. Push is already a last-resort message sent after the webinar has started. Adding a utility retry on top would send two messages back-to-back, increasing spam risk and the chance of a WABA ban. Push failing is acceptable — protecting the WABA number is more important.",
        },
      ],
    },

    // ─── 05 MARKETING → UTILITY FALLBACK ─────────────────────────────────────
    {
      id: "marketing-utility-fallback",
      title: "The Marketing → Utility Fallback System",
      blocks: [
        {
          type: "text",
          content:
            "All standard WABA reminders (every message except push) are sent using a two-layer fallback system. This is one of the main reasons our delivery rates are consistently high.",
        },
        {
          type: "steps",
          steps: [
            {
              label: "First attempt — Marketing Template",
              items: [
                "AS attempts to send the marketing version of the message first.",
                "Marketing templates allow more engaging, personalised copy.",
                "However, they have a lower delivery approval rate from WhatsApp compared to utility templates.",
              ],
            },
            {
              label: "Fallback — Utility Template",
              items: [
                "If the marketing message fails to deliver, AS automatically retries using the utility version.",
                "Utility templates have a higher approval rate because they are transactional in tone.",
                "This fallback runs automatically — you do not need to trigger it manually.",
              ],
              result:
                "Combined, this system achieves 92%+ message receive rate consistently across all projects and sessions.",
            },
          ],
        },
      ],
    },

    // ─── 06 WABA BEST PRACTICES ───────────────────────────────────────────────
    {
      id: "best-practices",
      title: "WABA Best Practices",
      blocks: [
        {
          type: "bold-text",
          content: "Fail Rate Benchmarks",
        },
        {
          type: "table",
          headers: ["Fail Rate", "What it means"],
          rows: [
            ["Below 10%", "Healthy — no action needed."],
            [
              "10% – 15%",
              "Alarming — monitor closely. If it is a one-off, it may be acceptable. If it recurs, investigate the template content or sending conditions.",
            ],
            [
              "Above 15%",
              "Action needed — review the template, check for back-to-back sending, or investigate WABA account health.",
            ],
          ],
        },
        {
          type: "bold-text",
          content: "Blasting Frequency",
        },
        {
          type: "list",
          items: [
            "Maximum one blast per day under normal circumstances.",
            "Exception: on webinar day, multiple messages are acceptable (50min before + on-the-dot + push if triggered + any manual blast requested by PM).",
            "If you send multiple blasts close together — even an hour apart — expect a higher fail rate. This is normal and not a system error. WhatsApp applies stricter delivery limits when messages are sent in close succession.",
          ],
        },
        {
          type: "bold-text",
          content: "Utility Template Guidelines",
        },
        {
          type: "list",
          items: [
            "Utility templates must be transactional in tone — they should read like a service notification, not a promotional message.",
            "Avoid anything that sounds like an offer, discount, or marketing pitch.",
            "Avoid excessive urgency language or clickbait phrasing.",
            "Self-check tip: paste your template into ChatGPT and ask 'Will this pass WhatsApp utility template approval? If not, why, and how would you fix it?' This is the fastest way to gut-check before submitting.",
            "Expect to apply multiple times — rejections are normal. If rejected as utility, WhatsApp will automatically fall it back to marketing status, so the template is not wasted.",
          ],
        },
        {
          type: "bold-text",
          content: "WABA Account Balance",
        },
        {
          type: "text",
          content:
            "The person running ads for each project is responsible for monitoring the WABA account balance. If it is running low, notify CMC with the amount needed for a top-up. Do not wait until the balance is empty — a mid-session failure means leads miss reminders they were expecting.",
        },
      ],
    },

    // ─── 07 HANDLING AUTOMATION FAILURES ─────────────────────────────────────
    {
      id: "automation-failures",
      title: "Handling Automation Failures",
      blocks: [
        {
          type: "text",
          content:
            "Automation failures happen when the system could not send messages automatically — usually due to insufficient WABA account funds or a platform issue. When this happens, CMC or your project manager will notify you and ask you to manually resend the affected messages.",
        },
        {
          type: "callout",
          variant: "info",
          title: "You do not need to build new templates",
          content:
            "The reminder templates are already approved from the original workflow setup. You just need to find the contacts who missed the message and blast them using the existing marketing template. No new template submission is required.",
        },
        {
          type: "bold-text",
          content: "How to find the failed contacts:",
        },
        {
          type: "text",
          content:
            "Go to the relevant workflow in AS and click on the utility node for the failed blast. Because of our marketing → utility fallback system, all contacts that failed (both marketing and utility) will end up passing through the utility node. Checking the utility node gives you the complete list of everyone who did not receive the message.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Why the utility node — not the marketing node?",
          content:
            "In the fallback flow, every failed marketing attempt triggers the utility path. So anyone who did not get the marketing message passes through the utility node — whether or not the utility attempt also failed. This makes the utility node the single source of truth for all failures.",
        },
        {
          type: "text",
          content:
            "Once you have the failed contact list, export it and proceed with a manual blast. When executing the blast, use the marketing template — select the approved marketing template that corresponds to the message that failed.",
        },
      ],
    },

    // ─── 08 BUILDING A WHATSAPP TEMPLATE (FOR MANUAL BLAST) ──────────────────
    {
      id: "building-whatsapp-template",
      title: "Building a WhatsApp Template (for Manual Blast)",
      blocks: [
        {
          type: "text",
          content:
            "When doing a manual blast, you need an approved WhatsApp template. This section covers how to build one for that purpose. If you are building templates for the full reminder sequence from scratch, see the Building Automations page — that guide covers the marketing + utility pair system in full.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Allow at least 24 hours for approval",
          content:
            "WhatsApp template approval can take anywhere from a few hours to over a day. Submit your template well in advance — 24 hours is the minimum, longer is safer. Do not leave this until the night before.",
        },
        {
          type: "text",
          content:
            "To get to the template builder: go to Settings → WABA → Templates.",
        },
        {
          type: "image",
          url: "/sop-assets/as-waba-template.png",
          alt: "WhatsApp template creation page in AS showing category selection, message body, and variable fields",
        },
        {
          type: "bold-text",
          content: "Template creation steps:",
        },
        {
          type: "steps",
          steps: [
            {
              label: "Fill in the basics",
              items: [
                "Enter the template name — use a clear, descriptive name following the project naming convention.",
                "Select the category: Marketing or Utility.",
                "Select the language.",
              ],
            },
            {
              label: "Set the header",
              items: [
                "If your message includes an image, select Image then upload the file.",
                "If it is text only, select None.",
              ],
            },
            {
              label: "Write the message body",
              items: [
                "Type your message in the Body field.",
                "To personalise the message, click the '+ Add Variable' button — this inserts a {{1}} placeholder at the cursor position.",
                "A row will appear below the body field labelled '{{1}} *' — click 'Select custom variable' to choose the correct field (e.g. contact.name, or a custom value like the Zoom link).",
                "Enter a sample value in the second field so WhatsApp can review it.",
                "Repeat for each variable you need — each additional click adds {{2}}, {{3}}, etc.",
              ],
            },
            {
              label: "Submit for approval",
              items: [
                "Click Create. The template is sent to WhatsApp for review.",
                "Approval usually takes a few hours but can take up to 24 hours.",
                "If rejected as Utility, WhatsApp will automatically reclassify it as Marketing — it is not wasted.",
              ],
            },
          ],
        },
      ],
    },

    // ─── 09 BUILDING AN EMAIL TEMPLATE (FOR MANUAL BLAST) ────────────────────
    {
      id: "building-email-template",
      title: "Building an Email Template (for Manual Blast)",
      blocks: [
        {
          type: "text",
          content:
            "Email templates are simpler — there is only one version, no marketing/utility split, and no approval required.",
        },
        {
          type: "text",
          content:
            "To build an email template: go to Marketing → Emails → Templates.",
        },
        {
          type: "image",
          url: "/sop-assets/as-email-template.png",
          alt: "Email template creation page in AutomaticSales under Marketing → Emails → Templates",
        },
        {
          type: "list",
          items: [
            "Use the email builder to compose your message.",
            "Use merge tags for personalisation (e.g. {{contact.first_name}}, custom values, etc.).",
            "Email templates do not require approval — they can be used immediately after saving.",
          ],
        },
      ],
    },

    // ─── 10 MANUAL BLAST PROCEDURE ───────────────────────────────────────────
    {
      id: "manual-blast",
      title: "Manual Blast Procedure",
      blocks: [
        {
          type: "text",
          content:
            "A manual blast is only done when CMC or your project manager specifically requests it. Common triggers:",
        },
        {
          type: "list",
          items: [
            "Automation failure — messages did not go out automatically. See the previous section for how to get the failed contact list.",
            "Low show-up — the project manager asks for a last-minute push message to bring more people into the webinar room.",
            "Special session — a one-off or last-minute re-invite for a specific group.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The procedure is the same for WhatsApp and Email",
          content:
            "The only difference is Step 1 (building the template) and Step 6 (executing the send). Steps 2 through 5 and Step 7 are identical for both channels.",
        },
        {
          type: "steps",
          steps: [
            {
              label: "Build your template",
              items: [
                "WhatsApp: build and get WhatsApp approval for a template (see the Building a WhatsApp Template section above). You cannot blast without an approved template.",
                "Email: build your template under Marketing → Emails → Templates. No approval needed — ready to use immediately.",
              ],
            },
            {
              label: "Prepare the contact list in Google Sheets",
              items: [
                "Create a new sheet with exactly these three column headers: Name, Email, Phone Number.",
                "Add one row per contact you want to blast.",
                "Export as CSV: File → Download → CSV. AS only accepts CSV — not Excel or Google Sheets format.",
              ],
            },
            {
              label: "Import contacts into AS",
              items: [
                "Go to Contacts → click the Import button (top right).",
                "Select Contacts, then choose the CSV file you exported.",
                "Check the field mapping — verify that Name maps to Name, Email maps to Email, and Phone Number maps to Phone.",
                "Enable 'Add tags to imported contacts' and create a clear temporary tag name (e.g. manual_blast_rdp_jun2).",
                "Check the permission/consent checkbox, then click Import.",
              ],
            },
            {
              label: "Verify the import completed",
              items: [
                "Go to Contacts → Bulk Actions tab to check the import progress.",
                "Wait until the import status shows complete before moving on.",
              ],
            },
            {
              label: "Filter and select contacts",
              items: [
                "Go to Contacts → click the Filter button → set Tag is [your temporary tag] → select all.",
                "Verify the contact count matches the number of rows in your Google Sheet.",
                "If the count is off: (1) check for duplicate rows in your sheet (Data → Data Cleanup → Remove Duplicates), or (2) check for failed imports in the Bulk Actions tab.",
              ],
            },
            {
              label: "Execute the blast",
              items: [
                "Email blast: with all contacts selected, click 'Send Email' above the contacts table.",
                "WhatsApp blast: with all contacts selected, click 'More' → 'Send WhatsApp' → select the approved template.",
              ],
            },
            {
              label: "Clean up",
              items: [
                "After the blast is complete, delete the temporary tag from the system entirely.",
                "This keeps the system clean and prevents the tag from interfering with future imports or filters.",
              ],
            },
          ],
        },
        {
          type: "image",
          url: "/sop-assets/as-contacts-import.png",
          alt: "Contacts page showing the Import button in the top right",
        },
        {
          type: "image",
          url: "/sop-assets/as-import-mapping.png",
          alt: "Import field mapping — match CSV column headers to AS contact fields",
        },
        {
          type: "image",
          url: "/sop-assets/as-import-tags.png",
          alt: "Import step — temporary tag creation and the permission checkbox",
        },
        {
          type: "image",
          url: "/sop-assets/as-bulk-actions.png",
          alt: "Contacts → Bulk Actions tab — check import progress and failed imports here",
        },
        {
          type: "image",
          url: "/sop-assets/as-blast-execute.png",
          alt: "Contacts table with all contacts selected — Send Email button and More → Send WhatsApp visible above",
        },
      ],
    },

    // ─── 11 REPORTING BLAST RESULTS ──────────────────────────────────────────
    {
      id: "reporting-blast-results",
      title: "Reporting Blast Results to the Group",
      blocks: [
        {
          type: "text",
          content:
            "After every blast — whether it was an automatic reminder or a manual blast — post the success rate results to the project WhatsApp group. You are building a running list for that session: each time a new reminder fires, add its result to the existing message thread.",
        },
        {
          type: "bold-text",
          content: "How to get the success rate:",
        },
        {
          type: "text",
          content:
            "In AS, go to the relevant workflow and open the node for that message. Check the number of contacts that successfully received it versus the total who were sent the message. Calculate the percentage and include both the percentage and the raw count.",
        },
        {
          type: "bold-text",
          content: "Template — copy and fill in each time:",
        },
        {
          type: "list",
          items: [
            "[Project] [Session date] Session:",
            "Total Leads: [count]",
            "[Message label] Success Rate: [%] ([delivered]/[total])",
            "[Message label] Success Rate: [%] ([delivered]/[total])",
            "... (add each reminder row as it fires throughout the session)",
          ],
        },
        {
          type: "bold-text",
          content: "Example (filled in):",
        },
        {
          type: "list",
          items: [
            "Dr Jasmine May 25th Session:",
            "Total Leads: 642",
            "1 Day Before Reminder Success Rate: 95% (612/642)",
            "50mins Before Reminder Success Rate: 95% (611/642)",
            "Live Now Reminder Success Rate: 95% (612/642)",
            "Push Success Rate: 84% (542/642)",
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Each post must include all results so far — not just the newest one",
          content:
            "Every time you post an update, include the full list: total leads plus every reminder that has fired up to that point, including the new one. Do not post only the latest reminder result on its own. WhatsApp limits message editing after a short window, so the way to maintain a running total is to post a fresh complete update each time — copy your previous message, append the new row, and send it as a new message.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Fail rate context",
          content:
            "If a message has a notably high fail rate (above 10%), add a brief note explaining why if you know the reason — for example: '(multiple blasts sent within 1 hour — expected higher fail rate)'. This helps the team read the numbers correctly.",
        },
      ],
    },
  ],
};

export default automaticsalesWabaSOP;
