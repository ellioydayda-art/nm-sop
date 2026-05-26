import type { SOPDoc } from "./meta-ads";

const automaticsalesBuilderSOP: SOPDoc = {
  slug: "automaticsales-builder",
  title: "AutomaticSales — Building Automations",
  department: "AutomaticSales",
  sections: [
    // ─── 01 BUILDER MINDSET ───────────────────────────────────────────────────
    {
      id: "builder-mindset",
      title: "The Builder Mindset",
      blocks: [
        {
          type: "text",
          content:
            "Before building anything in AS, understand the philosophy behind how the system is designed. This will help you build correctly and keep things maintainable as the system grows.",
        },
        {
          type: "callout",
          variant: "rule",
          title: "One workflow, one job",
          content:
            "Every automation workflow is built to do exactly one thing and then hand off to the next. The Optin Workflow does not also send reminders. The Reminder Workflow does not log to Google Sheets. Each workflow has a single responsibility. This makes it easy to debug (you always know exactly where something failed), reuse across projects, and update without breaking something else.",
        },
        {
          type: "text",
          content:
            "When you receive a brief from CMC — for example a Google Doc with a reminder message sequence — your job is to translate each message into a template and build the corresponding workflow logic around it. A brief typically looks like this:",
        },
        {
          type: "table",
          headers: ["Brief section", "What you build"],
          rows: [
            [
              "CONFIRMATION MESSAGE — Hi {{contact.name}}, bla bla...",
              "One WhatsApp template (marketing + utility pair) + one email template, sent immediately on opt-in",
            ],
            [
              "3 DAYS BEFORE 10 AM — Hi {{contact.name}}, bla bla...",
              "One WhatsApp template pair + email template, triggered by a wait node set to 3 days before the event date at 10:00 AM",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Briefs have no fixed format",
          content:
            "CMC may send the brief as a Google Doc, a message, or a shared note. The format varies — what matters is identifying the timing header and the message body for each step.",
        },
      ],
    },

    // ─── 02 NEW MARKETER FUNNEL SETUP ────────────────────────────────────────
    {
      id: "new-project-setup",
      title: "Setting Up a New Marketer Funnel",
      blocks: [
        {
          type: "text",
          content:
            "This checklist is for setting up a new funnel on an existing project — for example, when a new marketer is joining a project and needs their own funnel, form, and automation. This is not the same as spinning up a brand new project from scratch.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Technical Implementation Checklist",
          content:
            "The live checklist for this process is tracked in the Technical Implementation Checklist sheet — find the 'CLONE NEW FUNNEL' tab. Link: https://docs.google.com/spreadsheets/d/1slAUXJGG_kJcFZS36swxrmp7UX_peBY8e1qE8jB3VCs",
        },
        {
          type: "image",
          url: "/sop-assets/as-new-project-checklist.png",
          alt: "Technical Implementation Checklist — Clone New Funnel tab showing Google Sheet, Domain, Funnel, and Automation steps",
        },
        {
          type: "bold-text",
          content: "Google Sheet",
        },
        {
          type: "list",
          items: [
            "Clone the Webinar Tracking Sheet from an existing project. If you do not have access to the template, ask Stanley.",
          ],
        },
        {
          type: "bold-text",
          content: "Domain",
        },
        {
          type: "list",
          items: [
            "Confirm with the project owner which domain to use for this project.",
            "If it is a new domain, find Stanley to connect it to AS — domain registrar credentials are not shared with probation staff.",
          ],
        },
        {
          type: "bold-text",
          content: "Funnel",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Ask Stanley or whoever is handing you the project which sub-account to clone the funnel from.",
            "Clone the currently active funnel from that reference project.",
            "Copy the split test settings from the active funnel.",
            "Clone the currently active form.",
            "Replace the form inside the cloned funnel with the newly cloned form.",
            "In the funnel builder, open the funnel's Events tab. Update the Dataset ID and Access Token to match the new project's Meta pixel. If the pixel credentials are not yet ready, remove them entirely for now — leaving outdated credentials from a cloned funnel will cause the wrong pixel to fire.",
            "Connect the domain to the funnel.",
            "Publish the funnel.",
          ],
        },
        {
          type: "bold-text",
          content: "Automation",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Clone the Optin Automation from the reference project.",
            "Replace the form trigger in the cloned automation with the new form. CRITICAL: make sure you match both the Control and Variant versions if split testing is active.",
            "Replace the Meta Conversion API credentials with the new project's pixel details (Dataset ID and Access Token).",
            "Replace the Google Sheet node with the newly created tracking sheet.",
            "Publish the workflow.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Match Control and Variant",
          content:
            "If the funnel uses split testing (A/B test), there will be two form triggers in the Optin Automation — one for the Control variant and one for the Variant. Both must be updated to the new forms. Missing one will mean half your leads do not get processed correctly.",
        },
      ],
    },

    // ─── 03 OPTIN WORKFLOW ────────────────────────────────────────────────────
    {
      id: "optin-workflow",
      title: "The Optin Workflow",
      blocks: [
        {
          type: "text",
          content:
            "The Optin Workflow fires the moment a lead submits the registration form. Its job is to route the lead to all the right places based on their source — which marketer brought them in.",
        },
        {
          type: "image",
          url: "/sop-assets/as-workflow-optin.png",
          alt: "Optin Workflow in AS showing all nodes in sequence",
        },
        {
          type: "bold-text",
          content: "Nodes in order:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Trigger: Form Submit — fires when the registration form is submitted.",
            "Tag by source — applies a tag identifying which marketer the lead came from (e.g. lead_stanley). This is how we attribute leads per marketer.",
            "Add to Reminder Workflow — enrols the lead into the universal reminder sequence. In GHL/AS, this is the native 'Add to Workflow' action node available in the workflow editor.",
            "Add to Auto Integration Update Workflow — also uses the 'Add to Workflow' action node. This is necessary because in GHL/AS, Update Custom Value actions require a contact to be flowing through the workflow to execute. By enrolling each lead here, we ensure there is always a contact record present when the scheduled Auto Integration Update fires its value-copy actions.",
            "Meta Conversion API node — sends the lead event data (a Lead event) to the connected Meta ads account for pixel tracking and CAPI reporting.",
            "Google Sheets node — logs the lead's data (name, email, phone, source, timestamp) to the project tracking sheet.",
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Marketer-specific vs universal actions",
          content:
            "Anything that is specific to a marketer (e.g. their pixel, their tag, their sheet) lives in the Optin Workflow. Anything that applies to every lead regardless of source (reminders, Zoom registration) goes into the Reminder Workflow. Change the reminder sequence once and it applies to all marketers automatically.",
        },
      ],
    },

    // ─── 04 REMINDER WORKFLOW ────────────────────────────────────────────────
    {
      id: "reminder-workflow",
      title: "The Reminder Workflow",
      blocks: [
        {
          type: "text",
          content:
            "The Reminder Workflow handles everything that happens to every lead, regardless of which marketer brought them in. It processes the lead into the session, registers them for Zoom, and schedules all their reminder messages.",
        },
        {
          type: "image",
          url: "/sop-assets/as-workflow-reminder.png",
          alt: "RDP Reminder Sequence workflow in AS showing Set Event Start Time, Add Tag, Wait, Zoom Auto Register, Confirmation Email, and Condition branch nodes",
        },
        {
          type: "bold-text",
          content: "Nodes in order:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Tag: [prefix]_optin (e.g. rdp_optin) — marks the contact as having registered for this programme.",
            "Tag: [prefix]_optin_{{custom_values.[prefix]_current_webinar_date}} — applies a date-specific tag (e.g. rdp_optin_2026-Mar-30). Used for filtering and reporting by session.",
            "Webhook → Zoom auto-register server — sends the lead's details to our Zoom auto-registration microserver. This server makes an API call to Zoom and registers the lead for the correct session using the Zoom Meeting ID from the Current custom value. See the Zoom Webhook section below for configuration details.",
            "Set Event Date — sets the webinar start date and time as a reference point on the contact record. All wait nodes after this point use this as their anchor (e.g. 'wait until 3 days before Event Date at 10:00 AM').",
            "Wait + WhatsApp node (confirmation) — sends the confirmation message immediately.",
            "Wait + WhatsApp node + Email node (sequence reminders) — each subsequent reminder is a Wait node followed by a WhatsApp node and an email node. The wait is set relative to the Event Date.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "About Set Event Date",
          content:
            "Set Event Date is an AS-specific action that stores a point in time on the contact record. Once set, all following wait nodes can reference it as a relative anchor — for example: 'Wait until 3 days before Event Date at 10:00 AM'. Without this, the wait nodes would have no way of knowing what 'before' means.",
        },
      ],
    },

    // ─── 05 ZOOM WEBHOOK ─────────────────────────────────────────────────────
    {
      id: "zoom-webhook",
      title: "The Zoom Auto-Register Webhook",
      blocks: [
        {
          type: "text",
          content:
            "The Zoom registration step in the Reminder Workflow uses a standard webhook (HTTP POST) node to communicate with a lightweight microserver that handles Zoom API calls on our behalf. You do not need to manage the server — just configure the webhook node correctly.",
        },
        {
          type: "image",
          url: "/sop-assets/as-zoom-webhook.png",
          alt: "Zoom Auto Register webhook node in AS showing the URL, method POST, and custom data fields",
        },
        {
          type: "bold-text",
          content: "Webhook configuration:",
        },
        {
          type: "table",
          headers: ["Field", "Value"],
          rows: [
            ["Action Name", "Zoom Auto Register"],
            ["Method", "POST"],
            [
              "URL",
              "https://micro-zoom.onrender.com/api/zoom/meetings/{{custom_values.[prefix]_current_webinar_meeting_id_used_for_auto_register}}/register?account=jason",
            ],
            ["Custom Data — email", "{{contact.email}}"],
            ["Custom Data — last_name", "{{contact.name}}"],
            ["Custom Data — first_name", "{{contact.name}}"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "About the account parameter",
          content:
            "The ?account=jason parameter at the end of the URL specifies which Zoom account credentials the server uses to make the registration API call. In most cases, use 'jason'. If registration fails and you suspect an account mismatch, find Stanley.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Setting up for a new project",
          content:
            "The easiest way to configure this for a new project is to clone the node from an existing project's Reminder Workflow and update only the custom value reference in the URL (swap the prefix). If you are setting up from scratch, find Stanley for the webhook URL and to confirm the account parameter.",
        },
      ],
    },

    // ─── 06 AUTO INTEGRATION UPDATE ──────────────────────────────────────────
    {
      id: "auto-integration-update",
      title: "The Auto Integration Update Workflow",
      blocks: [
        {
          type: "text",
          content:
            "This workflow copies all 'Next' custom values to their matching 'Current' custom values at a scheduled time before each session. It is the mechanism that activates every session update the Operator makes.",
        },
        {
          type: "image",
          url: "/sop-assets/as-workflow-auto-update.png",
          alt: "Auto Integration Update workflow showing the scheduled trigger and Update Custom Value action nodes",
        },
        {
          type: "list",
          items: [
            "The trigger is time-based — a scheduled timer set to fire at a specific time before the webinar.",
            "Each 'Next → Current' pair is one Update Custom Value action node. For example: one node copies RDP Next Zoom Link into RDP Current Zoom Link.",
            "The workflow runs through all pairs in sequence, updating each Current value one by one.",
            "After this workflow fires, the entire live system (funnels, reminders, Zoom webhook) is running on the new session's values.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Update Custom Value is a built-in GHL action",
          content:
            "You do not need any external integrations to update custom values. The Update Custom Value action is natively available in GoHighLevel / AS workflows. When setting up for a new project, create one Update Custom Value node per Next/Current pair.",
        },
      ],
    },

    // ─── 07 META CAPI ─────────────────────────────────────────────────────────
    {
      id: "updating-meta-capi",
      title: "Updating Meta CAPI",
      blocks: [
        {
          type: "text",
          content:
            "When a project changes its Meta ads account or pixel, you need to update the Meta Conversion API (CAPI) node in the Optin Workflow and the pixel settings in the funnel pages.",
        },
        {
          type: "bold-text",
          content: "In the Optin Workflow — Meta CAPI node:",
        },
        {
          type: "table",
          headers: ["Field", "What to update"],
          rows: [
            [
              "Dataset ID",
              "The Pixel ID from the new Meta ads account. Found in Meta Business Suite → Events Manager.",
            ],
            [
              "Access Token",
              "The system user access token from the new ads account. Generated in Meta Business Suite.",
            ],
            [
              "Facebook Event Name",
              "Usually Lead for opt-in. Change this only if setting up a different event type from scratch.",
            ],
            [
              "Value / Currency",
              "Set to 0.01 / USD for a Lead event. Change only if setting up a purchase event.",
            ],
          ],
        },
        {
          type: "bold-text",
          content: "In the Funnel — Funnel Events (Pixel):",
        },
        {
          type: "text",
          content:
            "The funnel pages also have their own pixel tracking settings. These must be updated to match. Go into the funnel builder → funnel settings → tracking/pixel settings, and update the same Dataset ID and Access Token there.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Remove the Test Code before going live",
          content:
            "The Meta CAPI node has a Test Code field. This is used during testing to verify events in Meta's Events Manager test tab — refer to GoHighLevel documentation for how to verify test events. Once testing is done, clear this field completely and save. Leaving an active Test Code in production will cause your events to show in the test view only and corrupt your production data.",
        },
      ],
    },

    // ─── 08 BUILDING WABA TEMPLATES ──────────────────────────────────────────
    {
      id: "building-waba-templates",
      title: "Building WhatsApp Templates (Full Guide)",
      blocks: [
        {
          type: "text",
          content:
            "For the reminder sequence, every message except the three webinar-day messages needs two versions: a Marketing template and a Utility template. This is what powers the marketing → utility fallback system.",
        },
        {
          type: "text",
          content:
            "Navigate to: Marketing → Messages → WhatsApp Templates (exact navigation may vary — look for WhatsApp or Templates under the Marketing section).",
        },
        {
          type: "image",
          url: "/sop-assets/as-waba-template.png",
          alt: "WhatsApp template creation page in AS showing category selection, message body, and variable fields",
        },
        {
          type: "bold-text",
          content: "Template naming convention:",
        },
        {
          type: "naming",
          rows: [
            {
              label: "Marketing template",
              pattern: "[prefix]_[timing]_mktg",
              example: "rdp_3db4_10am_mktg",
            },
            {
              label: "Utility template",
              pattern: "[prefix]_[timing]_util",
              example: "rdp_3db4_10am_util",
            },
            {
              label: "Timing shorthand",
              pattern: "[N]db4_[time] = N days before at [time]",
              example: "2db4_10am = 2 days before at 10 AM",
            },
            {
              label: "Confirmation message",
              pattern: "[prefix]_confirmation_[mktg/util]",
              example: "rdp_confirmation_mktg",
            },
            {
              label: "Email template",
              pattern: "[prefix]_[timing]_email",
              example: "rdp_3db4_10am_email",
            },
            {
              label: "Confirmation email",
              pattern: "[prefix]_confirmation_email",
              example: "rdp_confirmation_email",
            },
          ],
        },
        {
          type: "bold-text",
          content: "Building each template:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Create the Marketing version first. Write the message as given in the brief. Use merge tags for personalisation: {{contact.first_name}}, {{custom_values.rdp_current_zoom_link}}, etc.",
            "Submit for approval. While waiting, immediately create the Utility version using the same message body but with a more transactional tone — remove any promotional language or urgency phrasing.",
            "Submit the Utility version for approval as well.",
            "Approval can take a few hours to over a day. Plan ahead — submit at least 24 hours before you need to use them.",
            "If rejected: WhatsApp will tell you why. Use an LLM (ChatGPT etc.) to help rewrite and resubmit. If the utility version is rejected, it falls back to marketing status automatically — it is still usable.",
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "The three webinar-day messages: marketing version only",
          content:
            "The 50min/1hr before message, the on-the-dot message, and the push message each have a marketing version only — no utility fallback. Push intentionally has no fallback (see the WABA & Email page for the reasoning). The 50min and on-the-dot messages follow the same pattern for consistency.",
        },
      ],
    },

    // ─── 09 BUILDING EMAIL TEMPLATES ─────────────────────────────────────────
    {
      id: "building-email-templates",
      title: "Building Email Templates",
      blocks: [
        {
          type: "text",
          content:
            "Email templates are significantly simpler than WABA templates. One version per message, no approval required, usable immediately after saving.",
        },
        {
          type: "text",
          content:
            "Navigate to: Marketing → Emails → Templates.",
        },
        {
          type: "image",
          url: "/sop-assets/as-email-template.png",
          alt: "Email template creation page in AS under Marketing → Emails → Templates",
        },
        {
          type: "list",
          items: [
            "Use the drag-and-drop email builder or write in HTML if preferred.",
            "Use the same merge tags as WhatsApp templates for personalisation.",
            "Name the template clearly using the same timing shorthand (e.g. rdp_3db4_10am_email, rdp_confirmation_email).",
            "Email templates are available for use as soon as they are saved — no waiting for approval.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "You are done when",
          content:
            "All templates are submitted and approved (or saved, for email). The Optin Workflow, Reminder Workflow, and Auto Integration Update Workflow are all published and active. A test lead flows through correctly — confirmation received via WhatsApp and email, test contact appears in the tracking sheet. The project is ready for the Operator to run the first session update.",
        },
      ],
    },
  ],
};

export default automaticsalesBuilderSOP;
